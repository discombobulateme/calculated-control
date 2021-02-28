<template>
  <router-link
    :to="{ name: 'Home' }"
    class="blob blob--pink blob--shadow home-button"
    aria-label="Home"
  >
    <svg width="108" height="70" viewBox="0 0 108 70" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <g fill="rgba(255,255,255,0.5)">
        <rect width="108" height="14"/>
        <rect y="28" width="108" height="14"/>
        <rect y="56" width="108" height="14"/>
      </g>
    </svg>
  </router-link>
</template>

<style scoped>
.home-button {
  display: flex;
  padding: 30px 35px;
}
</style>
