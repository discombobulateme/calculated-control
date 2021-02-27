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
        <li v-show="!isPage('about')" class="blob blob--pink nav__item nav__item--main" style="grid-area: a;">
          <router-link class="nav__link" :to="{ name: 'About' }">
            calculating control:<br/>
            (netz)kunst und kybernetik<br/>
            20/02/-31/10/2021<br/>
            haus der statistik &amp; panke.gallery<br/>
          </router-link>
        </li>
        <li class="blob blob--green nav__item" style="grid-area: e;">
          <router-link class="nav__link" :to="{ name: 'Archive' }">archive</router-link>
        </li>
        <li class="blob blob--pink nav__item" style="grid-area: b;">
          <router-link class="nav__link" :to="{ name: 'Node', params: { node: 'exhibition' } }">#exhibition</router-link>
        </li>
        <li class="blob blob--pink nav__item" style="grid-area: h;">
          <router-link class="nav__link" :to="{ name: 'Node', params: { node: 'journal' } }">#journal</router-link>
        </li>
        <li class="blob blob--pink nav__item" style="grid-area: g;">
          <router-link class="nav__link" :to="{ name: 'Node', params: { node: 'symposium' } }">#symposium</router-link>
        </li>
        <li class="blob blob--pink nav__item" style="grid-area: c;">
          <router-link class="nav__link" :to="{ name: 'Node', params: { node: 'unconference' } }">#unconference</router-link>
        </li>
        <li class="blob nav__item nav__item--page" style="grid-area: d;">
          <router-link class="nav__link" :to="{ name: 'Team' }">team</router-link>
        </li>
        <li class="blob nav__item nav__item--page" style="grid-area: i;">
          <router-link class="nav__link" :to="{ name: 'Visit' }">visit</router-link>
        </li>
        <li class="blob nav__item nav__item--page" style="grid-area: f;">
          <router-link class="nav__link" :to="{ name: 'Contact' }">contact</router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
const blurPages = ['about'];

export default {
  name: 'SiteNav',
  computed: {
    isBlurred() {
      return blurPages.some(page => this.isPage(page));
    },
    isHome() {
      return this.$route.path === '/';
    },
  },
  methods: {
    isPage(page) {
      return this.$route.path.startsWith(`/${page}`);
    }
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
  grid-template-areas: "a a a b b b"
                       "c c d b b b"
                       "c c e g g h"
                       "c c f g g i";
}

.nav__item--main {
  color: var(--color-prime-green);
}

.nav__link {
  color: inherit;
  display: block;
  text-decoration: inherit;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
