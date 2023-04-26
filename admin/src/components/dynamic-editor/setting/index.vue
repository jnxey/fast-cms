<script setup>
import WidgetsBox from './widgets-box/index.vue'
import ContentBox from './content-box/index.vue'
import AttributeBox from './attribute-box/index.vue'
</script>
<template>
  <div class="dynamic-setting">
    <!--  Left  -->
    <WidgetsBox />
    <!--  Mid  -->
    <ContentBox />
    <!--  Right  -->
    <AttributeBox />
  </div>
</template>
<style scoped>
@import './_styles/index.css';
</style>
