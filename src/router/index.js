import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Archive from '../views/Archive.vue';
import Item from '../views/Item.vue';
import About from '../views/About.vue';
import Team from '../views/Team.vue';
import Contact from '../views/Contact.vue';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: About,
    props: {
      id: 'Z5G3CTNR',
    },
  },
  {
    path: '/team',
    name: 'Team',
    component: Team,
    props: {
      id: 'GDUG6QQS',
      title: 'zentrum für netzkunst',
    },
  },
  {
    path: '/contact',
    name: 'Contact',
    component: Contact,
    props: {
      id: 'T7I2AKJ4',
      title: 'contact',
    },
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
