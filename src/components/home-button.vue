<template>
  <router-link
    :to="{ name: 'Home' }"
    class="blob blob--shadow home-button"
    aria-label="Home"
  >
    <svg width="41" height="35" viewBox="0 0 41 35" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <g fill="currentColor">
        <rect width="41" height="4"/>
        <rect y="15" width="41" height="4"/>
        <rect y="30" width="41" height="4"/>
      </g>
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
