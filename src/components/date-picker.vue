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
          href="https://netzkunst.berlin/online-ausstellung"
          target="_blank"
          rel="noopener"
        >
          online 01/05 - 03/10
          <ExternalIcon />
        </a>
      </li>
      <li v-if="exhibitionNav" class="date-picker__item">
        <a
          class="date-picker__button blob blob--shadow blob--green"
          href="https://calendly.com/zfnk/cc?month=2021-04"
          target="_blank"
          rel="noopener"
        >
          book time slot
          <ExternalIcon />
        </a>
      </li>
    </ul>
    <ul>
      <section v-if="exhibitionNav" class="visit__notice">
        <template v-if="english">
          COVID-19<br>
          Due to the nationwide lockdown, the exhibition in Haus Der Statistik will remain closed. Proxy Tours will be available for those who book a time slot. Tours are in either English or German, and will take approximately 30 minutes.<br>
        </template>
        <template v-else>
          COVID-19<br>
          Wegen der bundesweiten Notbremse wird die Ausstellung vor Ort im Haus Der Statistik geschlossen bleiben. Es können Zeitfenster für Proxy Tours gebucht werden. Die online Touren finden auf Englisch oder Deutsch statt und dauern circa 30 Minuten.<br>
        </template>
      </section>
    </ul>
  </nav>
</template>

<script>
import { getCurrentLocale } from '@/locale';
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
    english() {
      return getCurrentLocale() === 'en';
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

.visit__notice {
  background: var(--color-prime-green);
  border: solid 1px black;
  font-size: var(--font-size-xs);
  text-align: center;
  padding: 15px 0;
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
