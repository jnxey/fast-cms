import { SystemValues } from '@/tools/values'

export const toLogin = () => {
  location.href = SystemValues.base + '#/login'
}

export const getJSON = (value, def) => {
  if (!value) return def
  try {
    return JSON.parse(value)
  } catch (e) {
    return def
  }
}
