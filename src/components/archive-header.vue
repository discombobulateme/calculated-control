<template>
  <header :class="{
      'archive-header': true,
      'archive-header--node': isPrimaryNode,
    }"
  >
    <h2 class="archive-header__title">calculated:control</h2>
    <div class="archive-header__meta">
      <span>{{ node || 'archive' }}</span> ({{ totalResults }})
    </div>
    <nav class="archive-header__home">
      <HomeButton
        :class="{
          'archive-header__home-link': true,
          'blob--pink': isPrimaryNode,
          'blob--green': !isPrimaryNode,
        }"
        aria-label="Home"
      />
    </nav>
  </header>
</template>

<script>
import { primaryTags } from '@/tags';
import HomeButton from '@/components/home-button';

export default {
  name: 'ArchiveHeader',
  components: {
    HomeButton,
  },
  props: {
    node: {
      type: String,
      default: '',
    },
    totalResults: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    isPrimaryNode() {
      return primaryTags.includes(this.node);
    },
  },
}
</script>

<style scoped>
.archive-header {
  display: grid;
  background: var(--color-prime-green);
  font-size: var(--font-size-large);
  height: 100px;
  transition: transform 500ms, height 500ms;
  overflow: hidden;
  padding: 5px 15px;
  position: relative;
}

.archive-header--node {
  background: var(--color-prime-pink);
}

.archive-header__title {
  font-size: inherit;
  margin: 0;
}

.archive-header__meta {
  color: var(--color-prime-olive-half);
}

.archive-header__home {
  position: absolute;
  top: 15px;
  right: 15px;
}
</style>
