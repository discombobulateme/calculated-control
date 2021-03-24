import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Archive from '../views/Archive.vue';
import Item from '../views/Item.vue';
import ArchiveAbout from '../views/ArchiveAbout.vue';
import SymposiumAbout from '../views/SymposiumAbout.vue';
import UnconferenceAbout from '../views/UnconferenceAbout.vue';
import JournalAbout from '../views/JournalAbout.vue';
import About from '../views/About.vue';
import Team from '../views/Team.vue';
import Contact from '../views/Contact.vue';
import Imprint from '../views/Imprint.vue';
import Visit from '../views/Visit.vue';
import { getTagsFromRoute } from '@/utils';

Vue.use(VueRouter)

const routes = [
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
    path: '/visit',
    name: 'Visit',
    component: Visit,
    props: {
      title: 'visit',
    },
  },
  {
    path: '/imprint',
    name: 'Imprint',
    component: Imprint,
  },
  {
    path: '/archive/about',
    name: 'ArchiveAbout',
    component: ArchiveAbout,
  },
  {
    path: '/symposium/about',
    name: 'SymposiumAbout',
    component: SymposiumAbout,
  },
  {
    path: '/unconference/about',
    name: 'UnconferenceAbout',
    component: UnconferenceAbout,
  },
  {
    path: '/journal/about',
    name: 'JournalAbout',
    component: JournalAbout,
  },
  {
    path: '/archive',
    name: 'Archive',
    component: Archive,
    props: route => ({
      query: route.query.q,
      searchTags: getTagsFromRoute(route),
    }),
  },
  {
    path: '/node/:node',
    name: 'Node',
    component: Archive,
    props: route => ({
      query: route.query.q,
      searchTags: getTagsFromRoute(route),
      node: route.params.node,
    }),
  },
  {
    path: '/item/:key',
    name: 'Item',
    component: Item,
    props: route => ({
      id: route.params.key,
    }),
  },
  {
    path: '*',
    name: 'Home',
    component: Home
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
