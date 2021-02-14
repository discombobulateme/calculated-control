<template>
  <router-link class="item-preview-link" :to="{ name: 'Item', params: { key: item.key } }">
    <article class="item-preview" tabindex="0">
      <h2 class="item-preview__title">{{ item.data.title }}</h2>
      <p class="item-preview__type">{{ item.data.itemType }}</p>
    </article>
  </router-link>
</template>

<script>
export default {
  name: 'ItemPreview',
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
.item-preview-link {
  color: inherit;
  text-decoration: inherit;
}

.item-preview:focus {
  outline: none;
}

.item-preview__title {
  margin: 0;
  font-size: 1.25rem;
}

.item-preview__type {
  margin-top: 5px;
}
</style>
