<template>
  <main class="main">
    <section class="section navigation">
      <h1 class="page-title">calculated:control - Archiv</h1>
      <SearchForm :tags="tags" :query="query" />
    </section>
    <section class="section content">
      <div v-if="loading">
        Loading...
      </div>
      <div v-else>
        <ItemsList :items="items" />
      </div>
    </section>
  </main>
</template>

<script>
import { getTags, searchItems } from '@/api';
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
  async created() {
    this.fetchData();
    const tagResponse = await getTags();
    this.tags = tagResponse.map(({ tag }) => tag);
  },
  methods: {
    async fetchData() {
      this.loading = true;
      const { tags, q } = this.$route.query;
      const data = await searchItems({
        tags: typeof tags === 'string' ? [tags] : tags,
        q
      });

      this.items = data.map(({ data }) => data);
      this.loading = false;
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
  margin-top: 0;
}
</style>
