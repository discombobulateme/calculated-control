import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Archive from '../views/Archive.vue';
import Item from '../views/Item.vue';
import ArchiveAbout from '../views/ArchiveAbout.vue';
import SymposiumAbout from '../views/SymposiumAbout.vue';
import UnconferenceAbout from '../views/UnconferenceAbout.vue';
import JournalAbout from '../views/JournalAbout.vue';
import HDSExhibitionAbout from '../views/HDSExhibitionAbout.vue';
import PankeExhibitionAbout from '../views/PankeExhibitionAbout.vue';
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
    path: '/ausstellung/hds',
    name: 'HDSExhibitionAbout',
    component: HDSExhibitionAbout,
  },
  {
    path: '/ausstellung/panke',
    name: 'PankeExhibitionAbout',
    component: PankeExhibitionAbout,
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
    path: '/e',
    ...archiveRouteConfigForNode('ausstellung'),
  },
  {
    path: '/j',
    ...archiveRouteConfigForNode('journal'),
  },
  {
    path: '/s',
    ...archiveRouteConfigForNode('symposium'),
  },
  {
    path: '/u',
    ...archiveRouteConfigForNode('unconference'),
  },
  {
    path: '/item/:key',
    name: 'Item',
    ...itemRouteConfig,
  },
  {
    path: '/entry/:key',
    name: 'Entry',
    ...itemRouteConfig,
  },
  {
    path: '/eintrag/:key',
    name: 'Eintrag',
    ...itemRouteConfig,
  },
  {
    path: '',
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
  base: '/cc/',
  routes
});

export default router
