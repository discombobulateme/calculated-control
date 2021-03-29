<template>
  <div class="item__pullout-header">
    <div class="item__type">
      <span class="hash">#</span>{{ mainTag }}
    </div>
    <time v-if="formattedDate" class="item__date">
      {{ formattedDate }}
    </time>
    <div v-if="creators && creators.length > 0 && !isPerson" class="item__authors">
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
    <div v-if="highlightTag" class="item__pullout-header-highlight blob blob--green">
      <span class="hash">#</span>{{ highlightTag }}
    </div>
  </div>
</template>

<script>
import { highlightTags } from '@/tags';
import { getMainTag, getItemAuthor, formatDate } from '@/utils';

export default {
  name: 'ItemPulloutHeader',
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  computed: {
    creators() {
      return getItemAuthor(this.item);
    },
    mainTag() {
      return this.item && getMainTag(this.item, this.$t.bind(this));
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
    formattedDate() {
      return formatDate(this.item.date);
    },
    highlightTag() {
      const { tags } = this.item;
      if (!tags) return null;
      const highlightTag = tags.find(({ tag }) => highlightTags.includes(tag));
      if (highlightTag) return this.$t(`tags.${highlightTag.tag}`);
      return null;
    },
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
.item__pullout-header {
  font-size: var(--font-size-xl);
  letter-spacing: 0.75;
  padding: 5px 15px;
}

.item__title {
  font-size: inherit;
  margin: 0;
}

.item__authors {
  color: var(--color-prime-rose-darker);
}

.item__pullout-header-highlight {
  position: absolute;
  top: 15px;
  right: 15px;
  padding: 5px 15px;
}
</style>
