import Vue from 'vue';
import mImage from './image';
import uploader from './uploader';

const MyComponents = [
  mImage,
  uploader
];

MyComponents.forEach(item => Vue.component(item.name, item));
