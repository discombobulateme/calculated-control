<template>
  <ul class="items-list" tabindex="0">
    <li v-for="(item, index) in items" :key="index" class="items-list__item">
      <ItemPreview ref="item" :item="item" />
    </li>
  </ul>
</template>

<script>
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
    if (this.$refs.item) this.$refs.item[0].$el.focus();
  },
}
</script>

<style lang="css" scoped>
.items-list {
  border: solid 1px black;
  display: grid;
  list-style-type: none;
  padding: 0;
  margin: 0;
}

@media screen and (min-width: 768px) {
  .items-list {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media screen and (min-width: 1100px) {
  .items-list {
    grid-template-columns: repeat(3, 1fr);
  }
}

.items-list__item {
  border: solid 1px black;
  height: 288px;
}
</style>
