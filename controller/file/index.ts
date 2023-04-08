import { Controller } from '@/tools/controller'
import { ExtendableContext, Next } from 'koa'
import { FormData, Post, Summary } from '@/tools/method'
import { Jwt } from '@/tools/jwt'
import { Dto, ResponseCode } from '@/tools/dto'

export class File extends Controller.Api {
  @Post()
  @FormData()
  @Jwt.protected()
  @Summary('保存文件')
  public async save(ctx: ExtendableContext, next: Next) {
    const file = ctx.request.files?.file
    if (file) {
      const ext = file['mimetype'].slice(file['mimetype'].indexOf('/') + 1)
      const hash = file['newFilename'] + '.' + ext
      console.log(file, '-------------------')
      ctx.body = Dto(ResponseCode.success)
    } else {
      ctx.body = Dto(ResponseCode.error_params)
    }
    return next()
  }
}
