<template>
  <nav class="date-picker">
    <ul class="date-picker__list" :class="{ 'date-picker__list--centered': centered }">
      <li class="date-picker__item">
        <button
          class="date-picker__button blob blob--shadow"
          :class="{
            'blob--green': !selectedTag,
            'blob--pink': selectedTag,
          }"
          @click="pickDate({})"
        >
          {{ $t('datepicker.all') }}
        </button>
      </li>
      <li v-for="date in dates" :key="date.tag" class="date-picker__item">
        <button
          class="date-picker__button blob blob--shadow"
          :class="{
            'blob--green': selectedTag === date.tag,
            'blob--pink': selectedTag !== date.tag,
          }"
          @click="pickDate(date)"
        >
          {{ date.humanReadable }}
        </button>
      </li>
    </ul>
  </nav>
</template>

<script>
import { getTagsFromRoute } from '@/utils';

export default {
  name: 'DatePicker',
  props: {
    dates: {
      type: Array,
      default: () => [],
    },
    centered: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    selectedTag() {
      const tags = getTagsFromRoute(this.$route);
      const dateTag = tags.find(tag => tag.startsWith('date_'));
      return dateTag;
    },
  },
  methods: {
    pickDate(date) {
      const tag = date.tag === this.selectedTag ? null : date.tag;
      const oldTags = getTagsFromRoute(this.$route);
      const tagsWithoutDate = oldTags.filter(tag => !tag.startsWith('date_'));
      const tags = tag ? [...tagsWithoutDate, tag] : tagsWithoutDate;
      this.$router.push({
        query: {
          tags,
        },
      })
    },
  },
}
</script>

<style scoped>
.date-picker {
  height: 100%;
}

.date-picker__list {
  display: flex;
  font-size: var(--font-size-small);
  list-style-type: none;
  padding: 0;
  margin: 0;
  align-items: center;
  height: 100%;
}

.date-picker__list--centered {
  justify-content: center;
}

.date-picker__item + .date-picker__item {
  margin-left: 15px;
}

.date-picker__button {
  cursor: pointer;
  font-size: inherit;
  padding: 15px 15px;
  white-space: nowrap;
}
</style>
