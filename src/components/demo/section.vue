<template>
  <section class="doc-demo-section">
    <slot />
  </section>
</template>

<script>
export default {
  name: 'demo-section'
};
</script>

<style lang="less">
.doc-demo-section {
  box-sizing: border-box;
  min-height: calc(100vh - 56px);
  padding-bottom: 20px;
}
</style>
