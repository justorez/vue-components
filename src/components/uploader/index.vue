<template>
  <div class="uploader">
    <div class="uploader__wrapper">

      <div 
        class="uploader__preview"
        v-for="(item, i) in fileList"
        :key="i"
      >
        <div class="uploader__preview-image" @click="onPreview(item)">
          <img :src="item.content || item.url" alt=""/>
        </div>
        <div v-if="deletable" class="uploader__preview-delete">
          <van-icon 
            class="uploader__preview-delete-icon"
            name="cross"
            @click="onDelete(item, i)"
          />
        </div>
      </div>

      <div class="uploader__upload">
        <van-icon class="uploader__upload-icon" name="plus"/>
        <input 
          id="uploader" 
          type="file" 
          class="uploader__input"
          :accept="accept"
          @change="onChange"
          ref="input"
        />
      </div>
    </div>
  </div>
</template>

<script>
import {
  isPromise,
  toArray, 
  readFile, 
  isOversize, 
  isImageFile
} from "./utils";

export default {
  name: "uploader",
  model: {
    prop: "fileList",
  },
  props: {
    fileList: {
      type: Array,
      default: () => [],
    },
    accept: {
      type: String,
      default: "image/*",
    },
    afterRead: Function,
    beforeDelete: Function,
    maxCount: {
      type: Number,
      default: Number.MAX_VALUE,
    },
    resultType: {
      type: String,
      default: "dataUrl",
      validator: (type) => {
        return ["file", "dataUrl", "text"].includes(type);
      },
    },
    deletable: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    onChange(event) {
      let { files } = event.target;

      if (!files.length) {
        return;
      }

      files = files.length === 1 ? files[0] : [].slice.call(files);

      this.readFile(files);
    },
    readFile(files) {
      if (Array.isArray(files)) {
        const maxCount = this.maxCount - this.fileList.length;

        if (files.length > maxCount) {
          files = files.slice(0, maxCount);
        }

        Promise.all(files.map(file => readFile(file, this.resultType))).then(
          (contents) => {
            const fileList = files.map((file, index) => {
              const result = { file, status: "", message: "" };

              if (contents[index]) {
                result.content = contents[index];
              }

              return result;
            });

            this.onAfterRead(fileList);
          }
        );
      } else {
        readFile(files, this.resultType).then((content) => {
          const result = { file: files, status: "", message: "" };

          if (content) {
            result.content = content;
          }

          this.onAfterRead(result);
        });
      }
    },
    onAfterRead(files) {
      this.resetInput();

      let validFiles = files;

      const isValidFiles = Array.isArray(validFiles)
        ? Boolean(validFiles.length)
        : Boolean(validFiles);

      if (isValidFiles) {
        this.$emit('input', [...this.fileList, ...toArray(validFiles)]);

        if (this.afterRead) {
          this.afterRead(validFiles);
        }
      }
    },
    onDelete(file, index) {
      if (this.beforeDelete) {
        const response = this.beforeDelete(file);

        if (!response) {
          return;
        }

        if (isPromise(response)) {
          response
            .then(() => this.deleteFile(file, index))
            .catch(() => {});
          return;
        }
      }

      this.deleteFile(file, index);
    },
    deleteFile(file, index) {
      this.fileList.splice(index, 1);
      this.$emit('input', this.fileList);
      this.$emit('delete', file);
    },
    onPreview(file) {
      this.$emit('click-preview', file);
    },
    resetInput() {
      if (this.$refs.input) {
        this.$refs.input.value = '';
      }
    }
  }
};
</script>

<style lang="less">
@import './index.less';
</style>