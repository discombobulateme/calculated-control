<template>
  <div id="app">
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
        <li v-show="!isPage('about')" class="nav__item nav__item--main" style="grid-area: a;">
          <router-link class="nav__link" :to="{ name: 'About' }">
            calculating control:<br/>
            (netz)kunst und kybernetik<br/>
            20/02/-31/10/2021<br/>
            haus der statistik &amp; panke.gallery<br/>
          </router-link>
        </li>
        <li class="nav__item nav__item--highlight" style="grid-area: e;">
          <router-link class="nav__link" :to="{ name: 'Archive' }">archive</router-link>
        </li>
        <li class="nav__item" style="grid-area: b;">
          <router-link class="nav__link" :to="{ name: 'Node', params: { node: 'exhibition' } }">#exhibition</router-link>
        </li>
        <li class="nav__item" style="grid-area: h;">
          <router-link class="nav__link" :to="{ name: 'Node', params: { node: 'journal' } }">#journal</router-link>
        </li>
        <li class="nav__item" style="grid-area: g;">
          <router-link class="nav__link" :to="{ name: 'Node', params: { node: 'symposium' } }">#symposium</router-link>
        </li>
        <li class="nav__item" style="grid-area: c;">
          <router-link class="nav__link" :to="{ name: 'Node', params: { node: 'unconference' } }">#unconference</router-link>
        </li>
        <li class="nav__item nav__item--page" style="grid-area: d;">
          <router-link class="nav__link" :to="{ name: 'Team' }">team</router-link>
        </li>
        <li class="nav__item nav__item--page" style="grid-area: i;">
          <router-link class="nav__link" :to="{ name: 'Visit' }">visit</router-link>
        </li>
        <li class="nav__item nav__item--page" style="grid-area: f;">
          <router-link class="nav__link" :to="{ name: 'Contact' }">contact</router-link>
        </li>
      </ul>
    </nav>
    </header>
    <router-view/>
  </div>
</template>

<script>
const blurPages = ['about'];

export default {
  name: 'CalculatedControl',
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

<style>
@font-face {
  font-family: "Maxima-Lig";
  src: url('assets/font/font.woff2') format('woff2'), url('assets/font/font.woff') format('woff');
}

* {
  box-sizing: border-box;
}

html,
body {
  margin: 0;
  padding: 0;
}

html {
  --color-prime-green: rgb(156, 250, 111);
  --color-prime-pink: rgb(220, 182, 189);
  --color-prime-olive: rgb(109, 93, 56);
  --color-prime-light-grey: rgb(225, 225, 225);

  --font-size-small: 24px;
  --font-size-medium: 2vw;
  --font-size-large: 39px;
  --font-size-xl: 5vw;

  --border-radius: 30px;
  font-family: "Maxima-Lig", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: var(--color-prime-olive);
  font-size: 16px;
}

h1, h2, h3, h4, h5 {
  font-weight: normal;
}

.base-grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: 3fr 3fr 3fr 1fr;
}

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

.nav__item {
  background: var(--color-prime-pink);
  border-radius: var(--border-radius);
  font-size: var(--font-size-large);
  text-align: center;
}

.nav__item--main {
  color: var(--color-prime-green);
}

.nav__item--highlight {
  background-color: var(--color-prime-green);
}

.nav__item--page {
  background-color: var(--color-prime-light-grey);
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

.blurrable {
  transition: filter 1s;
}

.blurred {
  filter: blur(64px);
}
</style>
