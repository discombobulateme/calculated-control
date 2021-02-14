<template>
  <main>
    <h1>calculated:control</h1>
    <nav>
      <ul class="nav__list">
        <li>
          <router-link class="nav__link" :to="{ name: 'About' }">About</router-link>
        </li>
        <li>
          <router-link class="nav__link" :to="{ name: 'Team' }">Team</router-link>
        </li>
        <li>
          <router-link class="nav__link" :to="{ name: 'Archive' }">Archiv</router-link>
        </li>
        <li>
          <router-link class="nav__link" :to="{ name: 'Archive', query: { tags: ['Ausstellung'] } }">#Ausstellung</router-link>
        </li>
      </ul>
    </nav>
  </main>
</template>

<script>
export default {
  name: 'Home',
};
</script>

<style scoped>
.nav__list {
  list-style-type: none;
  padding: 0;
  background: 0;
}

.nav__link {
  color: inherit;
  display: block;
  font-size: 2rem;
  padding: 5px;
  margin: 2px;
  text-decoration: inherit;
}
</style>
