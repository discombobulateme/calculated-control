<template>
  <main>
    <SiteNav />
  </main>
</template>

<script>
import SiteNav from '@/components/site-nav';

export default {
  name: 'Home',
  components: {
    SiteNav,
  },
  mounted() {
    document.title = 'Calculating Control';
  },
};
</script>
