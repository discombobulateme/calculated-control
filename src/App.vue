<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'CalculatingControl',
};
</script>

<style>
@font-face {
  font-family: "Maxima-Lig";
  src: url('assets/font/font.woff2') format('woff2'), url('assets/font/font.woff') format('woff');
}

:root {
  --color-prime-green: #92FF5F;
  --color-prime-green-hover: #A4FF79;
  --color-prime-pink: rgb(220, 182, 189);
  --color-prime-pink-hover: #F0D2D8;
  --color-prime-rose-darker: #B57380;
  --color-prime-olive: rgb(109, 93, 56);
  --color-prime-olive-half: rgb(109, 93, 56, 0.5);
  --color-prime-light-grey: rgb(225, 225, 225);
  --color-prime-light-grey-hover: rgb(233,233,233);

  --font-size-xs: 20px;
  --font-size-small: 24px;
  --font-size-medium-small: 30px;
  --font-size-medium: 2vw;
  --font-size-large: 30px;
  --font-size-xl: 42px;
  --font-size-xxl: 52px;

  --border-radius: 30px;
  --transition-time: 400ms;
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
  grid-template-columns: repeat(3, 1fr) 1.5fr 0.5fr 0.5fr;
  grid-template-rows: repeat(6, 1fr);
}

.blurrable {
  transition: filter 1s;
}

.blurred.blurred {
  filter: blur(64px);
}

.blob {
  background: var(--color-prime-light-grey);
  border: none;
  border-radius: var(--border-radius);
  color: var(--color-prime-olive);
  font-size: var(--font-size-xs);
  text-align: center;
  overflow: hidden;
  transition: background-color var(--transition-time), filter var(--transition-time);
}

@media screen and (min-width: 768px) {
  .blob {
    font-size: var(--font-size-large);
  }
}

.blob:hover {
  background: var(--color-prime-light-grey-hover);
  filter: drop-shadow(2px 2px 12px rgba(0, 0, 0, 0.25));
}

.blob--shadow {
  filter: drop-shadow(2px 2px 12px rgba(0, 0, 0, 0.25));
}

.blob--shadow:hover {
  filter: drop-shadow(2px 2px 25px rgba(0, 0, 0, 0.3));
}

.blob--green {
  background-color: var(--color-prime-green);
}

.blob--green:hover {
  background-color: var(--color-prime-green-hover);
}

.blob--pink {
  background-color: var(--color-prime-pink);
}

.blob--pink:hover {
  background-color: var(--color-prime-pink-hover);
}

.link,
.link:visited,
.note a,
.note a:visited {
  color: var(--color-prime-rose-darker);
  text-decoration: none;
}

.link:hover,
.note a:hover {
  text-decoration: underline;
}

.hash {
  font-family: Helvetica, Arial, sans-serif;
}
</style>
