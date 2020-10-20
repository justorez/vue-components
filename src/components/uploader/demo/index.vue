<template>
  <demo-section class="demo">
    <uploader
      v-model="imgList"
    />
  </demo-section>
</template>

<script>
export default {
  name: 'uploader-demo',
  data() {
    return {
      imgList: []
    }
  }
}
</script>

<style lang="less">
.demo {
  padding: 20px;
  background-color: #efefef;
}
</style>