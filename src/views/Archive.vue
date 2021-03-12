<template>
  <div class="archive">
    <main class="archive__main">
      <section v-show="filtersOpen" class="archive__filters">
        <ArchiveTags
          :available-tags="this.availableTags"
          :total-results="totalResults"
          :loading="loading"
          @close="filtersOpen = false"
        />
      </section>
      <div :class="{ blurrable: true, 'blurred': filtersOpen }">
        <section class="section content">
          <div v-if="loading && this.items.length === 0" class="archive__loading">
            <Loader v-if="loading" />
          </div>
          <div v-else class="archive__results">
            <ArchiveHeader class="archive__header" :node="node" :totalResults="totalResults" />
            <ItemsList
              ref="items"
              :items="items"
              about-page="ArchiveAbout"
              about-page-text="About the archive"
            />
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
            <Loader v-if="loading" />
            <span v-else>load more entries</span>
          </button>
        </section>
      </div>
    </main>
    <SiteFooter :class="{ blurrable: true, 'blurred': filtersOpen }" />
  </div>
</template>

<script>
import { searchItems, getTagsForItemTags } from '@/api';
import ArchiveHeader from '@/components/archive-header';
import ArchiveTags from '@/components/archive-tags';
import ItemsList from '@/components/items-list';
import SearchForm from '@/components/search-form';
import SiteFooter from '@/components/site-footer';
import Loader from '@/components/icons/loader';

export default {
  name: 'Archive',
  components: {
    ArchiveHeader,
    ArchiveTags,
    ItemsList,
    SearchForm,
    SiteFooter,
    Loader,
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
    availableTags: null,
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

      if (selectedTags && selectedTags.length) {
        this.availableTags = await getTagsForItemTags({ q, tags: selectedTags });
      } else {
        this.availableTags = null;
      }
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
  align-items: center;
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

.archive__loading {
  display: flex;
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: center;
}
</style>
