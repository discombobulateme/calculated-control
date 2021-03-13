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
      <router-link
        :to="{ name: 'Archive' }"
        class="blob blob--green blob--shadow archive-button"
        :class="{ blurrable: true, 'blurred': showArchiveConnections }"
      >
        ← {{ $t('archive.title') }}
      </router-link>
      <section class="section media" :class="{ blurrable: true, 'blurred': showArchiveConnections }">
        <iframe
          v-if="youtubeEmbed"
          class="media-embed"
          type="text/html"
          width="640"
          height="360"
          :src="youtubeEmbed"
          frameborder="0"></iframe>
        <figure v-if="image" class="item__image">
          <img :src="image" />
        </figure>
        <div v-else-if="item && item.itemType === 'note'">
          <div class="note" v-html="item.note"></div>
        </div>
        <div v-else-if="item && item.abstractNote && !isPerson" class="note">
          <h2 class="item__note-label"><span class="hash">#</span>{{ $t('item.abstract') }}</h2>
          <div v-html="item.abstractNote"></div>
        </div>
        <div v-else-if="item" class="item__pullout-header">
          <div class="item__type">
            <span class="hash">#</span>{{ mainTag }}
          </div>
          <div v-if="creators && creators.length > 0" class="item__authors">
            <router-link
              :to="authorRoute"
              class="link"
            >
              {{ creators }}
            </router-link>
          </div>
          <h2 v-if="item.title" class="item__title">
            {{ item.title }}
          </h2>
        </div>
      </section>
      <section class="section content" :class="{ blurrable: true, 'blurred': showArchiveConnections }">
        <div class="item__info">
          <div v-if="isPerson" class="item__bio note">
            {{ item.abstractNote }}
          </div>
          <div v-else class="item__fields">
            <template v-if="image || youtubeEmbed || item.itemType === 'note' || item.abstractNote">
              <div v-if="item.title" class="field">
                <span class="field__label">{{ $t('item.title') }}</span>
                {{ item.title }}
              </div>
              <div v-if="creators && creators.length > 0" class="field">
                <span class="field__label">{{ $t('item.authors') }}</span>
                {{ creators }}
              </div>
              <div v-if="item.itemType" class="field">
                <span class="field__label">{{ $t('item.type') }}</span>
                {{ item.itemType }}
              </div>
            </template>
            <div v-if="item.date" class="field">
              <span class="field__label">{{ $t('item.date') }}</span>
              {{ formatDate(item.date) }}
            </div>
            <div v-if="item.accessDate" class="field">
              <span class="field__label">{{ $t('item.accessDate')}}</span>
              {{ formatDate(item.accessDate) }}
            </div>
            <div v-if="item.dateAdded" class="field">
              <span class="field__label">{{ $t('item.dateAdded') }}</span>
              {{ formatDate(item.dateAdded) }}
            </div>
            <div v-if="item.publisher" class="field">
              <span class="field__label">{{ $t('item.publisher') }}</span>
              {{ item.publisher }}
            </div>
            <div v-if="item.DOI" class="field">
              <span class="field__label">DOI</span>
              {{ item.DOI }}
            </div>
            <div v-if="item.ISBN" class="field">
              <span class="field__label">ISBN</span>
              {{ item.ISBN }}
            </div>
            <div v-if="item.language" class="field">
              <span class="field__label">{{ $t('item.language') }}</span>
              {{ item.language }}
            </div>
            <div v-if="item.numPages" class="field">
              <span class="field__label">{{ $t('item.pages') }}</span>
              {{ item.numPages }}
            </div>
            <div v-if="item.archive" class="field">
              <span class="field__label">{{ $t('item.archive') }}</span>
              {{ item.archive }}
            </div>
            <div v-if="item.libraryCatalog" class="field">
              <span class="field__label">{{ $t('item.catalog') }}</span>
              {{ item.libraryCatalog }}
            </div>
            <div v-if="item.url" class="field">
              <span class="field__label">URL</span>
              <a :href="item.url" class="link one-line">{{ item.url }}</a>
            </div>
            <div v-if="image && item.abstractNote" class="field field--long">
              <span class="field__label">{{ $t('item.abstract') }}</span>
              <pre class="field__pre">{{ item.abstractNote }}</pre>
            </div>
          </div>
        </div>
      </section>
      <div v-show="showArchiveConnections" class="archive-connections">
        <div v-if="relations" class="relations">
          <ul class="relations__list">
            <li v-for="relation in relations" :key="relation.key" class="relations__item">
              <ItemPreview :item="relation" />
            </li>
          </ul>
        </div>
        <ul class="tags__list">
          <li v-for="{ tag } in item.tags" :key="tag" class="tags__item">
            <router-link
              :class="{
                'tags__tag': true,
                'blob': true,
                'blob--pink': isPrimary(tag)
              }"
              :to="{ name: 'Archive', query: { tags: [tag] } }"
            >
              {{ tag }}
            </router-link>
          </li>
        </ul>
      </div>
      <button class="blob blob--green archive-connections__show" @click="toggleArchiveConnections">
        {{ showArchiveConnections ? $t('item.hideRelatedEntries') : $t('item.showRelatedEntries') }}
      </button>
    </main>
    <div v-else>Not Found</div>
  </div>
