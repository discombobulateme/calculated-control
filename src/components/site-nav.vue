<template>
  <header>
    <nav>
      <ul
        v-show="isHome || isBlurred"
        :class="{
          nav__list: true,
          'base-grid': true,
          blurrable: true,
          'blurred': isBlurred,
        }"
      >
        <li v-show="!isPage('about')" class="blob blob--pink nav__item nav__item--main" style="--grid-area: a;">
          <router-link class="nav__link" :to="{ name: 'About' }">
            <h1 class="nav__title">calculated control:<br/>
            (netz)kunst und kybernetik</h1>
            <div class="nav__subtitle">20/02/-31/10/2021<br/>
            haus der statistik &amp; panke.gallery</div>
          </router-link>
        </li>
        <li v-if="liveItem || loadingLiveItem" class="blob nav__item nav__item--page" style="--grid-area: k;">
          <Loader v-if="loadingLiveItem" />
          <router-link class="nav__link" :to="{ name: 'Item', params: { key: liveItem.key } }">
            <HomePreview tag="live" :title="liveItem.title" :type="liveItem.type" :imageUrl="liveItem.imageUrl" />
          </router-link>
        </li>
        <li v-if="newItem || loadingNewItem" class="blob nav__item nav__item--page" style="--grid-area: l;">
          <Loader v-if="loadingNewItem" />
          <router-link v-else class="nav__link" :to="{ name: 'Item', params: { key: newItem.key } }">
            <HomePreview tag="new" :title="newItem.title" :type="newItem.type" :imageUrl="newItem.imageUrl" />
          </router-link>
        </li>
        <li class="blob blob--green nav__item" style="--grid-area: e;">
          <router-link class="nav__link" :to="{ name: 'Archive' }">archive</router-link>
        </li>
        <li class="blob blob--pink nav__item" style="--grid-area: b;">
          <router-link class="nav__link" :to="{ name: 'Node', params: { node: 'exhibition' } }"><span class="hash">#</span>exhibition</router-link>
        </li>
        <li class="blob blob--pink nav__item" style="--grid-area: h;">
          <router-link class="nav__link" :to="{ name: 'Node', params: { node: 'journal' } }"><span class="hash">#</span>journal</router-link>
        </li>
        <li class="blob blob--pink nav__item" style="--grid-area: g;">
          <router-link class="nav__link" :to="{ name: 'Node', params: { node: 'symposium' } }"><span class="hash">#</span>symposium</router-link>
        </li>
        <li class="blob blob--pink nav__item" style="--grid-area: c;">
          <router-link class="nav__link" :to="{ name: 'Node', params: { node: 'unconference' } }"><span class="hash">#</span>unconference</router-link>
        </li>
        <li class="blob nav__item nav__item--page" style="--grid-area: d;">
          <router-link class="nav__link" :to="{ name: 'Team' }">team</router-link>
        </li>
        <li class="blob nav__item nav__item--page" style="--grid-area: i;">
          <router-link class="nav__link" :to="{ name: 'Visit' }">visit</router-link>
        </li>
        <li class="blob nav__item nav__item--page" style="--grid-area: f;">
          <router-link class="nav__link" :to="{ name: 'Contact' }">contact</router-link>
        </li>
        <li class="blob nav__item nav__item--page" style="--grid-area: j;">
          <button class="nav__link">de/en</button>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
import { getItemsForTag } from '@/api';
import { getMainTag } from '@/utils';
import HomePreview from '@/components/home-preview';
import Loader from '@/components/icons/loader';

const blurPages = ['about'];

export default {
  name: 'SiteNav',
  components: {
    HomePreview,
    Loader,
  },
  data: () => ({
    loadingLiveItem: false,
    loadingNewItem: false,
    liveItem: null,
    newItem: null,
  }),
  computed: {
    isBlurred() {
      return blurPages.some(page => this.isPage(page));
    },
    isHome() {
      return this.$route.path === '/';
    },
  },
  created() {
    this.getLiveItem();
    this.getNewItem();
  },
  methods: {
    isPage(page) {
      return this.$route.path.startsWith(`/${page}`);
    },
    async getLiveItem() {
      this.loadingLiveItem = true;
      const items = await getItemsForTag({ tag: 'live' });
      this.liveItem = {
        title: items[0].data.title,
        imageUrl: items[0].data.rights,
        type: getMainTag(items[0].data),
        key: items[0].key,
      };
      this.loadingLiveItem = false;
    },
    async getNewItem() {
      this.loadingNewItem = true;
      const items = await getItemsForTag({ tag: 'new' });
      this.newItem = {
        title: items[0].data.title,
        imageUrl: items[0].data.rights,
        type: getMainTag(items[0].data),
        key: items[0].key,
      };
      this.loadingNewItem = false;
    },
  }
}
</script>

<style scoped>
.nav__list {
  list-style-type: none;
  margin: 0;
  padding: 0;
  background: 0;
  height: 100vh;
  width: 100vw;
}

.nav__item {
  grid-column: span 6;
  grid-row: span 1;
}

@media screen and (min-width: 1024px) {
  .nav__list {
    display: grid;
    grid-template-areas: "a a a k k k"
                         "a a a l l l"
                         "c c e g h h"
                         "c c e g h h"
                         "b b d g h h"
                         "b b f g i j";
  }

  .nav__item {
    grid-area: var(--grid-area);
  }
}

.nav__title {
  font-size: var(--font-size-xxl);
  margin: 0;
}

.nav__subtitle {
  font-size: var(--font-size-small);
}

.nav__item--main {
  background-color: var(--color-prime-green);
}

.nav__link {
  appearance: none;
  background: inherit;
  border-radius: inherit;
  border: inherit;
  color: inherit;
  cursor: pointer;
  font-size: inherit;
  text-decoration: inherit;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
}

.nav__item--main .nav__link {
  display: block;
}

@media screen and (min-width: 1024px) {
  .nav__item--main .nav__link {
    display: flex;
    flex-direction: column;
  }
}
</style>
