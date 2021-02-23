<template>
  <main class="main">
    <section v-show="filtersOpen" class="section filters">
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
    <div class="archive__filters">
      <button
        class="archive__filters-link nav__item nav__item--highlight"
        @click="filtersOpen = true"
      >
        add category
      </button>
    </div>
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
    filtersOpen: false,
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
.archive__filters {
  position: fixed;
  top: 60%;
  left: calc(100% / 3);
}

.archive__filters-link {
  appearance: none;
  border: none;
  color: inherit;
  cursor: pointer;
  position: absolute;
  top: 15vh;
  left: calc(100vw / 6 / 2);
  transform: translateY(-50%) translateX(-50%);
  text-decoration: inherit;
  padding: 7px 35px;
  width: max-content;
}

.filters {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
}
</style>
