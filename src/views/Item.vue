<template>
  <div class="item">
    <ArchiveHeader class="item__header">
      <template #meta>
        <div class="item__meta">{{ $t('archive.title') }}: {{ $t('item.entry') }} #{{ id }}</div>
      </template>
    </ArchiveHeader>
    <div class="item__loading" v-if="loading">
      <Loader />
    </div>
    <main v-else-if="item" class="main">
      <a
        class="blob blob--shadow archive-button"
        :class="{
          blurrable: true,
          blurred: showArchiveConnections,
          'blob--green': !from,
          'blob--pink': from,
        }"
        @click.prevent="onBack"
      >
        <ArrowLeft />
        <template v-if="fromRelated">
          {{ $t('item.back') }}
        </template>
        <template v-else>
          {{ from ? $t(`home.${from}`) : $t('item.back') }}
        </template>
      </a>
      <template v-if="isExhibition">
        <CuratedItem
          :item="item"
          :image="image"
          :youtubeEmbed="youtubeEmbed"
          :first-link-text="$t('event.enterOnlineExhibition')"
          :second-link-text="$t('event.booking')"
          :class="{ blurrable: true, blurred: showArchiveConnections }"
        />
      </template>
      <template v-else-if="isSymposium">
        <CuratedItem
          :item="item"
          :image="image"
          :youtubeEmbed="youtubeEmbed"
          :first-link-text="$t('event.watchOnYoutube')"
          :class="{ blurrable: true, blurred: showArchiveConnections }"
        />
      </template>
      <template v-else-if="isUnconference">
        <CuratedItem
          :item="item"
          :image="image"
          :youtubeEmbed="youtubeEmbed"
          :first-link-text="$t('event.register')"
          :class="{ blurrable: true, blurred: showArchiveConnections }"
        />
      </template>
      <template v-else-if="isJournal">
        <CuratedItem
          :item="item"
          :image="image"
          :first-link-text="$t('journal.readFull')"
          :class="{ blurrable: true, blurred: showArchiveConnections }"
        />
      </template>
      <template v-else>
        <ItemGenericLeft
          :item="item"
          :youtube-embed="youtubeEmbed"
          :image="image"
          :class="{ blurrable: true, blurred: showArchiveConnections }"
        />
        <ItemGenericRight
          :item="item"
          :class="{ blurrable: true, blurred: showArchiveConnections }"
          :note="isPerson"
          :image="image"
          :title-author-type="titleAuthorTypeRight"
        />
      </template>
    </main>
    <div v-else>Not Found</div>
    <div v-if="item" v-show="showArchiveConnections" class="archive-connections" ref="connections">
      <div v-if="relations" class="relations">
        <ul class="relations__list">
          <li v-for="relation in relations" :key="relation.key" class="relations__item">
            <ItemPreview :item="relation" from-related />
          </li>
        </ul>
      </div>
      <TagsCloud class="item__tags-cloud" v-if="item.tags" :tags="itemTags" @click="selectTag" />
    </div>
    <button v-if="item" class="blob blob--green archive-connections__show" @click="toggleArchiveConnections">
      {{ showArchiveConnections ? $t('item.hideRelatedEntries') : $t('item.showRelatedEntries') }}
    </button>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

import { getItem, getRelatedItems } from '@/api';
import ArchiveHeader from '@/components/archive-header';
import CuratedItem from '@/components/item/curated-item';
import ItemGenericLeft from '@/components/item/generic-left';
import ItemGenericRight from '@/components/item/generic-right';
import ItemPreview from '@/components/item-preview';
import TagsCloud from '@/components/tags-cloud';
import Loader from '@/components/icons/loader';
import ArrowLeft from '@/components/icons/arrow-left';

const YOUTUBE_EMBED_URL = 'https://www.youtube.com/embed/?modestbranding=1';

