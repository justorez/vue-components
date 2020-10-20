import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/home')
  },
  {
    path: '/image',
    name: 'image',
    component: () => import('../components/image/demo'),
    meta: {
      name: 'image'
    }
  },
  {
    path: '/uploader',
    name: 'uploader',
    component: () => import('../components/uploader/demo'),
    meta: {
      name: 'uploader'
    }
  }
]

const router = new VueRouter({
  routes
});

export default router;
