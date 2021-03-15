<template>
  <div class="item__pullout-header">
    <div class="item__type">
      <span class="hash">#</span>{{ mainTag }}
    </div>
    <time v-if="formattedDate" class="item__date">
      {{ formattedDate }}
    </time>
    <div v-if="creators && creators.length > 0" class="item__authors">
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
  </div>
</template>

<script>
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
  },
};
</script>

<style scoped>
.item__pullout-header {
  font-size: var(--font-size-xl);
  padding: 5px 15px;
}

.item__title {
  font-size: inherit;
  margin: 0;
}

.item__authors {
  color: var(--color-prime-rose-darker);
}
</style>
