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
      <div :class="{ blurrable: true, blurred: filtersOpen }">
        <section class="section content">
          <ArchiveHeader class="archive__header" :node="node">
            <template #meta>
              <span>{{ node ? $t(`home.${node}`) : $t('archive.title') }}</span>
              <span v-if="totalResults"> ({{ totalResults }})</span>
            </template>
            <DatePicker
              v-if="datePicker"
              :exhibition-nav="node === 'ausstellung'"
              :dates="datePicker.dates"
              :default-option="datePicker.default"
              :reset="datePicker.reset"
              class="archive__date-picker-desktop"
            />
          </ArchiveHeader>
          <div v-if="loading && this.items.length === 0" class="archive__loading">
            <Loader v-if="loading" />
          </div>
          <div v-else class="archive__results">
            <TagsCloud
              class="archive__tags-cloud"
              v-if="cloudTags"
              :tags="cloudTags"
              deselectable
              @click="deselectTag"
            />
            <DatePicker
              v-if="datePicker"
              :exhibition-nav="node === 'ausstellung'"
              :dates="datePicker.dates"
              :default-option="datePicker.default"
              :reset="datePicker.reset"
              class="archive__date-picker-mobile"
              :centered="false"
            />
            <ItemsList
              ref="items"
              class="archive__items"
              :items="items"
              :about-page="aboutConfig && aboutConfig.aboutPage"
              :about-page-text="$t(aboutConfig && aboutConfig.aboutPageText)"
              :from="node"
            />
            <div v-if="!loading || this.items.length >= 0" class="archive__controls">
              <button
                class="blob blob--green blob--shadow archive__filters-link"
                :aria-label="$t('archive.filter')"
                @click="filtersOpen = true"
              >
                <FilterIcon class="archive__filters-icon" />
                <span class="archive__filters-text">{{ $t('archive.filter') }}</span>
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
            <span v-else>{{ $t('archive.loadMore') }}</span>
          </button>
        </section>
      </div>
    </main>
    <SiteFooter :class="{ blurrable: true, blurred: filtersOpen }" />
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';

import { searchItems, getTagsForItemTags } from '@/api';
import { getTagsFromRoute, routesEqual } from '@/utils';
import { getAboutConfig, datePickerConfig } from '@/archive-config';
import { getCurrentLocale } from '@/locale';
import ArchiveHeader from '@/components/archive-header';
import ArchiveTags from '@/components/archive-tags';
import DatePicker from '@/components/date-picker';
import ItemsList from '@/components/items-list';
import SearchForm from '@/components/search-form';
import SiteFooter from '@/components/site-footer';
import Loader from '@/components/icons/loader';
import Filter from '@/components/icons/filter';
import TagsCloud from '@/components/tags-cloud';

