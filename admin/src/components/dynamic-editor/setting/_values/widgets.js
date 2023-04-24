import Container from '../../widgets/layout/container/index.vue'

export const Widgets = {
  text: {
    key: Container.name,
    label: '文字',
    icon: 'iconfont icon-wenzi',
    contructor: Container
  },
  container: {
    key: 'container',
    label: '容器',
    icon: 'iconfont icon-container'
  },
  row: {
    key: 'row',
    label: '行',
    icon: 'iconfont icon-row'
  },
  column: {
    key: 'column',
    label: '列',
    icon: 'iconfont icon-column'
  }
}
