<template>
  <div class="archive">
    <main class="archive__main">
      <section v-show="filtersOpen" class="archive__filters">
        <ArchiveTags :total-results="totalResults" @close="filtersOpen = false"/>
      </section>
      <div :class="{ blurrable: true, 'blurred': filtersOpen }">
        <section class="section content">
          <div v-if="loading && this.items.length === 0">
            Loading...
          </div>
          <div v-else class="archive__results">
            <ArchiveHeader class="archive__header" :node="node" :totalResults="totalResults" />
            <ItemsList ref="items" :items="items" />
            <div v-if="!loading || this.items.length >= 0" class="archive__controls">
              <button
                class="blob blob--green blob--shadow archive__filters-link"
                aria-label="filter by tags"
                @click="filtersOpen = true"
              >
                filter by tag
              </button>
              <SearchForm class="archive__filters-search" />
            </div>
          </div>
          <button
            v-if="thereIsMore && (!loading || this.items.length !== 0)"
            class="blob archive__load-more"
            :disabled="loading"
            @click="fetchData()"
          >
            <span v-if="loading">loading...</span>
            <span v-else>load more entries</span>
          </button>
        </section>
      </div>
    </main>
    <SiteFooter />
  </div>
</template>

<script>
import { searchItems } from '@/api';
import ArchiveHeader from '@/components/archive-header';
import ArchiveTags from '@/components/archive-tags';
import ItemsList from '@/components/items-list';
import SearchForm from '@/components/search-form';
import SiteFooter from '@/components/site-footer';

export default {
  name: 'Archive',
  components: {
    ArchiveHeader,
    ArchiveTags,
    ItemsList,
    SearchForm,
    SiteFooter,
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
    node: {
      type: String,
      default: '',
    },
  },
  watch: {
    $route() {
      this.fetchData(true);
    },
  },
  data: () => ({
    tags: [],
    items: [],
    loading: true,
    filtersOpen: false,
    totalResults: 0,
  }),
  created() {
    this.fetchData();
  },
  computed: {
    thereIsMore() {
      return this.totalResults > this.items.length;
    },
  },
  methods: {
    async fetchData(wipe = false) {
      this.loading = true;
      if (wipe) this.items = [];

      const { tags, q } = this.$route.query;
      const selectedTags = typeof tags !== 'object' ? [tags].filter(tag => !!tag) : tags;
      const { items: newItems, totalResults } = await searchItems({
        tags: selectedTags.concat(this.node ? [this.node] : []),
        start: this.items.length,
        q,
      });

      this.items.push(...newItems);
      this.totalResults = parseInt(totalResults, 10);
      this.loading = false;
    },
  },
};
</script>

<style scoped>
.archive__main {
  min-height: calc(100vh - 390px);
}

.archive__results {
  position: relative;
}

.archive__controls {
  align-items: flex-end;
  bottom: 0;
  display: flex;
  height: 0;
  position: sticky;
  flex-direction: column;
  padding: 0 15px;
  justify-content: flex-end;
  right: 0;
  z-index: 3;
}

.archive__filters-link,
.archive__filters-search {
  justify-content: center;
  margin: 15px 0;
  height: 60px;
  width: 100%;
}

.archive__filters-link {
  appearance: none;
  color: inherit;
  cursor: pointer;
  display: inline-flex;
  margin-bottom: 0;
  padding: 7px 35px;
  text-decoration: inherit;
}

@media screen and (min-width: 768px) {
  .archive__controls {
    flex-direction: row;
    padding: 0;
  }

  .archive__filters-link,
  .archive__filters-search {
    margin: 15px;
    width: max-content;
  }

  .archive__filters-link {
    margin-right: 0;
  }
}

.archive__load-more {
  color: inherit;
  cursor: pointer;
  padding: 2em 0;
  width: 100%;
}

.archive__header {
  position: sticky;
  top: 0;
  z-index: 4;
  border-bottom: solid 2px black;
}

.archive__filters {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 5;
}
</style>
