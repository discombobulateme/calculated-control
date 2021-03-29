<template>
  <router-link class="item-preview-link" :to="{ name: 'Item', params: { key: item.key }, query }">
    <article class="item-preview" tabindex="0">
      <p class="item-preview__type">{{ mainTag }}</p>
      <time v-if="item.data.date" class="item-preview__date">{{ item.data.date }}</time>
      <p v-if="author && !isPerson" class="item-preview__author">{{ author }}</p>
      <h2 class="item-preview__title" v-safe-html="titleText"></h2>
      <div v-if="highlightTag" class="item-preview__highlight blob blob--green">
        <span class="hash">#</span>{{ highlightTag }}
      </div>
    </article>
  </router-link>
</template>

<script>
import { highlightTags } from '@/tags';
import { getMainTag, getItemAuthor } from '@/utils';

const NOTE_SLICE_LENGTH = 60;

export default {
  name: 'ItemPreview',
  props: {
    item: {
      type: Object,
      required: true,
    },
    from: {
      type: String,
      default: '',
    },
    fromRelated: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    query() {
      if (this.fromRelated) {
        return { fromRelated: true };
      }
      return this.from ? { from: this.from } : {};
    },
    mainTag() {
      return this.item && getMainTag(this.item.data, (str) => this.$t(str));
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
      if (highlightTag) return this.$t(`tags.${highlightTag.tag}`);
      return null;
    },
    author() {
      return getItemAuthor(this.item.data);
    },
    isPerson() {
      return this.mainTag === 'person';
    },
  }
};
</script>

<style scoped>
.item-preview-link {
  color: inherit;
  font-size: var(--font-size-large);
  display: block;
  height: 100%;
  padding: 7px 12px;
  text-decoration: inherit;
  width: 100%;
  word-wrap: anywhere;
  overflow: hidden;
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
.item-preview__type,
.item-preview__author {
  margin: 0;
  font-size: inherit;
}

.item-preview__type {
  margin-top: 5px;
}

.item-preview__title {
  font-style: italic;
}

.item-preview__type:before {
  content: '#'
}

.item-preview__highlight {
  display: inline-block;
  font-size: var(--font-size-xxs);
  padding: 5px 15px;
  position: absolute;
  top: 5px;
  right: 5px;
}
</style>
