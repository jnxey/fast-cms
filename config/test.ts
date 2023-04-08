import { type Config } from './_types'

export const config: Config = {
  port: 3000,
  database: {
    host: 'localhost',
    user: 'root',
    password: '846046',
    name: 'nr_document',
    port: 3306
  },
  salt: 'fc-salt'
}
