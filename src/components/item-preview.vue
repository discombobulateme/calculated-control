<template>
  <router-link class="item-preview-link" :to="{ name: 'Item', params: { key: item.key } }">
    <article class="item-preview" tabindex="0">
      <p class="item-preview__type">{{ mainTag }}</p>
      <h2 class="item-preview__title" v-safe-html="titleText"></h2>
    </article>
  </router-link>
</template>

<script>
import { getMainTag } from '@/utils';

const NOTE_SLICE_LENGTH = 60;

export default {
  name: 'ItemPreview',
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  computed: {
    mainTag() {
      return this.item && getMainTag(this.item.data);
    },
    titleText() {
      const { title, note } = this.item.data;
      const text = title || note || '';
      return text.length > NOTE_SLICE_LENGTH ? text.slice(0, NOTE_SLICE_LENGTH) + '...' : text;
    }
  }
};
</script>

<style scoped>
.item-preview-link {
  color: inherit;
  display: block;
  height: 100%;
  padding: 15px;
  text-decoration: inherit;
  width: 100%;
  word-wrap: anywhere;
}

.item-preview:focus {
  outline: none;
}

.item-preview__title,
.item-preview__type {
  margin: 0;
  font-size: var(--font-size-large);
}

.item-preview__type {
  margin-top: 5px;
}

.item-preview__type:before {
  content: '#'
}
</style>
