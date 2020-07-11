import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/ask',
    name: 'ask',
    props: (route) => ({ question: route.query.question }),
    component: () => import(/* webpackChunkName: "ask" */ '../views/ask.vue')
  }
];

const router = new VueRouter({
  routes
});

export default router;
