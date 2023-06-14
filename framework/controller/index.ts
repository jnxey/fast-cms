import Router from '@koa/router'
import { koaBody } from 'koa-body'
import serve from 'koa-static'
import Koa, { ExtendableContext, Next } from 'koa'
import { isObject, isUndefined, kebabCase } from '@/framework/tools'
import { DataType, Method, ParamsConfigCache } from '@/framework/values'
import { ParamsModel } from '@/framework/params'
import Response from '@/framework/response'

/// 控制器公共类
export class Api {}

/// 控制器
export class Controller {
  /// 路由
  public static router: Router = new Router()

  /// 上下文
  public static app: Koa = new Koa()

  /// 静态资源
  public static assets: Function = serve

  /// Api前缀
  public static ApiPrefix = '/api/'

  /// 构造名称
  public static ConstructorName = 'constructor'

  /// 控制器Api
  public static Api = Api

  /// 生成文档
  public static Doc = true

  /// 文档JSON
  public static DocJson = {}

  /// 初始化
  public static init(options) {
    if (isObject(options)) {
      if (options.ApiPrefix) Controller.ApiPrefix = options.ApiPrefix
      if (options.Doc) Controller.Doc = options.Doc
    }
  }

  /// 连接控制器
  public static connect<T extends Api>(instance: T) {
    const router = Controller.router
    const moduleName: string = instance.constructor.name
    const apis: string[] = Object.getOwnPropertyNames(instance.constructor.prototype)
    apis.forEach((name) => {
      if (name === Controller.ConstructorName || isUndefined(instance[name].FW_REQUEST_METHOD))
        return
      const module = kebabCase(moduleName)
      const func = kebabCase(name)
      const param = instance[name].ROUTE_PARAM ? '/:' + instance[name].ROUTE_PARAM : ''
      const path: string = Controller.ApiPrefix + module + '/' + func + param
      const handler: Router.Middleware = function (ctx: ExtendableContext, next: Next) {
        try {
          /// 处理
          const options: ControllerExtra = new ControllerExtra()
          return instance[name](ctx, next, options)
        } catch (err: Error | any) {
          /// ToDo: 收集错误信息
          if (err instanceof Error) console.log(err.stack?.toString(), 'err-----------1')
        }
      }
      if (instance[name].FW_REQUEST_METHOD === Method.Post) {
        if (instance[name].FW_REQUEST_DATA_TYPE === DataType.Json) {
          router.post(path, koaBody({ json: true }), handler)
        } else if (instance[name].FW_REQUEST_DATA_TYPE === DataType.Text) {
          router.post(path, koaBody({ text: true }), handler)
        } else if (instance[name].FW_REQUEST_DATA_TYPE === DataType.FormData) {
          router.post(
            path,
            koaBody({
              multipart: true,
              formidable: {
                maxFileSize: 500 * 1024 * 1024 // 设置上传文件大小最大限制，默认5M
              }
            }),
            handler
          )
        } else {
          router.post(path, handler)
        }
      } else if (instance[name].FW_REQUEST_METHOD === Method.Get) {
        router.get(path, handler)
      }

      /// 获取配置
      if (Controller.Doc) {
        const metadata = instance[name]
        if (!isObject(Controller.DocJson[module])) Controller.DocJson[module] = {}
        Controller.DocJson[module][func] = {
          path: path,
          method: metadata.FW_REQUEST_METHOD,
          dataType: metadata.FW_REQUEST_DATA_TYPE,
          descriptor: metadata.FW_REQUEST_DESCRIPTOR,
          request: _getConfig(metadata.FW_REQUEST_PARAMS_MODEL),
          response: _getConfig(metadata.FW_RESPONSE_RESULT_MODEL)
        }
      }
    })
    router.get('/api-doc/getJson', function (ctx: ExtendableContext, next: Next) {
      ctx.body = Response.Dto(Response.code.success, Controller.DocJson)
      next()
    })
  }
}

/// 控制器额外参数
export class ControllerExtra {
  /// Jwt参数
  private jwtData?: any
  /// 请求参数
  private query?: any
  /// 路由参数
  private params?: any

  setJwtData<T>(value: T) {
    this.jwtData = value
  }

  setQuery<T>(value: T) {
    this.query = value
  }

  setParams<T>(value: T) {
    this.params = value
  }

  getJwtData<T>(): T {
    return this.jwtData as T
  }

  getQuery<T>(): T {
    return this.query as T
  }

  getParams<T>(): T {
    return this.params as T
  }
}

function _getConfig(meta) {
  if (!Boolean(meta)) {
    return undefined
  } else {
    const config = meta[ParamsConfigCache]
    Object.keys(config).forEach(function (name) {
      const _c = config[name]
      if (_c['type'] instanceof ParamsModel) {
        _c['type'] = _getConfig(_c['type'])
      } else if (_c['childType'] instanceof ParamsModel) {
        _c['childType'] = _getConfig(_c['childType'])
      }
    })
    return config
  }
}
