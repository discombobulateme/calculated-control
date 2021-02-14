import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Archive from '../views/Archive.vue';
import Item from '../views/Item.vue';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/archive',
    name: 'Archive',
    component: Archive,
    props: route => ({
      query: route.query.q,
      searchTags: Array.isArray(route.query.tags) ? route.query.tags : [route.query.tags],
    }),
  },
  {
    path: '/item/:key',
    name: 'Item',
    component: Item,
    props: route => ({
      id: route.params.key,
    }),
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
