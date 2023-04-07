import axios from 'axios'

export const Http = axios

export const HttpApis = {
  login: '/api/admin-login/login',
  logout: '/api/admin-login/logout',
  getAdminInfo: '/api/admin-login/get-admin-info'
}
