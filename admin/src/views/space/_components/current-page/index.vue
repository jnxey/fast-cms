<template>
  <template v-if="currentPage">
    <div class="current-page-wrap">
      <div class="current-page-title">《{{ currentPage.menu_name }}》</div>
      <template v-if="pageContent">
        <div class="info">网页类型：{{ contentInfo[pageContent.doc_type] }}</div>
        <div class="handler-box">
          <el-button @click="repackContentEdit()">撤销</el-button>
          <el-button type="primary" @click="editContentSubmit()">保存</el-button>
        </div>
      </template>
      <template v-else>
        <el-button type="primary" @click="addContentOpen()">选择网页类型</el-button>
      </template>
    </div>
    <el-divider></el-divider>
    <template v-if="pageContent">
      <template v-if="pageContent.doc_type === contentMap.rich">
        <div id="content-rich-box">
          <div id="toolbar-container"><!-- 工具栏 --></div>
          <div id="editor-container"><!-- 编辑器 --></div>
        </div>
      </template>
      <template v-if="pageContent.doc_type === contentMap.markdown">
        <label for="content-markdown-box"></label><textarea id="content-markdown-box"></textarea>
      </template>
      <template v-if="pageContent.doc_type === contentMap.website">
        <div id="content-website-box">
          <el-input type="text" placeholder="请输入网站地址"></el-input>
        </div>
      </template>
      <template v-if="pageContent.doc_type === contentMap.assets">
        <div id="content-assets-box">
          <el-upload class="upload-demo" drag>
            <span class="el-icon--upload iconfont icon-yunshangchuan"></span>
            <div class="el-upload__text">
              拉取图片到这里或者 <em>点击上传</em>
            </div>
            <template #tip>
              <div class="el-upload__tip">仅支持ZIP格式文件，最大不能超过5M</div>
            </template>
          </el-upload>
        </div>
      </template>
    </template>
  </template>
  <template v-if="pageContent === false">
    <el-empty description="请在左侧选中页面"></el-empty>
  </template>
</template>
<script>
export default {
  props: {
    currentPage: [Object, null],
    pageContent: [Boolean, Object, null]
  },
  methods: {

  }
}
</script>