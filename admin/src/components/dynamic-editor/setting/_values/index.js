import Text from '../../widgets/base/text/index.vue'
import Container from '../../widgets/layout/container/index.vue'
import Row from '../../widgets/layout/row/index.vue'
import Column from '../../widgets/layout/column/index.vue'

export const Display = { inline: 'inline', block: 'block', inlineBlock: 'inline-block' }
export const Type = { base: 'base', layout: 'layout' }
export const WrapSign = 'wrap'

export const Widgets = {
  text: {
    key: Text.name,
    label: '文字',
    icon: 'iconfont icon-wenzi',
    display: Display.inline,
    hasChildren: false,
    type: Type.base,
    component: Text
  },
  container: {
    key: Container.name,
    label: '容器',
    icon: 'iconfont icon-container',
    display: Display.block,
    hasChildren: true,
    type: Type.layout,
    component: Container
  },
  row: {
    key: Row.name,
    label: '横向',
    icon: 'iconfont icon-row',
    display: Display.block,
    hasChildren: true,
    type: Type.layout,
    component: Row
  },
  column: {
    key: Column.name,
    label: '纵向',
    icon: 'iconfont icon-column',
    display: Display.block,
    hasChildren: true,
    type: Type.layout,
    component: Column
  }
}
