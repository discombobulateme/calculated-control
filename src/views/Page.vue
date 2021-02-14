<template>
  <main class="page">
    <router-link :to="{ name: 'Home' }">&lt; Home</router-link>
    <div v-if="loading">
      Loading...
    </div>
    <section v-else v-html="content" />
  </main>
</template>

<script>
import { getItem } from '@/api';

export default {
  name: 'Page',
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  data: () => ({
    loading: false,
    content: '',
  }),
  created() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      this.loading = true;
      const { data: { note } } = await getItem({ key: this.id });
      this.content = note;
      this.loading = false;
    },
  },
};
</script>

<style scoped>
.page {
  max-width: 768px;
  margin: 20px auto;
}
</style>
