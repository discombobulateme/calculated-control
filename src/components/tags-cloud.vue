<template>
  <ul class="tags-cloud">
    <li
      v-for="(tag, index) in shownTags"
      :key="tag"
      :class="{ 'blob--pink': isPrimary(tag) }"
      :style="{
        top: `${(index + 1) * 10}vh`,
        left: `${horizontalDistribution[index] || 50}vw`,
      }"
      class="tags-cloud__item blob blob--shadow"
      @click="$emit('click', tag)"
    >
      {{ $te(`tags.${tag.toLowerCase()}`) ? $t(`tags.${tag.toLowerCase()}`) : tag }}
      <Deselect v-if="deselectable" class="tags-cloud__item-deselect" />
    </li>
  </ul>
</template>

<script>
import { primaryTags } from '@/tags';
import Deselect from '@/components/icons/deselect';

const horizontalDistribution = [
  12, 68, 32, 60, 45, 60, 24, 76, 5
];

export default {
  name: 'TagsCloud',
  components: {
    Deselect
  },
  props: {
    tags: {
      type: Array,
      default: () => [],
    },
    deselectable: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    horizontalDistribution() {
      return horizontalDistribution;
    },
    shownTags() {
      return this.tags.filter(tag => !tag.startsWith('date_') && !tag.startsWith('id_') && !tag.startsWith('lang_'));
    },
  },
  methods: {
    isPrimary(tag) {
      return primaryTags.includes(tag.toLowerCase());
    }
  }
}
</script>

<style scoped>
.tags-cloud {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.tags-cloud__item {
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  line-height: 1;
  padding: 10px 70px;
  position: absolute;
  z-index: 3;
}

.tags-cloud__item-deselect {
  opacity: 0;
  height: 20px;
  right: 10px;
  position: absolute;
}

.tags-cloud__item:hover .tags-cloud__item-deselect {
  opacity: 1;
}

@media screen and (min-width: 768px) {
  .tags-cloud__item-deselect {
    height: 36px;
  }
}
</style>
