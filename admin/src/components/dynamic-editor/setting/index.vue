<script setup>
import WidgetsBox from './widgets-box/index.vue'
import ContentBox from './content-box/index.vue'
import AttributeBox from './attribute-box/index.vue'
import { Widgets, WrapSign } from '@/components/dynamic-editor/setting/_values'

const tree = {
  key: Widgets.container.key,
  uid: WrapSign,
  children: [
    {
      key: 'row',
      uid: '16823910876979403298',
      options: {
        paddingTop: '30px',
        paddingLeft: '30px',
        paddingBottom: '30px',
        paddingRight: '30px'
      }
    }
  ]
}
</script>
<template>
  <div class="dynamic-setting">
    <!--  Left  -->
    <WidgetsBox />
    <!--  Mid  -->
    <ContentBox :tree="tree" />
    <!--  Right  -->
    <AttributeBox />
  </div>
</template>
<style scoped>
@import './_styles/index.css';
</style>
