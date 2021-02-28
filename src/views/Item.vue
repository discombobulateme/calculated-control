<template>
  <main class="main">
    <HomeButton class="home-button" aria-label="Home" />
    <router-link
      :to="{ name: 'Archive' }"
      class="blob blob--green blob--shadow archive-button"
    >
      ← archive
    </router-link>
    <section class="section media">
      <iframe
        v-if="youtubeEmbed"
        class="media-embed"
        type="text/html"
        width="640"
        height="360"
        :src="youtubeEmbed"
        frameborder="0"></iframe>
      <div v-else-if="item && item.itemType === 'note'">
        <div v-html="item.note"></div>
      </div>
    </section>
    <section class="section content">
      <div v-if="loading">
        Loading...
      </div>
      <div v-else-if="item" class="item__info">
        <div v-show="!showArchiveConnections" class="item__fields">
          <div v-if="item.title" class="field">
            <span class="field__label">title</span>
            {{ item.title }}
          </div>
          <div v-if="item.itemType" class="field">
            <span class="field__label">type</span>
            {{ item.itemType }}
          </div>
          <div v-if="creators && creators.length > 0" class="field">
            <span class="field__label">author(s)</span>
            {{ creators }}
          </div>
          <div v-if="item.date" class="field">
            <span class="field__label">date</span>
            {{ formatDate(item.date) }}
          </div>
          <div v-if="item.accessDate" class="field">
            <span class="field__label">accessDate</span>
            {{ formatDate(item.accessDate) }}
          </div>
          <div v-if="item.dateAdded" class="field">
            <span class="field__label">dateAdded</span>
            {{ formatDate(item.dateAdded) }}
          </div>
          <div v-if="item.publisher" class="field">
            <span class="field__label">publisher</span>
            {{ item.publisher }}
          </div>
          <div v-if="item.ISBN" class="field">
            <span class="field__label">isbn</span>
            {{ item.ISBN }}
          </div>
          <div v-if="item.language" class="field">
            <span class="field__label">language</span>
            {{ item.language }}
          </div>
          <div v-if="item.numPages" class="field">
            <span class="field__label">pages</span>
            {{ item.numPages }}
          </div>
          <div v-if="item.archive" class="field">
            <span class="field__label">archive</span>
            {{ item.archive }}
          </div>
          <div v-if="item.libraryCatalog" class="field">
            <span class="field__label">catalog</span>
            {{ item.libraryCatalog }}
          </div>
          <div v-if="item.abstractNote" class="field field--long">
            <span class="field__label">abstract</span>
            <pre class="field__pre">{{ item.abstractNote }}</pre>
          </div>
        </div>
        <div class="archive-connections">
          <div v-show="showArchiveConnections" class="tags">
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
                  #{{ tag }}
                </router-link>
              </li>
            </ul>
            <div v-if="relations" class="relations">
              <ul class="relations__list">
                <li v-for="relation in relations" :key="relation.key" class="relations__item">
                  <ItemPreview :item="relation" />
                </li>
              </ul>
            </div>
          </div>
          <button class="blob blob--green archive-connections__show" @click="toggleArchiveConnections">
            {{ showArchiveConnections ? 'hide' : 'show' }} archive connections
          </button>
        </div>
      </div>
      <div v-else>Error</div>
    </section>
  </main>
</template>

<script>
import { getItem, getRelatedItems } from '@/api';
import { primaryTags } from '@/tags';
import HomeButton from '@/components/home-button';
import ItemPreview from '@/components/item-preview';

const YOUTUBE_EMBED_URL = 'https://www.youtube.com/embed/?modestbranding=1';

export default {
  name: 'Item',
  components: {
    HomeButton,
    ItemPreview,
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
      if (!this.item || !this.item.creators) return null;
      return this.item.creators
        .map(({ firstName, lastName, name }) => [firstName, lastName, name].join(' '))
        .join(', ')
        .trim();
    },
    youtubeEmbed() {
      if (!this.item || !this.item.url) return;

      const watchUrl = new URL(this.item.url);
      if (!watchUrl.hostname.includes('youtube.com')) return;

      const embedUrl = new URL(YOUTUBE_EMBED_URL);
      embedUrl.pathname = embedUrl.pathname + watchUrl.searchParams.get('v');

      return embedUrl.toString();
    }
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
      return new Date(date).toLocaleString();
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
.main {
  display: grid;
  border: solid 1px black;
  overflow: hidden;
}

@media screen and (min-width: 1024px) {
  .main {
    grid-template-columns: 1fr 1fr;
    height: 100vh;
  }

  .item__fields {
    max-height: calc(100vh - 60px);
    overflow: auto;
  }
}

.section {
  border: solid 1px black;
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
  border: solid 1px black;
  display: flex;
  flex-grow: 1;
  flex-direction: column;
}

.archive-connections__show {
  cursor: pointer;
  height: 100%;
  width: 100%;
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

.tags__tag:hover,
.tags__tag:focus-within {
  background: black;
  border-color: black;
  color: white;
}

.relations__list {
  border-top: solid 1px black;
  border-bottom: solid 1px black;
  list-style-type: none;
  margin: 0;
  padding: 0;
  max-height: 400px;
  overflow-y: scroll;
}

.relations__item {
  border-bottom: solid 1px black;
  border-top: solid 1px black;
  height: 200px;
}

.home-button,
.archive-button {
  position: absolute;
}

.home-button {
  top: 30px;
  left: 35px;
}

.archive-button {
  text-decoration: inherit;
  padding: 7px 35px;
  top: 60%;
  left: calc(100% / 3);
}
</style>
