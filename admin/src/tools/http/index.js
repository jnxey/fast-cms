import axios from 'axios'
import { SystemValues } from '@/tools/values'
import { toLogin } from '@/tools'
import { ElMessageBox } from 'element-plus'

const instance = axios.create({ baseURL: '/', timeout: 10000 })

instance.interceptors.response.use(
  function (config) {
    return config
  },
  function (error) {
    if (error.response.status === SystemValues.noAuth) {
      toLogin()
    } else {
      ElMessageBox.alert(error.toString(), '请求失败')
    }
    return Promise.reject(error)
  }
)

export const Http = instance

export const HttpApis = {
  login: '/api/admin-login/login',
  logout: '/api/admin-login/logout',
  getAdminInfo: '/api/admin-login/get-admin-info',
  menuAddOrEdit: '/api/admin-home/menu-add-or-edit',
  getDocMenuList: '/api/admin-home/get-doc-menu-list',
  getDocContent: '/api/admin-home/content-get',
  editDocContent: '/api/admin-home/content-edit'
}
