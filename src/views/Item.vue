<template>
  <div class="item">
    <ArchiveHeader class="item__header">
      <template #meta>
        <div class="item__meta">{{ $t('archive.title' ) }}: {{ $t('item.entry' ) }} #{{ id }}</div>
      </template>
    </ArchiveHeader>
    <div class="item__loading" v-if="loading">
      <Loader />
    </div>
    <main v-else-if="item" class="main">
      <a
        class="blob blob--green blob--shadow archive-button"
        :class="{ blurrable: true, 'blurred': showArchiveConnections }"
        @click.prevent="$router.go(-1)"
      >
        ← {{ $t('archive.title') }}
      </a>
      <template v-if="isEvent">
        <CuratedItem
          :item="item"
          :image="image"
          :youtubeEmbed="youtubeEmbed"
          :first-link-text="$t('event.enterOnlineExhibition')"
          :second-link-text="$t('event.booking')"
          :class="{ blurrable: true, 'blurred': showArchiveConnections }"
        />
      </template>
      <template v-else-if="isJournal">
        <CuratedItem
          :item="item"
          :image="image"
          :second-link-text="$t('journal.readFull')"
          :class="{ blurrable: true, 'blurred': showArchiveConnections }"
        />
      </template>
      <template v-else>
        <ItemGenericLeft
          :item="item"
          :youtube-embed="youtubeEmbed"
          :image="image"
          :class="{ blurrable: true, 'blurred': showArchiveConnections }"
        />
        <ItemGenericRight
          :item="item"
          :class="{ blurrable: true, 'blurred': showArchiveConnections }"
          :note="isPerson"
          :image="image"
          :title-author-type="titleAuthorTypeRight"
        />
      </template>
    </main>
    <div v-else>Not Found</div>
    <div v-if="item" v-show="showArchiveConnections" class="archive-connections">
      <div v-if="relations" class="relations">
        <ul class="relations__list">
          <li v-for="relation in relations" :key="relation.key" class="relations__item">
            <ItemPreview :item="relation" />
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
import { getItem, getRelatedItems } from '@/api';
import { caseInsensitiveIncludes } from '@/utils';
import ArchiveHeader from '@/components/archive-header';
import CuratedItem from '@/components/item/curated-item';
import ItemGenericLeft from '@/components/item/generic-left';
import ItemGenericRight from '@/components/item/generic-right';
import ItemPreview from '@/components/item-preview';
import TagsCloud from '@/components/tags-cloud';
import Loader from '@/components/icons/loader';

const YOUTUBE_EMBED_URL = 'https://www.youtube.com/embed/?modestbranding=1';

export default {
  name: 'Item',
  components: {
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
    isEvent() {
      return this.itemTags.some(tag => caseInsensitiveIncludes(['symposium', 'unconference', 'ausstellung'], tag));
    },
    isJournal() {
      return this.itemTags.some(tag => tag.toLowerCase() === 'journal');
    },
    titleAuthorTypeRight() {
      return Boolean(this.image || this.youtubeEmbed || this.item.itemType === 'note' || this.item.abstractNote);
    },
    itemTags() {
      return this.item.tags.map(({ tag }) => tag).filter(tag => !tag.startsWith('id_') && !tag.startsWith('date_'));
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
      } catch(err) {
        return null;
      }

      return this.item && this.item.rights;
    },
    isPerson() {
      return this.mainTag === 'person';
    },
  },
  methods: {
    async fetchData() {
      this.showArchiveConnections = false;
      this.loading = true;
      const { data } = await getItem({ key: this.id });
      this.item = data;
      this.loading = false;
    },
    async toggleArchiveConnections() {
      this.showArchiveConnections = !this.showArchiveConnections;
      if (this.relations !== null) return;

      const relations = this.item.relations['dc:relation'];
      if (!relations) return;

      const keys = (Array.isArray(relations) ? relations : [relations]).map(relation => {
        const url = new URL(relation);
        return url.pathname.split('/').pop();
      });
      this.relations = await getRelatedItems({ keys });
    },
    selectTag(tag) {
      this.$router.push({
        name: 'Archive',
        query: {
          tags: [tag],
        },
      })
    }
  },
};
</script>

<style scoped>
.item {
  background: var(--color-prime-light-grey);
  height: 100vh;
  overflow: hidden;
}

.item__header {
  font-size: var(--font-size-medium-small);
  height: 80px;
  padding: 5px 15px;
  position: relative;
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
  border: solid 1px black;
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
  border: solid 1px black;
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  position: absolute;
  top: 80px;
  left: 0;
  width: 100%;
}

.archive-connections__show {
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
  position: fixed;
  bottom: 0;
}

.relations {
  background: var(--color-prime-light-grey);
}

.relations__list {
  border-top: solid 1px black;
  border-bottom: solid 1px black;
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
  border-bottom: solid 1px black;
  border-top: solid 1px black;
  height: 200px;
}

.archive-button {
  position: absolute;
}

.archive-button {
  text-decoration: inherit;
  padding: 7px 35px;
  top: 60%;
  left: calc(100% / 3);
}

.item__loading {
  display: flex;
  height: 100vw;
  margin: 50px auto;
  justify-content: center;
}
</style>
