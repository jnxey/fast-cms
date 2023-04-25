import { column } from './widgets-schema/column'
import { container } from './widgets-schema/container'
import { row } from './widgets-schema/row'
import { text } from './widgets-schema/text'

/// 组件描述，以下像素单位均在设计稿宽度为750下的值
export const Schema = {
  column: column,
  container: container,
  row: row,
  text: text
}
