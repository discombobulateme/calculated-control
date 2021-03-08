<template>
  <router-link class="item-preview-link" :to="{ name: 'Item', params: { key: item.key } }">
    <article class="item-preview" tabindex="0">
      <p class="item-preview__type">{{ mainTag }}</p>
      <h2 class="item-preview__title" v-safe-html="titleText"></h2>
      <div v-if="highlightTag" class="item-preview__highlight blob blob--green">
        <span class="hash">#</span>{{ highlightTag }}
      </div>
    </article>
  </router-link>
</template>

<script>
import { highlightTags } from '@/tags';
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
    },
    highlightTag() {
      const { tags } = this.item.data;
      if (!tags) return null;
      const highlightTag = tags.find(({ tag }) => highlightTags.includes(tag));
      if (highlightTag) return highlightTag.tag;
      return null;
    },
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
  position: relative;
  transition: background-color var(--transition-time);
}

.item-preview-link:hover {
  background: var(--color-prime-light-grey);
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

.item-preview__highlight {
  display: inline-block;
  padding: 5px 15px;
  position: absolute;
  top: 15px;
  right: 15px;
}
</style>
