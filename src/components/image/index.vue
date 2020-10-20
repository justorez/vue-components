<template>
  <div 
    class="m-image" 
    :style="$attrs"
    @click="onClick($event)"
  >
    <img 
      :class="bem('img')"
      v-if="!error"
      :src="src" 
      :alt="alt"
      :style="{objectFit: fit}"
      @load="onLoad($event)"
      @error="onError($event)"
    />

    <div 
      :class="bem('loading')"
      v-if="loading && showLoading"
    >
      <van-icon :class="bem('loading-icon')" :name="loadingIcon"/>
    </div>

    <div 
      :class="bem('error')"
      v-if="error && showError"
    >
      <van-icon :class="bem('error-icon')" :name="errorIcon"/>
    </div>
  </div>
</template>

<script>
import { createBEM } from '../utils/bem';

export default {
  name: 'm-image',
  inheritAttrs: false,
  props: {
    src: String,
    fit: String,
    alt: String,
    showError: {
      type: Boolean,
      default: true
    },
    showLoading: {
      type: Boolean,
      default: true
    },
    errorIcon: {
      type: String,
      default: 'photo-fail'
    },
    loadingIcon: {
      type: String,
      default: 'photo-o'
    }
  },
  data() {
    return {
      bem: createBEM('m-image'),
      loading: true,
      error: false
    }
  },
  watch: {
    src() {
      this.loading = true;
      this.error = false;
    }
  },
  methods: {
    onLoad(event) {
      this.loading = false;
      this.$emit('load', event);
    },
    onError(event) {
      this.error = true;
      this.loading = false;
      this.$emit('error', event);
    },
    onClick(event) {
      this.$emit('click', event);
    }
  }
}
</script>

<style lang="less">
@import './index.less';
</style>