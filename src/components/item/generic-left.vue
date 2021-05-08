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
    <ItemPulloutHeader v-if="isPerson || !item.abstractNote" :item="item" />
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
    itemTags() {
      return this.item.tags.map(({ tag }) => tag).filter(tag => !tag.startsWith('id_') && !tag.startsWith('date_'));
    },
    isPerson() {
      return this.itemTags.some(tag => tag.toLowerCase() === 'person');
    },
  },
};
</script>

<style scoped>
.section {
  border-bottom: solid 2px black;
  height: 100%;
  overflow: auto;
}

@media screen and (min-width: 768px) {
  .section {
    border-right: solid 2px black;
    border-bottom: none;
  }
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
