import Vue from 'vue'
import VueRouter from 'vue-router'
import CardView from '../views/CardView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'cardView',
    component: CardView
  },
  {
    path: '/list',
    name: 'list',
    component: () => import(/* webpackChunkName: "list" */ '../views/ListView.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
