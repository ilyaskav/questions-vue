import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/home.vue';
import PageNotFound from '../views/404.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/ask/:questionId?',
    name: 'ask',
    props: (route) => ({
      question: route.query.question,
      questionId: +route.params.questionId || null
    }),
    component: () => import(/* webpackChunkName: "ask" */ '../views/ask.vue')
  },
  {
    path: '/give-answer/:questionId',
    name: 'answer',
    props: (route) => {
      const props = { ...route.params };
      props.questionId = +props.questionId;
      return props;
    },
    component: () => import(/* webpackChunkName: "answer" */ '../views/answer.vue')
  },
  { path: '*', component: PageNotFound }
];

const router = new VueRouter({
  routes
});

export default router;
