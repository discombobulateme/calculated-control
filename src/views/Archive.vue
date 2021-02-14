<template>
  <main class="main">
    <section class="section navigation">
      <router-link :to="{ name: 'Home' }">&lt; Home</router-link>
      <h1 class="page-title">calculated:control - Archiv</h1>
      <SearchForm :tags="tags" :query="query"/>
    </section>
    <section class="section content">
      <div v-if="loading">
        Loading...
      </div>
      <div v-else>
        <ItemsList ref="items" :items="items" />
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
    this.fetchTags();
  },
  methods: {
    async fetchData() {
      this.loading = true;
      const { tags, q } = this.$route.query;
      this.items = await searchItems({
        tags: typeof tags === 'string' ? [tags] : tags,
        q
      });
      this.loading = false;
    },
    async fetchTags() {
      this.tags = await getTagsForItemTags({ tags: this.searchTags, q: this.query });
    },
  },
};
</script>

<style scoped>
.main {
  display: grid;
  gap: 10px;
}

@media screen and (min-width: 1024px) {
  .main {
    grid-template-columns: 1fr 2fr;
  }
}

.section {
  border: solid 3px black;
  padding: 10px;
}

.page-title {
  margin-top: 10px;
}
</style>
