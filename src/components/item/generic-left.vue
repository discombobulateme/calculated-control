<template>
  <section class="section media">
    <YoutubeEmbed :src="youtubeEmbed" />
    <figure v-if="image" class="item__image">
      <img :src="image" />
    </figure>
    <div v-else-if="item.itemType === 'note'">
      <div class="note" v-html="item.note"></div>
    </div>
    <div v-else-if="item.abstractNote && !isPerson" class="note">
      <h2 class="item__note-label"><span class="hash">#</span>{{ $t('item.abstract') }}</h2>
      <div v-html="item.abstractNote"></div>
    </div>
    <ItemPulloutHeader v-if="!item.abstractNote" :item="item" />
  </section>
</template>

<script>
import YoutubeEmbed from './youtube-embed';
import ItemPulloutHeader from './pullout-header';

export default {
  name: 'ItemGenericLeft',
  components: {
    ItemPulloutHeader,
    YoutubeEmbed,
  },
  props: {
    youtubeEmbed: {
      type: [String, null],
      default: null,
    },
    image: {
      type: [String, null],
      default: null,
    },
    item: {
      type: Object,
      required: true,
    },
  },
  computed: {
    isPerson() {
      return this.mainTag === 'person';
    },
  },
};
</script>

<style scoped>
.section {
  border: solid 1px black;
  height: 100%;
  overflow: auto;
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
</style>
