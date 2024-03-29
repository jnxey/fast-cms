import Page from '../../widgets/layout/page/index.vue'
import Txt from '../../widgets/base/txt/index.vue'
import Container from '../../widgets/layout/container/index.vue'
import Row from '../../widgets/layout/row/index.vue'
import Column from '../../widgets/layout/column/index.vue'
import { Schema } from '@/components/dynamic-editor/setting/_values/schema'

export const Display = { inline: 'inline', block: 'block', inlineBlock: 'inline-block' }
export const Type = { base: 'base', layout: 'layout', page: 'page' }
export const WrapSign = 'wrap'

export const Widgets = {
  txt: {
    key: Txt.name,
    label: '文字',
    icon: 'iconfont icon-wenzi',
    display: Display.inline,
    hasChildren: false,
    type: Type.base,
    component: Txt,
    schema: Schema.txt
  },
  container: {
    key: Container.name,
    label: '容器',
    icon: 'iconfont icon-container',
    display: Display.block,
    hasChildren: true,
    type: Type.layout,
    component: Container,
    schema: Schema.container
  },
  row: {
    key: Row.name,
    label: '横向',
    icon: 'iconfont icon-row',
    display: Display.block,
    hasChildren: true,
    type: Type.layout,
    component: Row,
    schema: Schema.row
  },
  column: {
    key: Column.name,
    label: '纵向',
    icon: 'iconfont icon-column',
    display: Display.block,
    hasChildren: true,
    type: Type.layout,
    component: Column,
    schema: Schema.column
  }
}

export const WidgetsPage = {
  key: Page.name,
  display: Display.block,
  hasChildren: true,
  type: Type.layout,
  component: Page,
  schema: Schema.page
}
