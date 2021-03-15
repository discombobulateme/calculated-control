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
          <ArchiveHeader class="archive__header" :node="node">
            <template #meta>
              <span>{{ node ? $t(`home.${node}`) : $t('archive.title') }}</span>
              <span v-if="totalResults"> ({{ totalResults }})</span>
            </template>
            <DatePicker v-if="datePicker" :dates="datePicker" class="archive__date-picker-desktop" />
          </ArchiveHeader>
          <div v-if="loading && this.items.length === 0" class="archive__loading">
            <Loader v-if="loading" />
          </div>
          <div v-else class="archive__results">
            <TagsCloud class="archive__tags-cloud" v-if="searchTags" :tags="searchTags" deselectable @click="deselectTag" />
            <DatePicker v-if="datePicker" :dates="datePicker" class="archive__date-picker-mobile" :centered="false"/>
            <ItemsList
              ref="items"
              :items="items"
              :about-page="aboutConfig.aboutPage"
              :about-page-text="$t(aboutConfig.aboutPageText)"
            />
            <div v-if="!loading || this.items.length >= 0" class="archive__controls">
              <button
                class="blob blob--green blob--shadow archive__filters-link"
                aria-label="filter by tags"
                @click="filtersOpen = true"
              >
                {{ $t('archive.filter') }}
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
    <SiteFooter :class="{ blurrable: true, 'blurred': filtersOpen }" />
  </div>
</template>

<script>
import { searchItems, getTagsForItemTags } from '@/api';
import { getTagsFromRoute } from '@/utils';
import ArchiveHeader from '@/components/archive-header';
import ArchiveTags from '@/components/archive-tags';
import DatePicker from '@/components/date-picker';
import ItemsList from '@/components/items-list';
import SearchForm from '@/components/search-form';
import SiteFooter from '@/components/site-footer';
import Loader from '@/components/icons/loader';
import TagsCloud from '@/components/tags-cloud';

const getAboutConfig = (node) => {
  switch (node) {
    case 'ausstellung':
      return {
        aboutPage: 'ExhibitionAbout',
        aboutPageText: 'ausstellung.about',
      };
    case 'journal':
      return {
        aboutPage: 'JournalAbout',
        aboutPageText: 'journal.about',
      };
    case 'symposium':
      return {
        aboutPage: 'SymposiumAbout',
        aboutPageText: 'symposium.about',
      };
    case 'unconference':
      return {
        aboutPage: 'UnconferenceAbout',
        aboutPageText: 'unconference.about',
      };
    default:
      return {
        aboutPage: 'ArchiveAbout',
        aboutPageText: 'archive.about',
      };
  }
};

const datePickerConfig = {
  symposium: [
    {
      humanReadable: '21/05/2021',
      tag: 'date_21_05_2021',
    },
    {
      humanReadable: '22/05/2021',
      tag: 'date_22_05_2021',
    },
    {
      humanReadable: '23/05/2021',
      tag: 'date_23_05_2021',
    },
  ],
  ausstellung: [
    {
      humanReadable: 'Haus der Statistik 20/04–09/05/2021',
      tag: 'date_20_04_2021',
    },
    {
      humanReadable: 'Panke Gallery 09/2021',
      tag: 'date_09_2021',
    },
  ],
  unconference: [
    {
      humanReadable: '21/05/2021',
      tag: 'date_21_05_2021',
    },
    {
      humanReadable: '22/05/2021',
      tag: 'date_22_05_2021',
    },
    {
      humanReadable: '23/05/2021',
      tag: 'date_23_05_2021',
    },
  ],
}

export default {
  name: 'Archive',
  components: {
    ArchiveHeader,
    ArchiveTags,
    ItemsList,
    SearchForm,
    SiteFooter,
    Loader,
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
    aboutConfig() {
      return getAboutConfig(this.node);
    },
    datePicker() {
      return datePickerConfig[this.node];
    }
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
          tags: tags.filter(t => t !== tag),
        },
      });
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
  height: 40px;
  min-height: 40px;
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
    height: 60px;
    min-height: 60px;
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

.archive__date-picker-desktop {
  width: 100%;
}

.archive__date-picker-mobile {
  width: 100%;
  overflow-x: auto;
  padding: 5px;
}

@media screen and (min-width: 1200px) {
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
