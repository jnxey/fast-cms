import { Controller } from '@/tools/controller'
import { ExtendableContext, Next } from 'koa'
import { FormData, Get, Post, Summary } from '@/tools/method'
import { Jwt } from '@/tools/jwt'
import { Dto, ResponseCode } from '@/tools/dto'
import fs from 'fs'
import { DatabaseQueryResult } from '@/database/_types'
import { Database } from '@/database'
import { Params } from '@/tools/params'

interface HashBean {
  hash?: string
}

export class FileManager extends Controller.Api {
  @Post()
  @FormData()
  @Jwt.protected()
  @Summary('保存文件')
  public async save(ctx: ExtendableContext, next: Next) {
    const file: any = ctx.request.files?.file
    if (file) {
      const mimetype = file['mimetype']
      const ext = mimetype.slice(mimetype.indexOf('/') + 1)
      const hash = file['newFilename'] + '.' + ext
      const buffer = await FileManager.getBlobByPath(file.filepath)
      if (buffer) {
        const base64 = buffer.toString('base64')
        const insertResult: DatabaseQueryResult = await Database.execute(
          Database.format(Database.query.InsertBlobToFile, {
            file_type: mimetype,
            file_tag: -1,
            file_hash: hash,
            file_blob: base64
          })
        )
        if (insertResult.code === Database.result.success) {
          ctx.body = Dto(ResponseCode.success, {
            hash: hash,
            url: '/api/file-manager/read/' + hash
          })
        } else {
          ctx.body = Dto(ResponseCode.error_params, null, insertResult.msg)
        }
      } else {
        ctx.body = Dto(ResponseCode.error_params)
      }
    } else {
      ctx.body = Dto(ResponseCode.error_params)
    }
    return next()
  }

  @Get()
  @Summary('保存文件')
  public async read$hash(ctx: ExtendableContext, next: Next) {
    let { hash } = Params.get<HashBean>(ctx) || {}
    const selectResult = await Database.execute(
      Database.format(Database.query.SelectBlobFromFile, { file_hash: hash })
    )
    if (selectResult.code === Database.result.success) {
      const file = selectResult.value[0] || {}
      const base64 = file.file_blob || ''
      ctx.body = Buffer.from(base64, 'base64')
    } else {
      ctx.body = Dto(ResponseCode.error_params, null, selectResult.msg)
    }
    return next()
  }

  /// 读取文件流
  public static async getBlobByPath(path: string): Promise<Buffer | null> {
    return new Promise((resolve) => {
      const rs = fs.createReadStream(path, { highWaterMark: 5 * 1024 * 1024 })
      const buffers: Uint8Array[] = []
      // @ts-ignore
      rs.on('data', (chunk) => buffers.push(chunk))
      rs.on('end', () => resolve(Buffer.concat(buffers)))
      rs.on('error', () => resolve(null))
    })
  }
}
