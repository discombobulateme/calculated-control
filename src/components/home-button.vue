<template>
  <router-link
    :to="{ name: 'Home' }"
    class="blob blob--shadow home-button"
    aria-label="Home"
  >
    <svg width="41" height="28" viewBox="0 0 41 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <line y1="2" x2="41" y2="2" stroke="#6D5D38" stroke-width="4"/>
      <line y1="14" x2="41" y2="14" stroke="#6D5D38" stroke-width="4"/>
      <line y1="26" x2="41" y2="26" stroke="#6D5D38" stroke-width="4"/>
    </svg>
  </router-link>
</template>

<style scoped>
.home-button {
  color: var(--color-prime-olive);
  display: flex;
  padding: 15px 30px;
}
</style>
