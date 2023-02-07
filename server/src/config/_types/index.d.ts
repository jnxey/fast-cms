declare interface Database {
  host:string
  user: string
  password: string
  table: string
}

export declare interface Config {
  port: number
  database: Database
}
