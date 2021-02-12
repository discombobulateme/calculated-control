<template>
  <ul class="items-list">
    <li v-for="(item, index) in items" :key="index" class="items-list__item">
      <ItemPreview :item="item" />
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
  }
}
</script>

<style lang="css" scoped>
.items-list {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.items-list__item {
  border: solid 3px #ddd;
  padding: 10px;
}

.items-list__item:focus-within,
.items-list__item:hover {
  border-color: black;
}

.items-list__item + .items-list__item {
  margin-top: 10px;
}
</style>
