import { column } from './widgets-schema/column'
import { container } from './widgets-schema/container'
import { row } from './widgets-schema/row'
import { text } from './widgets-schema/text'

import ColorPicker from '../../widgets/schema/color-picker/index.vue'
import Fillet from '../../widgets/schema/fillet/index.vue'
import Margin from '../../widgets/schema/margin/index.vue'
import Number from '../../widgets/schema/number/index.vue'
import Rich from '../../widgets/schema/rich/index.vue'
import Shadow from '../../widgets/schema/shadow/index.vue'
import Text from '../../widgets/schema/text/index.vue'

/// 组件描述，以下像素单位均在设计稿宽度为750下的值
export const Schema = {
  page: [],
  column: column,
  container: container,
  row: row,
  text: text
}

/// 组件描述默认值
export const SchemaOptions = {
  page: {},
  column: {
    width: 375,
    height: undefined,
    margin: undefined,
    padding: [30, 30, 30, 30],
    borderRadius: undefined,
    backgroundColor: undefined,
    boxShadow: undefined
  },
  container: {
    width: 375,
    height: undefined,
    margin: undefined,
    padding: [30, 30, 30, 30],
    borderRadius: undefined,
    backgroundColor: undefined,
    boxShadow: undefined
  },
  row: {
    width: 375,
    height: undefined,
    margin: undefined,
    padding: [30, 30, 30, 30],
    borderRadius: undefined,
    backgroundColor: undefined,
    boxShadow: undefined
  },
  text: {
    value: '文字',
    lineHeight: 20,
    fontSize: 14,
    fontWeight: 400,
    color_picker: '#000000',
    marginLeft: 0,
    marginRight: 0
  }
}

/// 类型组件
export const SchemaTypeComponent = {
  color_picker: ColorPicker,
  fillet: Fillet,
  margin: Margin,
  number: Number,
  rich: Rich,
  shadow: Shadow,
  text: Text
}
