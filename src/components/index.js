import Vue from 'vue';
import mImage from './image/index.vue';

const MyComponents = [
  mImage
];

MyComponents.forEach(item => Vue.component(item.name, item));
