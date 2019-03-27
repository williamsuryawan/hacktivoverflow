import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/questions',
      name: 'all-questions',
      component: () => import('./components/AllQuestions.vue'),
      children: [
        {
          path: 'create',
          name: "ask",
          component: () => import('./components/QuestionCreate.vue')
        }, 
        {
          path: ':id',
          name: 'question-detail',
          component: () => import('./components/QuestionDetail.vue')
        }, 
        {
          path: ':id/edit',
          name: 'question-edit',
          component: () => import('./components/QuestionEdit.vue')
        },
        // {
        //   path: 'delete/:id',
        //   name: 'question-delete',
        //   component: () => import('./components/QuestionDelete.vue')
        // }
      ],
    },
    {
      path: '/answers/:id/edit',
      name: 'answer-edit',
      component: () => import('./components/AnswerEdit.vue')
    },
    {
      path: '/login',
      name: 'user-login',
      component: () => import('./components/Login.vue'),
  },
  ],
});
