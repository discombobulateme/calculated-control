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
          <div v-else>
            <header class="archive__header">
              <ArchiveAbout :primary="isPrimaryNode" />
              <div class="archive__meta">{{ totalResults }} results</div>
              <nav class="archive__home">
                <HomeButton class="archive__home-link" aria-label="Home" />
              </nav>
            </header>
            <ItemsList ref="items" :items="items" />
            <button v-if="thereIsMore" class="blob archive__load-more" :disabled="loading" @click="fetchData()">
              <span v-if="loading">loading...</span>
              <span v-else>load more entries</span>
            </button>
          </div>
        </section>
        <div v-if="!loading && this.items.length >= 0" class="archive__controls">
          <SearchForm class="archive__filters-search" />
          <button
            class="blob blob--green blob--shadow archive__filters-link"
            aria-label="filter by tags"
            @click="filtersOpen = true"
          >
            <svg width="43" height="46" viewBox="0 0 43 46" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M18.5 23.2158L2.5 2.5H40.5L24.5 23.2158V40.0474L18.5 43.5V23.2158Z" stroke="#6D5D38" stroke-width="4" stroke-linejoin="bevel"/>
            </svg>
          </button>
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
import HomeButton from '@/components/home-button';
import ItemsList from '@/components/items-list';
import SearchForm from '@/components/search-form';
import SiteFooter from '@/components/site-footer';

export default {
  name: 'Archive',
  components: {
    ArchiveAbout,
    ArchiveTags,
    HomeButton,
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
.archive__main {
  min-height: calc(100vh - 390px);
}

.archive__controls {
  position: fixed;
  top: 60%;
  left: calc(100% / 3);
  z-index: 3;
}

.archive__home {
  position: absolute;
  right: 35px;
  top: calc(100% + 30px);
}

.archive__filters-link,
.archive__home-link {
  appearance: none;
  color: inherit;
  cursor: pointer;
  display: flex;
  text-decoration: inherit;
  width: max-content;
}

.archive__filters-link {
  height: 60px;
  left: calc(100vw / 6 / 2);
  padding: 7px 35px;
  position: absolute;
  top: 15vh;
  transform: translateY(-50%) translateX(-50%);
}

.archive__filters-search {
  left: calc(100vw / 6 / 2 + 70px);
  top: 15vh;
  height: 60px;
  position: absolute;
  transform: translateY(-50%);
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

.archive__meta {
  background: var(--color-prime-light-grey);
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
