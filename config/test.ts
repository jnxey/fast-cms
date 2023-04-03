import { type Config } from './_types'

export const config: Config = {
  port: 3000,
  database: {
    host: 'localhost',
    user: 'root',
    password: '846046',
    table: 'fast_cms',
    port: 3306
  },
  salt: 'fc-salt',
  allowOrigin: ['http://localhost:4000', 'http://localhost:3000', 'about:blank']
}
