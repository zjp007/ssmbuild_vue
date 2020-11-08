import Vue from 'vue'
import Router from 'vue-router'
import BooksList from '@/components/BookList.vue'
import NotFound from '@/components/NotFound'

import BookView from '@/components/BookView'
import BookEdit from '@/components/BookEdit'

Vue.use(Router)

export default new Router({
  linkActiveClass: "active",
  mode: "history",
  routes: [
    {
      path: '/index',
      name: 'BooksList',
      component: BooksList
    },
    {
      path: '/view/:id',
      props: true,
      name: 'BookView',
      component: BookView
    },
    {
      path: '/edit/:id',
      props: true,
      name: 'BookEdit',
      component: BookEdit
    },
    {
      path: '*',
      name: 'NotFound',
      component: NotFound
    }
  ]
})
