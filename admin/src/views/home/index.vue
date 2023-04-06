<template>
  <div class="page-home-wrap">
    <div class="title">欢迎来到文档系统</div>
  </div>
</template>
<style scoped>
.page-home-wrap {
  position: relative;
  height: calc(100vh - 120px);
  background-image: url("~@/assets/images/admin-home-bg.jpeg");
  background-size: cover;
}

.page-home-wrap:after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 10;
}

.page-home-wrap .title {
  position: absolute;
  top: 60px;
  left: 0;
  width: 100%;
  font-size: 32px;
  color: #ffffff;
  text-align: center;
  z-index: 12;
}
</style>
