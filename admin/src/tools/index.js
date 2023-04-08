import { SystemValues } from '@/tools/values'

export const toLogin = () => {
  location.href = SystemValues.base + '#/login'
}
