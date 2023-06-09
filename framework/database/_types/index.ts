export interface DatabaseQueryParams {
  [key: string]: string | number | undefined
}

export interface DatabaseQueryResult {
  code: string
  msg: string
  value?: any
}
