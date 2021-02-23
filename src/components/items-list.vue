<template>
  <ul class="items-list" tabindex="0">
    <li v-for="(item, index) in items" :key="index" class="items-list__item">
      <ItemPreview ref="item" :item="item" />
    </li>
  </ul>
</template>

<script>
import { sleep } from '@/utils';
import ItemPreview from './item-preview';

export default {
  name: 'ItemsList',
  components: {
    ItemPreview,
  },
  props: {
    items: {
      type: Array,
      default: () => [],
    }
  },
  mounted() {
    this.startInfiniteScroll();
    if (this.$refs.item) this.$refs.item[0].$el.focus();
  },
  watch: {
    async items() {
      if (!this.$refs.item) return;
      const lastItem = this.$refs.item[this.$refs.item.length - 1].$el;
      if (lastItem) {
        await sleep(1000);
        this.intersectionObserver.observe(lastItem);
      }
    },
  },
  methods: {
    onInfiniteScroll([ entry ]) {
      if (entry.isIntersecting) {
        this.intersectionObserver.unobserve(entry.target);
        this.$emit('infinite-scroll');
      }
    },
    startInfiniteScroll() {
      this.intersectionObserver = new IntersectionObserver(this.onInfiniteScroll);
    },
  }
}
</script>

<style lang="css" scoped>
.items-list {
  border: solid 1px black;
  display: grid;
  list-style-type: none;
  padding: 0;
  margin: 0;
  grid-template-columns: repeat(6, 1fr);
  grid-auto-flow: row dense;
}

.items-list__item {
  border: solid 1px black;
}

.items-list__item:first-of-type,
.items-list__item:nth-of-type(2),
.items-list__item:nth-of-type(8n),
.items-list__item:nth-of-type(8n + 1) {
  grid-column: span 3;
}

.items-list__item:nth-of-type(4n) {
  grid-column: span 2;
}
</style>
