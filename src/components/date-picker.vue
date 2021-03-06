<template>
  <nav class="date-picker">
    <ul class="date-picker__list" :class="{ 'date-picker__list--centered': centered }">
      <li v-if="reset" class="date-picker__item">
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
      <li v-if="exhibitionNav" class="date-picker__item">
        <a
          class="date-picker__button blob blob--shadow blob--pink"
          href="https://cc.common.garden/"
          target="_blank"
          rel="noopener"
        >
          online 02/05 - 03/10
          <ExternalIcon />
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
import { getTagsFromRoute } from '@/utils';
import ExternalIcon from '@/components/icons/external';

export default {
  name: 'DatePicker',
  components: {
    ExternalIcon,
  },
  props: {
    dates: {
      type: Array,
      default: () => [],
    },
    centered: {
      type: Boolean,
      default: true,
    },
    reset: {
      type: Boolean,
      default: true,
    },
    defaultOption: {
      type: String,
      default: '',
    },
    exhibitionNav: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    selectedTag() {
      const tags = getTagsFromRoute(this.$route);
      const dateTag = tags.find(tag => tag.startsWith('date_'));
      return dateTag || this.defaultOption;
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
  font-size: var(--font-size-xs);
  list-style-type: none;
  padding: 0;
  margin: 0;
  align-items: center;
  height: 100%;
}

@media screen and (min-width: 768px) {
  .date-picker__list {
    align-items: center;
    justify-content: center;
  }
}

.date-picker__list--centered {
  align-items: center;
  justify-content: center;
}

.date-picker__item + .date-picker__item {
  margin-left: 15px;
}

.date-picker__button {
  cursor: pointer;
  font-size: inherit;
  font-family: inherit;
  padding: 9px 20px;
  white-space: nowrap;
}

.arrow-link {
  height: 0.55em;
}
</style>