export default {
  name: 'Item',
  components: {
    ArrowLeft,
    ArchiveHeader,
    CuratedItem,
    ItemGenericLeft,
    ItemGenericRight,
    ItemPreview,
    TagsCloud,
    Loader,
  },
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  watch: {
    $route() {
      this.fetchData();
    },
  },
  data: () => ({
    loading: false,
    item: null,
    showArchiveConnections: false,
    relations: null,
  }),
  created() {
    this.fetchData();
  },
  computed: {
    ...mapState(['lastItem']),
    from() {
      return this.$route.query.from;
    },
    fromRelated() {
      return this.$route.query.fromRelated;
    },
    isJournal() {
      return this.itemTags.some((tag) => tag.toLowerCase() === 'journal');
    },
    isExhibition() {
      return this.itemTags.some((tag) => tag.toLowerCase() === 'ausstellung');
    },
    isUnconference() {
      return this.itemTags.some((tag) => tag.toLowerCase() === 'unconference');
    },
    isSymposium() {
      return this.itemTags.some((tag) => tag.toLowerCase() === 'symposium');
    },
    titleAuthorTypeRight() {
      return Boolean(this.image || this.youtubeEmbed || this.item.itemType === 'note' || this.item.abstractNote);
    },
    itemTags() {
      return this.item.tags.map(({ tag }) => tag).filter((tag) => !tag.startsWith('id_') && !tag.startsWith('date_'));
    },
    youtubeEmbed() {
      if (!this.item || !this.item.url) return;

      const watchUrl = new URL(this.item.url);
      if (!watchUrl.hostname.includes('youtube.com')) return;

      const embedUrl = new URL(YOUTUBE_EMBED_URL);
      embedUrl.pathname = embedUrl.pathname + watchUrl.searchParams.get('v');

      return embedUrl.toString();
    },
    image() {
      if (!this.item) return null;

      try {
        new URL(this.item.rights);
      } catch (err) {
        return null;
      }

      return this.item && this.item.rights;
    },
    isPerson() {
      return this.itemTags.some((tag) => tag.toLowerCase() === 'person');
    },
    isStartLocation() {
      return this.$route.path === this.$router.history._startLocation;
    },
  },
  methods: {
    ...mapMutations(['setLastItem']),
    async fetchData() {
      if (this.lastItem && this.lastItem.id === this.id) {
        this.item = this.lastItem.item;
        return;
      }

      this.showArchiveConnections = false;
      this.loading = true;
      const { data } = await getItem({ key: this.id });
      this.item = data;
      this.setLastItem({ id: this.id, item: this.item });
      this.loading = false;
      const title = this.item.title
        ? (this.item.title.length > 20 ? this.item.title.slice(0, 20) + '...' : this.item.title) + ' - '
        : '';
      document.title = `${title}Calculating Control`;
    },
    async toggleArchiveConnections() {
      this.showArchiveConnections = !this.showArchiveConnections;
      if (this.relations !== null) return;

      const relations = this.item.relations['dc:relation'];
      if (!relations) return;

      const keys = (Array.isArray(relations) ? relations : [relations]).map((relation) => {
        const url = new URL(relation);
        return url.pathname.split('/').pop();
      });
      this.relations = await getRelatedItems({ keys });

      this.$nextTick().then(() => {
        console.log('thic');
        if (this.showArchiveConnections && this.$refs.connections) {
          this.$refs.connections.scrollIntoView({ behavior: 'smooth' });
        }
      });
    },
    selectTag(tag) {
      this.$router.push({
        name: 'Archive',
        query: {
          tags: [tag],
        },
      });
    },
    onBack() {
      if (this.isStartLocation) {
        if (this.from) {
          const name = this.from[0].toUpperCase() + this.from.slice(1);
          this.$router.push({ name });
        } else {
          this.$router.push({ name: 'Archive' });
        }
      } else {
        this.$router.go(-1);
      }
    },
  },
};
</script>

<style scoped>
.item {
  background: var(--color-prime-light-grey);
}

@media screen and (min-width: 1200px) {
  .item {
    height: 100vh;
    overflow: hidden;
  }
}

.item__header {
  background: var(--color-prime-light-grey);
  border-bottom: solid 2px black;
  font-size: var(--font-size-large);
  height: 80px;
  padding: 5px 15px;
  position: sticky;
  top: 0;
  z-index: 2;
}

.item__page-title {
  font-size: inherit;
  margin: 0;
}

.item__meta {
  color: var(--color-prime-olive-half);
}

.item__home {
  position: absolute;
  top: 7px;
  right: 15px;
}

.main {
  overflow: hidden;
  min-height: calc(100vh - 80px);
  position: relative;
  overflow-y: auto;
}

@media screen and (min-width: 1200px) {
  .main {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr;
    height: calc(100vh - 80px);
  }
}

.archive-connections {
  background: rgba(255, 255, 255, 0.3);
  border-bottom: solid 2px black;
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 2;
}

.archive-connections__show {
  font-family: inherit;
  padding: 30px 0;
  cursor: pointer;
  height: 100%;
  width: 100%;
  grid-column: span 2;
  max-height: 80px;
  justify-content: center;
  align-items: center;
  display: flex;
  margin: 5px;
  position: sticky;
  bottom: 0;
}

/* @media screen and (min-width: 768px) {
  .archive-connections__show {
    position: fixed;
  }
} */

.relations {
  background: var(--color-prime-light-grey);
}

.relations__list {
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow-y: auto;
}

.item__tags-cloud {
  display: none;
}

@media screen and (min-width: 768px) {
  .relations {
    background: none;
  }

  .relations__list {
    height: calc(100vh - 180px);
  }

  .item__tags-cloud {
    display: block;
  }
}

.relations__item {
  border-bottom: solid 2px black;
  min-height: 200px;
}

.relations__item:last-of-type {
  border-bottom: none;
}

.archive-button {
  cursor: pointer;
  position: fixed;
}

.archive-button {
  text-decoration: inherit;
  padding: 7px 35px;
  top: 60%;
  left: calc(100% / 3);
}

.item__loading {
  display: flex;
  height: 100vh;
  margin: 50px auto;
  justify-content: center;
}
</style>
