export function isPromise(obj) {
  return obj && obj.then && obj.catch;
}

export function toArray(item) {
  if (Array.isArray(item)) {
    return item;
  }

  return [item];
}

export function readFile(file, resultType) {
  return new Promise((resolve) => {
    if (resultType === 'file') {
      return resolve();
    }

    const reader = new FileReader();

    reader.onload = (event) => {
      resolve(event.target.result);
    }

    if (resultType === 'dataUrl') {
      reader.readAsDataURL(file);
    } else if (resultType === 'text') {
      reader.readAsText(file);
    }
  })
}

export function isOversize(files, maxSize) {
  return toArray(files).some(file => file.size > maxSize);
}

const IMAGE_REGEXP = /\.(jpeg|jpg|gif|png|svg|webp|bmp)/i;

export function isImageUrl(url) {
  return IMAGE_REGEXP.test(url);
}

export function isImageFile(item) {
  // 一些图片地址不含有后缀名，这时可手动设置 isImage 标记图片
  if (item.isImage) {
    return true;
  }

  if (item.file && item.file.type) {
    return item.file.type.indexOf('image') === 0;
  }

  if (item.url) {
    return isImageUrl(item.url);
  }

  if (item.content) {
    return item.content.indexOf('data:image') === 0;
  }

  return false;
}
