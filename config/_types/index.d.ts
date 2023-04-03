declare interface Database {
  host: string
  user: string
  password: string
  table: string
  port: number
}

export declare interface Config {
  port: number
  database: Database
  allowOrigin?: string[]
  salt: string
}
