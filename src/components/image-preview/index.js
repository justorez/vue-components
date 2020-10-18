import Vue from 'vue';
import _ImagePreview from './';

let instance;
let defaultConfig = {
  image: '',
  value: true,
  minZoom: 1 / 3,
  maxZoom: 3,
  className: '',
  onClose: null,
  onChange: null,
  showIndex: true,
  closeable: false,
  closeIcon: 'clear',
  closeOnPopstate: false,
  closeIconPosition: 'top-right',
  getContainer: 'body'
}

let initInstance = function () {
  instance = new (Vue.extend(_ImagePreview))({
    el: document.createElement('div')
  });

  document.body.appendChild(instance.$el);
  instance.$on('scale', function(data) {
    if (instance.onScale) {
      instance.onScale(data);
    }
  })
}

const ImagePreview = function (src) {
  if (!instance) {
    initInstance();
  }

  let options = { image: src };

  instance.$once('input', function(show) {
    instance.value = show;
  });

  instance.$once('closed', function() {
    instance.image = '';
  });

  if (options.onClose) {
    instance.$off('close');
    instance.$once('close', options.onClose);
  }

  return instance;
}

ImagePreview.Component = _ImagePreview;

ImagePreview.install = function() {
  Vue.use(_ImagePreview);
}

export default ImagePreview;
