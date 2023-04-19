/// 权限检验类
import { ExtendableContext } from 'koa'
import { Jwt } from '@/tools/jwt'
import { menuRoot, systemRoles } from '@/tools/values'
import { getJSON } from '@/tools'
import { ErrorKoa } from '@/tools/error'
import { ResponseCode } from '@/tools/dto'
import { DatabaseQueryResult } from '@/database/_types'
import { Database } from '@/database'
import { ResultLogin } from '@/controller/admin/login/_models/login-form'

export class Auth {
  /// 缓存的菜单List
  public static menuList: any[] = []

  /// 缓存的菜单Map
  public static menuMap: any = {}

  /// 检验系统管理员权限
  public static manager(ctx: ExtendableContext) {
    const { admin_role } = Jwt.getUser(ctx)
    if (admin_role !== systemRoles.manager) {
      ctx.status = ErrorKoa.JWT_ERROR_STATUS
      throw Error(ResponseCode.error_access.msg)
    }
  }

  /// 检测菜单列表权限
  public static menus(ctx: ExtendableContext, list: any[]) {
    const { admin_role, admin_auth_ids } = Jwt.getUser(ctx)
    const auths = getJSON(admin_auth_ids, [])
    const map = {}
    list.forEach((val) => (map[val.id] = val))
    Auth.menuList = list
    Auth.menuMap = map
    if (admin_role === systemRoles.manager) {
      return list
    } else {
      return list.filter((val) => {
        const rootId = Auth.getRootId(val)
        return auths.includes(rootId)
      })
    }
  }

  /// 检查单个菜单权限
  public static checkMenu(ctx: ExtendableContext, id?: number) {
    const { admin_role, admin_auth_ids } = Jwt.getUser(ctx)
    if (admin_role !== systemRoles.manager && id && Auth.menuMap[id]) {
      const auths = getJSON(admin_auth_ids, [])
      const rootId = Auth.getRootId(Auth.menuMap[id])
      if (!auths.includes(rootId)) {
        ctx.status = ErrorKoa.JWT_ERROR_STATUS
        throw Error(ResponseCode.error_access.msg)
      }
    }
  }

  /// 检查单个内容权限
  public static checkContent(ctx: ExtendableContext, id?: number) {
    const { admin_role, admin_auth_ids } = Jwt.getUser(ctx)
    const menuKey = Auth.menuList.findIndex((val) => val.content_id === id)
    if (admin_role !== systemRoles.manager && menuKey > -1) {
      const auths = getJSON(admin_auth_ids, [])
      const rootId = Auth.getRootId(Auth.menuList[menuKey])
      if (!auths.includes(rootId)) {
        ctx.status = ErrorKoa.JWT_ERROR_STATUS
        throw Error(ResponseCode.error_access.msg)
      }
    }
  }

  /// 获取菜单根节点ID
  public static getRootId(cur) {
    if (cur.parent_id === menuRoot) {
      return cur.id
    } else {
      return Auth.getRootId(Auth.menuMap[cur.parent_id])
    }
  }

  /// 添加权限
  public static async addMenuAuths(ctx: ExtendableContext, id: number) {
    const user = Jwt.getUser(ctx)
    const auths = getJSON(user.admin_auth_ids, [])
    auths.push(id)
    const authsValue = JSON.stringify(auths)
    const resultUpdate: DatabaseQueryResult = await Database.execute(
      Database.format(Database.query.UpateMemberAuths, {
        id,
        admin_auth_ids: authsValue
      })
    )
    if (resultUpdate.code !== Database.result.success) throw Error(ResponseCode.error_server.msg)
    const payload = new Jwt.JwtUser(user.id, user.admin_name, user.admin_role, authsValue)
    const token = Jwt.sign(payload)
    const userResult: ResultLogin = new ResultLogin()
    userResult.fill(user)
    ctx.cookies.set(Jwt.JWT_GET_KEY, token, { httpOnly: true })
  }
}