export default {
  name: 'Archive',
  components: {
    ArchiveHeader,
    ArchiveTags,
    ItemsList,
    SearchForm,
    SiteFooter,
    Loader,
    FilterIcon: Filter,
    DatePicker,
    TagsCloud,
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
    async $route() {
      await this.loadResultsIfNeeded();
    },
    filtersOpen(value) {
      document.body.classList.toggle('noscroll', value);
    },
  },
  data: () => ({
    availableTags: null,
    items: [],
    loading: false,
    filtersOpen: false,
    totalResults: 0,
  }),
  async created() {
    await this.loadResultsIfNeeded();
  },
  mounted() {
    const title = this.node ? `home.${this.node}` : 'archive.title';
    document.title = `${this.$t(title)} - Calculating Control`;
  },
  computed: {
    ...mapState(['archiveItems', 'lastArchiveSearch']),
    thereIsMore() {
      return this.totalResults > this.items.length;
    },
    aboutConfig() {
      return getAboutConfig(this.node || 'archive', getTagsFromRoute(this.$route));
    },
    datePicker() {
      return datePickerConfig[this.node];
    },
    english() {
      return getCurrentLocale() === 'en';
    },
    cloudTags() {
      return this.searchTags.filter((tag) => tag !== this.node);
    },
  },
  methods: {
    ...mapMutations(['setArchiveItems', 'setLastArchiveSearch']),
    async loadResultsIfNeeded() {
      if (this.lastArchiveSearch && routesEqual(this.$route, this.lastArchiveSearch)) {
        this.items = this.archiveItems;
        this.totalResults = this.lastArchiveSearch.totalResults;
        this.fetchAvailableTags();
        return;
      }
      await this.fetchData(true);
    },
    async fetchData(wipe = false) {
      this.loading = true;
      if (wipe) this.items = [];

      const { q } = this.$route.query;
      const selectedTags = getTagsFromRoute(this.$route);

      if (this.node === 'ausstellung' && !selectedTags.some((tag) => tag.startsWith('date_'))) {
        selectedTags.push(this.datePicker.default);
      }
      const { items: newItems, totalResults } = await searchItems({
        tags: selectedTags.concat(this.node ? [this.node] : []),
        start: this.items.length,
        q,
        sort: this.node ? 'date' : 'title',
        direction: this.node ? 'asc' : 'desc',
      });

      this.items.push(...newItems);
      this.totalResults = parseInt(totalResults, 10);
      this.setArchiveItems(this.items);
      this.setLastArchiveSearch({ ...this.$route, totalResults: this.totalResults });
      this.fetchAvailableTags();
      this.loading = false;
    },
    async fetchAvailableTags() {
      const { q } = this.$route.query;
      const selectedTags = getTagsFromRoute(this.$route);
      if ((selectedTags && selectedTags.length) || q) {
        this.availableTags = await getTagsForItemTags({ q, tags: selectedTags });
      } else {
        this.availableTags = null;
      }
    },
    deselectTag(tag) {
      const tags = getTagsFromRoute(this.$route);
      this.$router.push({
        query: {
          q: this.$route.query.q,
          tags: tags.filter((t) => t !== tag),
        },
      });
    },
  },
};
</script>

<style scoped>
.archive__main {
  min-height: calc(100vh - 290px);
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
  padding: 0 15px;
  justify-content: flex-end;
  right: 0;
  z-index: 3;
}

.archive__filters-link,
.archive__filters-search {
  align-items: center;
  font-family: inherit;
  justify-content: center;
  margin: 15px 0;
  height: 60px;
  min-height: 60px;
  width: 60px;
}

.archive__filters-link {
  appearance: none;
  color: inherit;
  cursor: pointer;
  display: inline-flex;
  margin-right: 5px;
  padding: 0;
  text-decoration: inherit;
}

.archive__filters-text {
  display: none;
}

.visit__notice {
  background: var(--color-prime-green);
  border: solid 1px black;
  font-size: var(--font-size-xs);
  text-align: center;
  padding: 15px 0;
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
    padding: 7px 35px;
    margin-right: 0;
  }

  .archive__filters-text {
    display: initial;
  }

  .archive__filters-icon {
    display: none;
  }
}

.archive__load-more {
  color: inherit;
  cursor: pointer;
  font-family: inherit;
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
  height: 100vh;
  width: 100%;
  justify-content: center;
  align-items: center;
}

.archive__date-picker-desktop {
  display: none;
  width: 100%;
}

.archive__date-picker-mobile {
  width: 100%;
  overflow-x: auto;
  border-bottom: solid 2px black;
  padding: 5px;
}

@media screen and (min-width: 1550px) {
  .archive__date-picker-desktop {
    display: block;
  }

  .archive__date-picker-mobile {
    display: none;
  }
}

.archive__tags-cloud {
  display: none;
}

@media screen and (min-width: 768px) {
  .archive__tags-cloud {
    display: block;
    position: sticky;
    top: 80px;
    z-index: 5;
  }
}
</style>
