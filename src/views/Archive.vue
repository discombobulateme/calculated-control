<template>
  <div>
    <main class="main">
      <section v-show="filtersOpen" class="archive__filters">
        <ArchiveTags :total-results="totalResults" @close="filtersOpen = false"/>
      </section>
      <div :class="{ blurrable: true, 'blurred': filtersOpen }">
        <section class="section content">
          <div v-if="loading && this.items.length === 0">
            Loading...
          </div>
          <div v-else>
            <header class="archive__header">
              <ArchiveAbout :primary="isPrimaryNode" />
              <div class="archive__meta">{{ totalResults }} results</div>
            </header>
            <ItemsList ref="items" :items="items" />
            <button v-if="thereIsMore" class="blob archive__load-more" :disabled="loading" @click="fetchData()">
              <span v-if="loading">loading...</span>
              <span v-else>load more entries</span>
            </button>
          </div>
        </section>
        <div class="archive__filters-switch">
          <SearchForm class="archive__filters-search" />
          <button
            class="blob blob--green blob--shadow archive__filters-link"
            @click="filtersOpen = true"
          >
            add category
          </button>
        </div>
        <div class="archive__home">
          <router-link
            :to="{ name: 'Home' }"
            class="blob blob--pink blob--shadow archive__home-link"
          >
            home
          </router-link>
        </div>
      </div>
    </main>
    <SiteFooter />
  </div>
</template>

<script>
import { searchItems } from '@/api';
import { primaryTags } from '@/tags';
import ArchiveAbout from '@/components/archive-about';
import ArchiveTags from '@/components/archive-tags';
import ItemsList from '@/components/items-list';
import SearchForm from '@/components/search-form';
import SiteFooter from '@/components/site-footer';

export default {
  name: 'Archive',
  components: {
    ArchiveAbout,
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
    isPrimaryNode() {
      return primaryTags.includes(this.node);
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
.archive__filters-switch,
.archive__home {
  position: fixed;
  top: 60%;
  left: calc(100% / 3);
  z-index: 3;
}

.archive__home {
  top: 50%;
  left: 50%;
}

.archive__filters-link,
.archive__home-link {
  appearance: none;
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

.archive__filters-search {
  right: 40px;
  top: 15vh;
  position: absolute;
  transform: translateY(-50%);
}

.archive__home-link {
  top: 0;
  left: 0;
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
}

.archive__meta {
  background: black;
  color: white;
  font-size: var(--font-size-small);
  padding: 10px 15px;
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
