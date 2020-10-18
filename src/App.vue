<template>
  <div id="app">
    <demo-nav />
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
import DemoNav from './components/demo/nav';

export default {
  components: { DemoNav }
};
</script>

<style lang="less">
@import './style/var.less';
@import './style/base.less';

body {
  min-width: 100vw;
}

::-webkit-scrollbar {
  width: 0;
  background: transparent;
}
</style>