</template>

<script>
import { getItem, getRelatedItems } from '@/api';
import { primaryTags } from '@/tags';
import { getMainTag, getItemAuthor } from '@/utils';
import ArchiveHeader from '@/components/archive-header';
import ItemPreview from '@/components/item-preview';
import Loader from '@/components/icons/loader';

const YOUTUBE_EMBED_URL = 'https://www.youtube.com/embed/?modestbranding=1';

export default {
  name: 'Item',
  components: {
    ArchiveHeader,
    ItemPreview,
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
    creators() {
      return getItemAuthor(this.item);
    },
    authorRoute() {
      const authorIDTag = this.item.tags.find(({ tag }) => tag.startsWith('id_'));
      if (authorIDTag) {
        return {
          name: 'Item',
          params: {
            key: authorIDTag.tag.replace('id_', ''),
          },
        }
      }
      return {
        name: 'Archive',
        query: { tags: 'person', q: this.creators }
      };
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
    mainTag() {
      return this.item && getMainTag(this.item);
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
    isPrimary(tag) {
      return primaryTags.includes(tag);
    },
    formatDate(date) {
      if (!date) return null;
      const dateObject = new Date(date);
      if (isNaN(dateObject)) return date;
      return dateObject.toLocaleString();
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
    }
  },
};
</script>

<style scoped>
.item {
  background: var(--color-prime-light-grey);
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

.item__pullout-header {
  font-size: var(--font-size-xl);
  padding: 5px 15px;
}

.item__title {
  font-size: inherit;
  margin: 0;
}

.item__authors {
  color: var(--color-prime-rose-darker);
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
}

@media screen and (min-width: 1024px) {
  .main {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr;
    height: calc(100vh - 80px);
  }

  .item__fields {
    max-height: calc(100vh - 60px);
    overflow: auto;
  }
}

.section {
  border: solid 1px black;
  height: 100%;
  overflow: auto;
}

.item__info {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.field {
  border: solid 1px black;
  font-size: var(--font-size-small);
  padding: 10px;
}

.field__label {
  display: block;
}

.field--long .field_label {
  display: block;
  margin: 0 0 5px;
}

.field__pre {
  white-space: pre-wrap;
  font-family: inherit;
}

.media-embed {
  height: 100%;
  width: 100%;
}

.archive-connections {
  background: rgba(255, 255, 255, 0.3);
  border: solid 1px black;
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  position: absolute;
  top: 0;
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
}

.tags__list {
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
  margin: 0;
  padding: 0;
}

.tags__item {
  display: inline-flex;
  padding: 5px;
  flex-basis: 50%;
  flex-grow: 1;
}

.tags__tag {
  padding: 20px;
  text-decoration: inherit;
  width: 100%;
}

.relations__list {
  border-top: solid 1px black;
  border-bottom: solid 1px black;
  list-style-type: none;
  margin: 0;
  padding: 0;
  max-height: 400px;
  overflow-y: auto;
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

.note {
  font-size: var(--font-size-small);
  padding: 15px 15px;
  white-space: pre-wrap;
}

.item__note-label {
  font-size: inherit;
  margin: 0;
}

.item__image {
  margin: 0;
  width: 100%;
}

.item__image img {
  width: 100%;
  object-fit: contain;
  object-position: center;
  max-height: calc(100vh - 100px);
}

.item__loading {
  height: 100%;
}
</style>
