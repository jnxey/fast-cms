import mysql from 'mysql'
import { getConfig } from '@/tools/system'
import { DatabaseQueryParams, DatabaseQueryResult } from '@/database/_types'
import * as query from './query'

const config = getConfig().database

const pool = mysql.createPool({
  connectionLimit: 100,
  host: config.host,
  port: config.port,
  user: config.user,
  password: config.password,
  database: config.name
})

export class Database {
  // 连接池
  public static pool = pool

  // 查询语句
  public static query = query

  // 结果
  public static result = { success: 'success', error: 'error' }

  // 查询动作
  public static format(query: string, params?: DatabaseQueryParams) {
    if (!params) {
      return query
    } else {
      Object.keys(params).forEach((name) => {
        const reg = new RegExp('{' + name + '}', 'gm')
        query = query.replace(reg, Database.pool.escape(params[name]))
      })
      return query
    }
  }

  // 查询动作
  public static execute(query: string): Promise<DatabaseQueryResult> {
    return new Promise((resolve) => {
      pool.query(query, function (error: any, results: any) {
        const result: DatabaseQueryResult = {
          code: error ? Database.result.error : Database.result.success,
          msg: error ? String(error?.message) : Database.result.success,
          value: results
        }
        resolve(result)
      })
    })
  }
}
