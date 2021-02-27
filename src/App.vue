<template>
  <div id="app">
    <SiteNav />
    <router-view/>
  </div>
</template>

<script>
import SiteNav from '@/components/site-nav';

export default {
  name: 'CalculatedControl',
  components: {
    SiteNav,
  },
};
</script>

<style>
@font-face {
  font-family: "Maxima-Lig";
  src: url('assets/font/font.woff2') format('woff2'), url('assets/font/font.woff') format('woff');
}

:root {
  --color-prime-green: rgb(156, 250, 111);
  --color-prime-pink: rgb(220, 182, 189);
  --color-prime-olive: rgb(109, 93, 56);
  --color-prime-light-grey: rgb(225, 225, 225);

  --font-size-small: 24px;
  --font-size-medium: 2vw;
  --font-size-large: 39px;
  --font-size-xl: 5vw;

  --border-radius: 30px;
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

.blurrable {
  transition: filter 1s;
}

.blurred {
  filter: blur(64px);
}

.blob {
  background: var(--color-prime-light-grey);
  border: none;
  border-radius: var(--border-radius);
  color: var(--color-prime-olive);
  font-size: var(--font-size-large);
  text-align: center;
}

.blob--shadow {
  filter: drop-shadow(2px 2px 12px rgba(0, 0, 0, 0.25));
}

.blob--green {
  background-color: var(--color-prime-green);
}

.blob--pink {
  background-color: var(--color-prime-pink);
}
</style>
