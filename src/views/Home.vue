<template>
  <main>
    <h1>calculated:control</h1>
    <router-link :to="{ name: 'Archive', query: { tags: ['exhibitions'] } }">#exhibitions</router-link>
  </main>
</template>

<script>
export default {
  name: 'Home',
};
</script>
