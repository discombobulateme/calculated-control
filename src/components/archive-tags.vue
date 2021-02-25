<template>
  <div class="archive-tags">
    <CloseButton
      class="archive-tags__close"
      @click="$emit('close', $event)"
    >
      Close
    </CloseButton>
    <button class="archive-tags__reset">reset all categories</button>
    <div class="archive-tags__content">
      <ul class="archive-tags__list archive-tags__list--primary" aria-label="Primary tags">
        <li v-for="primaryTag in primaryTags" :key="primaryTag" class="archive-tags__item">
          #{{ primaryTag }}
        </li>
      </ul>
      <ul class="archive-tags__list archive-tags__list--curated" aria-label="curated tags">
        <li v-for="curatedTag in curatedTags" :key="curatedTag" class="archive-tags__item">
          #{{ curatedTag }}
        </li>
      </ul>
    </div>
    <button
      class="archive-tags__submit"
      @click="$emit('close', $event)"
    >
      show {{ totalResults }} results
    </button>
  </div>
</template>

<script>
import CloseButton from '@/components/close-button';
import { primaryTags, curatedTags } from '@/tags.js';

export default {
  name: 'ArchiveTags',
  components: {
    CloseButton,
  },
  props: {
    totalResults: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    primaryTags() {
      return primaryTags;
    },
    curatedTags() {
      return curatedTags;
    },
  }
}
</script>

<style scoped>
.archive-tags {
  font-size: var(--font-size-large);
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
  height: 100%;
  gap: 15px;
  width: 100%;
}

@media screen and (min-width: 768px) {
  .archive-tags__content {
    grid-template-columns: 1fr 1fr;
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
  grid-template-rows: min-content;
  gap: 10px;
}

.archive-tags__item {
  background: var(--color-prime-light-grey);
  border-radius: var(--border-radius);
  display: flex;
  filter: drop-shadow(2px 2px 12px rgba(0, 0, 0, 0.25));
  justify-content: center;
  align-items: center;
  height: min-content;
  padding: 15px;
}

.archive-tags__list--primary .archive-tags__item {
  background: var(--color-prime-pink);
  flex-grow: 1;
}

.archive-tags__list--primary .archive-tags__item + .archive-tags__item {
  margin-top: 10px;
}

.archive-tags__close {
  position: absolute;
  top: 0;
  right: 0;
}

.archive-tags__reset {
  cursor: pointer;
  background: none;
  border: none;
  font: inherit;
  color: inherit;
}

.archive-tags__submit {
  background: var(--color-prime-green);
  border: none;
  border-radius: var(--border-radius);
  color: inherit;
  cursor: pointer;
  filter: drop-shadow(2px 2px 12px rgba(0, 0, 0, 0.25));
  font: inherit;
  padding: 15px;
  width: 100%;
  margin-top: 40px;
}
</style>
