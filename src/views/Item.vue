<template>
  <main class="main">
    <section class="section media">
      <iframe
        v-if="youtubeEmbed"
        class="media-embed"
        type="text/html"
        width="640"
        height="360"
        :src="youtubeEmbed"
        frameborder="0"></iframe>
    </section>
    <section class="section content">
      <div v-if="loading">
        Loading...
      </div>
      <div v-else-if="item && item.itemType === 'note'">
        <h1 class="page-title">Note</h1>
        <div v-html="item.note"></div>
      </div>
      <div v-else-if="item">
        <h1 class="page-title">{{ item.title }}</h1>
        <div class="field">
          <span class="field__label">Typ:</span>
          {{ item.itemType || fieldNA }}
        </div>
        <div class="field">
          <span class="field__label">Autor*innen:</span>
          {{ creators || fieldNA }}
        </div>
        <div class="field">
          <span class="field__label">Datum:</span>
          {{ item.date || fieldNA }}
        </div>
        <div class="field">
          <span class="field__label">Verlag:</span>
          {{ item.publisher || fieldNA }}
        </div>
        <div class="field">
          <span class="field__label">ISBN:</span>
          {{ item.ISBN || fieldNA }}
        </div>
        <div class="field">
          <span class="field__label">Sprache:</span>
          {{ item.language || fieldNA }}
        </div>
        <div class="field">
          <span class="field__label">Seiten:</span>
          {{ item.numPages || fieldNA }}
        </div>
        <div class="field">
          <span class="field__label">Archiv:</span>
          {{ item.archive || fieldNA }}
        </div>
        <div class="field">
          <span class="field__label">Katalog:</span>
          {{ item.libraryCatalog || fieldNA }}
        </div>
        <div class="field field--long">
          <span class="field__label">Abstrakt:</span>
          <pre class="field__pre">{{ item.abstractNote || fieldNA }}</pre>
        </div>
        <div class="tags">
          <h2 class="tags__title">Tags</h2>
          <ul class="tags__list">
            <li v-for="{ tag } in item.tags" :key="tag" class="tags__item">
              <router-link class="tags__tag" :to="{ name: 'Archive', query: { tags: [tag] } }">#{{ tag }}</router-link>
            </li>
          </ul>
        </div>
      </div>
      <div v-else>Error</div>
    </section>
  </main>
</template>

<script>
import { getItem } from '@/api';

const FIELD_NA = '-';
const YOUTUBE_EMBED_URL = 'https://www.youtube.com/embed/?modestbranding=1';

export default {
  name: 'Item',
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
  }),
  created() {
    this.fetchData();
  },
  computed: {
    creators() {
      if (!this.item || !this.item.creators) return null;
      return this.item.creators.map(({ firstName, lastName }) => [firstName, lastName].join(' ')).join(', ');
    },
    fieldNA() {
      return FIELD_NA;
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
      this.loading = true;
      const { data } = await getItem({ key: this.id });
      this.item = data;
      this.loading = false;
    },
  },
};
</script>

<style scoped>
.main {
  display: grid;
  gap: 10px;
}

@media screen and (min-width: 1024px) {
  .main {
    grid-template-columns: 1fr 2fr;
  }
}

.section {
  border: solid 3px black;
  padding: 10px;
}

.page-title {
  margin-top: 0;
}

.field {
  border-top: solid 3px #ddd;
  padding: 5px;
}

.field__label {
  font-weight: bold;
}

.field--long .field__label {
  display: block;
  margin: 0 0 5px;
}

.field__pre {
  white-space: pre-wrap;
}

.media-embed {
  width: 100%;
}

.tags__list {
  list-style-type: none;
  margin: 0;
  padding: 0;
}

.tags__title {
  margin: 0 0 10px;
}

.tags__item {
  display: inline-flex;
}

.tags__tag {
  align-items: center;
  background: #ddd;
  border: solid 3px #ddd;
  color: inherit;
  cursor: pointer;
  display: inline-flex;
  flex-grow: 1;
  justify-content: center;
  margin: 2px;
  padding: 5px;
  text-decoration: inherit;
}

.tags__tag:hover,
.tags__tag:focus-within {
  background: black;
  color: white;
}
</style>
