import Request from '@/framework/request'
import { ParamsType } from '@/framework/values'

export class ParamsLogin extends Request.ParamsModel {
  constructor() {
    super()
    this.init({
      name: {
        type: ParamsType.String,
        required: true,
        typeError: '名称必须是字符串',
        emptyError: '名称不能为空',
        descriptor: '用户名称'
      },
      password: {
        type: ParamsType.String,
        required: true,
        typeError: '密码必须是字符串',
        emptyError: '密码不能为空',
        descriptor: '用户密码'
      }
    })
  }
}

export class ResultLogin extends Request.ParamsModel {}
