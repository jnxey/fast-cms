declare interface Database {
  host: string
  user: string
  password: string
  name: string
  port: number
}

export declare interface Config {
  port: number
  database: Database
  allowOrigin?: string[]
  salt: string
}
