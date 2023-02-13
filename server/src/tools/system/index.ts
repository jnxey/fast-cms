import { config as configDev } from '@/config/dev'
import { config as configTest } from '@/config/test'
import { config as configProd } from '@/config/prod'
import { type Config } from '@/config/_types'

/// 获取系统配置
export const getConfig = _getConfig

/// 获取系统配置
function _getConfig(): Config {
  if (process.env.EXEC_ENV === 'dev') {
    return configDev
  } else if (process.env.EXEC_ENV === 'test') {
    return configTest
  } else if (process.env.EXEC_ENV === 'prod') {
    return configProd
  } else {
    return configProd
  }
}
