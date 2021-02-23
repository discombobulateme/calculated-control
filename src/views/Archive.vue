<template>
  <main class="main">
    <section v-show="false" class="section navigation">
      <router-link :to="{ name: 'Home' }">&lt; Home</router-link>
      <h1 class="page-title">calculated:control - Archiv</h1>
      <SearchForm :tags="tags" :query="query"/>
    </section>
    <section class="section content">
      <div v-if="loading && this.items.length === 0">
        Loading...
      </div>
      <div v-else>
        <ItemsList ref="items" :items="items" @infinite-scroll="fetchData" />
      </div>
    </section>
  </main>
</template>

<script>
import { getTagsForItemTags, searchItems } from '@/api';
import ItemsList from '@/components/items-list';
import SearchForm from '@/components/search-form';

export default {
  name: 'Archive',
  components: {
    ItemsList,
    SearchForm,
  },
  props: {
    query: {
      type: String,
      default: '',
    },
    searchTags: {
      type: Array,
      default: () => [],
    },
  },
  watch: {
    $route() {
      this.fetchData();
    },
  },
  data: () => ({
    tags: [],
    items: [],
    loading: true,
  }),
  created() {
    this.fetchData();
    // this.fetchTags();
  },
  methods: {
    async fetchData() {
      this.loading = true;
      const { tags, q } = this.$route.query;
      const newItems = await searchItems({
        tags: typeof tags === 'string' ? [tags] : tags,
        start: this.items.length,
        q,
      });
      this.items.push(...newItems);
      this.loading = false;
    },
    async fetchTags() {
      this.tags = await getTagsForItemTags({ tags: this.searchTags, q: this.query });
    },
  },
};
</script>

<style scoped>

</style>
