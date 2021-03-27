<template>
  <header>
    <nav>
      <ul
        :class="{
          nav__list: true,
          'base-grid': true,
          blurrable: true,
          'blurred': blurred,
        }"
      >
        <li v-show="!isPage('about')" class="blob blob--pink nav__item nav__item--main"
          :style="{ '--grid-area': 'a', 'grid-column': (loadingLiveItem || loadingNewItem || newItem || liveItem) ? 'span 3' : 'span 6' }">
          <router-link class="nav__link" :to="{ name: 'About' }">
            <h1 class="nav__title">Calculating Control:<br/>
            (Netz)Kunst und Kybernetik</h1>
            <div class="nav__subtitle">20/02 &ndash; 31/10/2021<br/>
            Haus der Statistik &amp; panke.gallery</div>
          </router-link>
        </li>
        <li v-if="liveItem && !loadingLiveItem" class="blob nav__item nav__item--page nav__item--preview"
            :style="{ '--grid-area': 'k', 'grid-row': newItem ? 'auto' : 'span 2' }">
          <router-link class="nav__link" :to="{ name: 'Item', params: { key: liveItem.key } }">
            <HomePreview tag="live" :title="liveItem.title" :type="liveItem.type" :imageUrl="liveItem.imageUrl" />
          </router-link>
        </li>
        <li v-if="newItem && !loadingNewItem" class="blob nav__item nav__item--page nav__item--preview"
            :style="{ '--grid-area': liveItem ? 'l' : 'k', 'grid-row': liveItem ? 'auto' : 'span 2' }">
          <router-link class="nav__link" :to="{ name: 'Item', params: { key: newItem.key } }">
            <HomePreview tag="new" :title="newItem.title" :type="newItem.type" :imageUrl="newItem.imageUrl" />
          </router-link>
        </li>
        <li class="blob blob--green nav__item" style="--grid-area: e;">
          <router-link class="nav__link" :to="{ name: 'Archive' }">{{ $t('archive.title') }}</router-link>
        </li>
        <li class="blob blob--pink nav__item" style="--grid-area: b;">
          <router-link class="nav__link" :to="{ path: '/cc/e' }"><span class="hash">#</span>{{ $t('home.ausstellung').toLowerCase() }}</router-link>
        </li>
        <li class="blob blob--pink nav__item" style="--grid-area: h;">
          <router-link class="nav__link" :to="{ path: '/cc/j' }"><span class="hash">#</span>{{ $t('home.journal').toLowerCase() }}</router-link>
        </li>
        <li class="blob blob--pink nav__item" style="--grid-area: g;">
          <router-link class="nav__link" :to="{ path: '/cc/s' }"><span class="hash">#</span>{{ $t('home.symposium').toLowerCase() }}</router-link>
        </li>
        <li class="blob blob--pink nav__item" style="--grid-area: c;">
          <router-link class="nav__link" :to="{ path: '/cc/u' }"><span class="hash">#</span>{{ $t('home.unconference').toLowerCase() }}</router-link>
        </li>
        <li class="blob nav__item nav__item--page" style="--grid-area: d;">
          <router-link class="nav__link" :to="{ name: 'Team' }">{{ $t('home.team') }}</router-link>
        </li>
        <li class="blob nav__item nav__item--page" style="--grid-area: i;">
          <router-link class="nav__link" :to="{ name: 'Visit' }">{{ $t('home.visit') }}</router-link>
        </li>
        <li class="blob nav__item nav__item--page" style="--grid-area: f;">
          <router-link class="nav__link" :to="{ name: 'Contact' }">{{ $t('home.contact') }}</router-link>
        </li>
        <li class="blob nav__item nav__item--page" style="--grid-area: j;">
          <LanguageSwitch class="nav__link" />
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
import { mapState, mapActions } from 'vuex';

import HomePreview from '@/components/home-preview';
import LanguageSwitch from '@/components/language-switch';

export default {
  name: 'SiteNav',
  components: {
    HomePreview,
    LanguageSwitch,
  },
  props: {
    blurred: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ...mapState(['loadingLiveItem', 'liveItem', 'loadingNewItem', 'newItem']),
    isHome() {
      return this.$route.path === '/';
    },
  },
  created() {
    this.fetchLiveItem(this.$t.bind(this));
    this.fetchNewItem(this.$t.bind(this));
  },
  methods: {
    ...mapActions(['fetchLiveItem', 'fetchNewItem']),
    isPage(page) {
      return this.$route.path.startsWith(`/${page}`);
    },
  }
}
</script>

<style scoped>
.nav__list {
  display: grid;
  list-style-type: none;
  margin: 0;
  padding: 0;
  background: 0;
  width: 100vw;
}

@media screen and (max-width: 767px) {
  .nav__list {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: min-content;
  }

  .nav__item {
    height: 140px;
  }

  .nav__item--main,
  .nav__item:last-of-type,
  .nav__item--preview {
    grid-column: span 2 !important;
    height: auto;
  }

  .nav__item:last-of-type {
    min-height: 70px;
  }
}

@media screen and (min-width: 768px) {
  .nav__list {
    height: 100vh;
    grid-template-areas: "a a a k k k"
                         "a a a l l l"
                         "c c e g h h"
                         "c c e g h h"
                         "b b d g h h"
                         "b b f g i j";
  }

  .nav__item,
  .nav__item--main,
  .nav__item:last-of-type {
    grid-area: var(--grid-area);
  }
}

.nav__title {
  line-height: 1.05;
  font-size: calc(var(--font-size-xl) + 3px);
  margin: 40px 0 15px;
}

.nav__subtitle {
  font-size: var(--font-size-xs);
  margin-bottom: 40px;
}

@media screen and (min-width: 768px) {
  .nav__title {
    margin: 0 0 15px;
  }

  .nav__subtitle {
    font-size: var(--font-size-small);
    margin: 0;
  }
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

@media screen and (min-width: 768px) {
  .nav__item--main .nav__link {
    display: flex;
    flex-direction: column;
  }
}
</style>
