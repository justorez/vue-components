<template>
  <demo-section>
    <demo-block title="填充模式">
      <div class="row">
        <m-image width="100" height="100" :src="image" />
      </div>
    </demo-block>

    <demo-block title="填充模式">
      <div class="row">
        <div class="col--7 gutter--10" v-for="(fit, i) in fits" :key="i">
          <m-image :fit="fit" width="100%" height="27vw" :src="image" />
          <div class="text">{{ fit }}</div>
        </div>
      </div>
    </demo-block>

    <demo-block title="加载中提示">
      <m-image width="100%" height="27vw" />
      <div class="text">默认提示</div>
    </demo-block>

    <demo-block title="加载失败提示">
      <m-image width="100%" height="27vw" src="x" />
      <div class="text">默认提示</div>
    </demo-block>
  </demo-section>
</template>

<script>
export default {
  name: 'image-demo',
  data() {
    return {
      image: 'https://img.yzcdn.cn/vant/cat.jpeg',
      fits: ['contain', 'cover', 'fill', 'none', 'scale-down'],
    };
  }
};
</script>

<style lang="less">
@import '../../style/var';
@import '../../style/util';

.demo-image {
  overflow-x: hidden;
  background-color: @white;
}

.text {
  margin-top: 5px;
  color: @gray-7;
  font-size: 14px;
  text-align: center;
}
</style>
