<template>
  <section class="curated-item">
    <div class="curated-item__header">
      <ItemPulloutHeader :item="item" class="curated-item__pullout-header" />
      <YoutubeEmbed v-if="youtubeEmbed" :src="youtubeEmbed" class="curated-item__video" />
      <figure v-else-if="image" class="curated-item__image">
        <img :src="image" />
      </figure>
    </div>
    <div class="curated-item__info base-grid">
      <div class="curated-item__info-section curated-item__meta"></div>
      <div v-if="item.abstractNote" class="note curated-item__info-section curated-item__content">
        <div v-safe-html="item.abstractNote"></div>
      </div>
      <div class="curated-item__info-section curated-item__links">
        <a v-if="item.url && firstLinkText && !isSymposium" :href="urlOrEmail(item.url)" class="blob blob--pink curated-item__link" target="_blank" rel="noopener">
          {{ firstLinkText }}
          <ArrowRight class="curated-item__link-icon" />
        </a>
        <a v-if="item.extra && secondLinkText && !isSymposium" :href="urlOrEmail(item.extra)" class="blob blob--pink curated-item__link" target="_blank" rel="noopener">
          {{ secondLinkText }}
          <ArrowRight class="curated-item__link-icon" />
        </a>
      </div>
    </div>
  </section>
</template>

<script>
import ArrowRight from '@/components/icons/arrow-right';
import ItemPulloutHeader from './pullout-header';
import YoutubeEmbed from './youtube-embed';

export default {
  name: 'CuratedItem',
  components: {
    ArrowRight,
    ItemPulloutHeader,
    YoutubeEmbed,
  },
  props: {
    youtubeEmbed: {
      type: [String, null],
      default: null,
    },
    item: {
      type: Object,
      required: true,
    },
    image: {
      type: [String, null],
      default: null,
    },
    firstLinkText: {
      type: String,
      default: '',
    },
    secondLinkText: {
      type: String,
      default: '',
    },
  },
  computed: {
    itemTags() {
      return this.item.tags.map(({ tag }) => tag).filter(tag => !tag.startsWith('id_') && !tag.startsWith('date_'));
    },
    isSymposium() {
      return this.itemTags.some(tag => tag.toLowerCase() === 'symposium');
    },
  },
  methods: {
    urlOrEmail(url) {
      if (url.includes('@') && !url.startsWith('http')) {
        // it's probably actually an email address
        return `mailto:${url}`;
      }
      return url;
    },
  },
};
</script>

<style scoped>
.curated-item {
  grid-column: span 2;
}

.note {
  font-size: var(--font-size-small);
  padding: 15px 15px;
  white-space: pre-wrap;
}

.curated-item__header {
  display: flex;
  flex-direction: column;
  border: solid 1px black;
}

@media screen and (min-width: 768px) {
  .curated-item__header {
    border: solid 1px black;
  }
}

@media screen and (min-width: 768px) {
  .curated-item__pullout-header {
    border-bottom: solid 1px black;
  }
}

.curated-item__video {
  height: calc(100vh - 350px);
  border: solid 1px black;
}

.curated-item__info {
  grid-template-columns: 1fr 2fr 1fr;
  grid-template-rows: 1fr;
  grid-template-areas: "meta content links";
}

@media screen and (min-width: 768px) {
  .curated-item__info {
    display: grid;
  }
}

.curated-item__info-section {
  border: solid 1px black;
  border-top: none;
}

@media screen and (min-width: 768px) {
  .curated-item__info-section {
    padding-bottom: 300px;
  }
}

.curated-item__meta {
  grid-area: meta;
}

.curated-item__content {
  grid-area: content;
}

.curated-item__links {
  grid-area: links;
  padding: 5px;
  display: flex;
  flex-direction: column;
}

@media screen and (min-width: 768px) {
  .curated-item__links {
    padding: 5px 5px 100px;
  }
}

.curated-item__link {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 15px;
  width: 100%;
  height: 100%;
  max-height: 50vh;
  text-align: left;
}

.curated-item__link + .curated-item__link {
  margin-top: 5px;
}

.curated-item__link-icon {
  margin-left: 10px;
}

.curated-item__image {
  display: flex;
  margin: 0;
  width: 100%;
}

.curated-item__image img {
  width: 100%;
  object-fit: contain;
  object-position: center;
  max-height: calc(100vh - 100px);
}
</style>
