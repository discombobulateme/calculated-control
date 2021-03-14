<template>
  <section class="event">
    <div class="event__header">
      <ItemPulloutHeader :item="item" class="event__pullout-header" />
      <YoutubeEmbed v-if="youtubeEmbed" :src="youtubeEmbed" class="event__video" />
      <figure v-else-if="image" class="event__image">
        <img :src="image" />
      </figure>
    </div>
    <div class="event__info base-grid">
      <div class="event__info-section event__meta"></div>
      <div v-if="item.abstractNote" class="note event__info-section event__content">
        <div v-safe-html="item.abstractNote"></div>
      </div>
      <div class="event__info-section event__links">
        <a v-if="item.url && firstLinkText" :href="item.url" class="blob blob--pink event__link" target="_blank" rel="noopener">
          {{ firstLinkText }}
          <ArrowRight class="event__link-icon" />
        </a>
        <a v-if="item.extra && secondLinkText" :href="item.extra" class="blob blob--pink event__link" target="_blank" rel="noopener">
          {{ secondLinkText }}
          <ArrowRight class="event__link-icon" />
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
  name: 'ItemEvent',
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
};
</script>

<style scoped>
.event {
  grid-column: span 2;
}

.note {
  font-size: var(--font-size-small);
  padding: 15px 15px;
  white-space: pre-wrap;
}

.event__header {
  display: flex;
  flex-direction: column;
  border: solid 1px black;
}

.event__pullout-header {
  border-bottom: solid 1px black;
}

.event__video {
  height: calc(100vh - 350px);
  border: solid 1px black;
}

.event__info {
  grid-template-columns: 1fr 2fr 1fr;
  grid-template-rows: 1fr;
  grid-template-areas: "meta content links";
}

@media screen and (min-width: 768px) {
  .event__info {
    display: grid;
  }
}

.event__info-section {
  border: solid 1px black;
  padding-bottom: 100px;
}

.event__meta {
  grid-area: meta;
}

.event__content {
  grid-area: content;
}

.event__links {
  grid-area: links;
  padding: 5px 5px 100px;
  display: flex;
  flex-direction: column;
}

.event__link {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 15px;
  width: 100%;
  height: 100%;
  max-height: 50vh;
  text-align: left;
}

.event__link + .event__link {
  margin-top: 5px;
}

.event__link-icon {
  margin-left: 10px;
}

.event__image {
  display: flex;
  margin: 0;
  width: 100%;
}

.event__image img {
  width: 100%;
  object-fit: contain;
  object-position: center;
  max-height: calc(100vh - 100px);
}
</style>
