<template>
  <div class="archive-tags">
    <CloseButton
      class="archive-tags__close blob--green"
      @click="$emit('close', $event)"
    ></CloseButton>
    <button class="archive-tags__reset" type="button" @click="reset">
      {{ $t('archive.tags.reset') }}
    </button>
    <form class="archive-tags__content" @submit.prevent="() => {}">
      <section class="archive-tags__list archive-tags__list--primary" aria-label="Primary tags">
        <label
          v-for="primaryTag in primaryTags"
          :key="primaryTag"
          :class="{
            blob: true,
            'blob--shadow': true,
            'blob--pink': true,
            'archive-tags__item': true,
            'archive-tags__item--disabled': !isSelected(primaryTag) && isDisabled(primaryTag),
          }"
        >
          <input
            class="archive-tags__input"
            name="tag"
            type="checkbox"
            :value="primaryTag"
            v-model="selectedTags"
          />
          {{ $t(`tags.${primaryTag.toLowerCase()}`) }}
          <Checkmark v-if="isSelected(primaryTag)" class="archive-tags__icon archive-tags__icon--select" role="presentation"/>
          <Deselect v-if="isSelected(primaryTag)" class="archive-tags__icon archive-tags__icon--deselect" role="presentation"/>
        </label>
      </section>
      <section class="archive-tags__list archive-tags__list--curated" aria-label="curated tags">
        <label
          v-for="curatedTag in curatedTags"
          :key="curatedTag"
          :class="{
            blob: true,
            'blob--shadow': true,
            'archive-tags__item': true,
            'archive-tags__item--disabled': !isSelected(curatedTag) && isDisabled(curatedTag),
          }"
        >
          <input
            class="archive-tags__input"
            name="tag"
            type="checkbox"
            :value="curatedTag"
            v-model="selectedTags"
          />
          {{ $t(`tags.${curatedTag.toLowerCase()}`) }}
          <Checkmark v-if="isSelected(curatedTag)" class="archive-tags__icon archive-tags__icon--select" role="presentation"/>
          <Deselect v-if="isSelected(curatedTag)" class="archive-tags__icon archive-tags__icon--deselect" role="presentation"/>
        </label>
      </section>
    </form>
    <button
      class="blob blob--green blob--shadow archive-tags__submit"
      @click="$emit('close', $event)"
    >
      <Loader v-if="loading" />
      <span v-else>{{ totalResults }} {{ totalResults === 1 ? $t('archive.tags.result') : $t('archive.tags.results') }}</span>
    </button>
  </div>
</template>

<script>
import debounce from 'lodash.debounce';

import CloseButton from '@/components/close-button';
import Checkmark from '@/components/icons/check';
import Deselect from '@/components/icons/deselect';
import Loader from '@/components/icons/loader';
import { primaryTags, curatedTags } from '@/tags.js';
import { getTagsFromRoute, caseInsensitiveIncludes } from '@/utils.js';

const DEBOUNCE_WAIT = 1000;

export default {
  name: 'ArchiveTags',
  components: {
    Checkmark,
    CloseButton,
    Deselect,
    Loader,
  },
  props: {
    totalResults: {
      type: Number,
      default: 0,
    },
    availableTags: {
      type: [Array, null],
      default: null,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  data: ({ $route }) => ({
    selectedTags: getTagsFromRoute($route),
  }),
  watch: {
    selectedTags(newTags, oldTags) {
      if (newTags.length !== oldTags.length || !newTags.every(tag => oldTags.includes(tag))) {
        this.search();
      }
    },
    $route() {
      const routeTags = getTagsFromRoute(this.$route);
      if (routeTags.length !== this.selectedTags.length || !routeTags.every(t => this.selectedTags.includes(t))) {
        this.selectedTags = routeTags;
      }
    },
  },
  mounted() {
    this.selectedTags = getTagsFromRoute(this.$route);
  },
  created() {
    this.search = debounce(() => {
      const query = {};
      if (this.selectedTags) query.tags = Array.from(this.selectedTags);
      if (this.$route.query.q) query.q = this.$route.query.q;
      this.$router.push({
        path: '/archive',
        query: query,
      });
    }, DEBOUNCE_WAIT);
  },
  computed: {
    primaryTags() {
      return primaryTags;
    },
    curatedTags() {
      return curatedTags;
    },
  },
  methods: {
    isSelected(tag) {
      return caseInsensitiveIncludes(this.selectedTags, tag);
    },
    isDisabled(tag) {
      return this.availableTags && !this.availableTags.includes(tag.toLowerCase());
    },
    reset() {
      this.selectedTags = [];
    },
  },
}
</script>

<style scoped>
.archive-tags {
  font-size: var(--font-size-medium);
  overflow: hidden;
  overscroll-behavior: contain;
  height: 100vh;
  padding: 15px;
  position: relative;
}

@media screen and (min-width: 768px) {
  .archive-tags {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
}

.archive-tags__content {
  display: grid;
  gap: 15px;
  width: 100%;
  margin-top: 50px;
}

@media screen and (min-width: 768px) {
  .archive-tags__content {
    grid-template-columns: 1fr 1fr;
    height: 100%;
  }
}

.archive-tags__list {
  list-style-type: none;
  height: 100%;
  margin: 0;
  padding: 0;
}

.archive-tags__list--primary {
  display: flex;
  flex-direction: column;
  justify-content: stretch;
}

.archive-tags__list--curated {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-auto-rows: 65px;
  gap: 10px;
}

.archive-tags__item {
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  height: min-content;
  padding: 15px;
}

.archive-tags__item--disabled {
  pointer-events: none;
  opacity: 0.5;
}

.archive-tags__list--primary .archive-tags__item {
  flex-grow: 1;
}

.archive-tags__list--primary .archive-tags__item + .archive-tags__item {
  margin-top: 10px;
}

.archive-tags__input {
  appearance: none;
  height: 0;
  margin: 0;
  opacity: 0;
  width: 0;
}

.archive-tags__close {
  position: absolute;
  top: 15px;
  right: 15px;
  z-index: 2;
}

.archive-tags__reset {
  font-size: var(--font-size-xs);
  background: none;
  border: none;
  color: inherit;
}

.archive-tags__submit {
  color: inherit;
  cursor: pointer;
  font-size: var(--font-size-xs);
  padding: 15px;
  width: 100%;
  margin-top: 40px;
}

.archive-tags__icon {
  display: inline-block;
  margin-left: 15px;
}

.archive-tags__icon--deselect {
  display: none;
}

.archive-tags__item:hover .archive-tags__icon--select {
  display: none;
}

.archive-tags__item:hover .archive-tags__icon--deselect {
  display: block;
}
</style>
