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

Vue.use(VueRouter);

const itemRouteConfig = {
  component: Item,
  props: route => ({
    id: route.params.key,
  }),
};

const archiveRouteConfigForNode = node => ({
  component: Archive,
  props: route => ({
    query: route.query.q,
    searchTags: getTagsFromRoute(route),
    node,
  }),
});

const routes = [
  {
    path: '/cc/about',
    name: 'About',
    component: About,
    props: {
      id: 'Z5G3CTNR',
    },
  },
  {
    path: '/cc/team',
    name: 'Team',
    component: Team,
    props: {
      id: 'GDUG6QQS',
      title: 'zentrum für netzkunst',
    },
  },
  {
    path: '/cc/contact',
    name: 'Contact',
    component: Contact,
    props: {
      id: 'T7I2AKJ4',
      title: 'contact',
    },
  },
  {
    path: '/cc/visit',
    name: 'Visit',
    component: Visit,
    props: {
      title: 'visit',
    },
  },
  {
    path: '/cc/imprint',
    name: 'Imprint',
    component: Imprint,
  },
  {
    path: '/cc/archive/about',
    name: 'ArchiveAbout',
    component: ArchiveAbout,
  },
  {
    path: '/cc/symposium/about',
    name: 'SymposiumAbout',
    component: SymposiumAbout,
  },
  {
    path: '/cc/unconference/about',
    name: 'UnconferenceAbout',
    component: UnconferenceAbout,
  },
  {
    path: '/cc/journal/about',
    name: 'JournalAbout',
    component: JournalAbout,
  },
  {
    path: '/cc/archive',
    name: 'Archive',
    component: Archive,
    props: route => ({
      query: route.query.q,
      searchTags: getTagsFromRoute(route),
    }),
  },
  {
    path: '/cc/node/:node',
    name: 'Node',
    component: Archive,
    props: route => ({
      query: route.query.q,
      searchTags: getTagsFromRoute(route),
      node: route.params.node,
    }),
  },
  {
    path: '/cc/e',
    ...archiveRouteConfigForNode('ausstellung'),
  },
  {
    path: '/cc/j',
    ...archiveRouteConfigForNode('journal'),
  },
  {
    path: '/cc/s',
    ...archiveRouteConfigForNode('symposium'),
  },
  {
    path: '/cc/u',
    ...archiveRouteConfigForNode('unconference'),
  },
  {
    path: '/cc/item/:key',
    name: 'Item',
    ...itemRouteConfig,
  },
  {
    path: '/cc/entry/:key',
    name: 'Entry',
    ...itemRouteConfig,
  },
  {
    path: '/cc/eintrag/:key',
    name: 'Eintrag',
    ...itemRouteConfig,
  },
  {
    path: '/cc',
    name: 'Home',
    component: Home
  },
  {
    path: '/',
    name: 'Home',
    component: Home
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router
