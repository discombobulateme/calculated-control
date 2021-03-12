<template>
  <header :class="{
      'archive-header': true,
      'archive-header--node': isPrimaryNode,
    }"
  >
    <div class="archive-header__text">
      <h2 class="archive-header__title">calculating:control</h2>
      <div class="archive-header__meta">
        <span>{{ node || $t('archive.title') }}</span> ({{ totalResults }})
      </div>
    </div>
    <div class="archive-header__center">
      <slot />
    </div>
    <nav class="archive-header__home">
      <div
        class="archive-header__lang blob blob--shadow"
        :class="{
          'blob--pink': isPrimaryNode,
          'blob--green': !isPrimaryNode,
        }">
        <LanguageSwitch class="archive-header__lang-switch" />
      </div>
      <HomeButton
        :class="{
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
import LanguageSwitch from '@/components/language-switch';

export default {
  name: 'ArchiveHeader',
  components: {
    HomeButton,
    LanguageSwitch,
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
  height: 80px;
  transition: transform 500ms, height 500ms;
  overflow: hidden;
  padding: 5px 15px;
  position: relative;
}

@media screen and (min-width: 768px) {
  .archive-header {
    display: flex;
  }
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

.archive-header__center {
  flex-grow: 1;
}

.archive-header__home {
  margin-right: 0;
  margin-left: auto;
  margin-top: 5px;
  margin-bottom: 5px;
  display: flex;
}

.archive-header__lang {
  cursor: pointer;
  display: flex;
  margin-right: 15px;
}

.archive-header__lang-switch {
  width: 100%;
  height: 100%;
  padding: 15px 35px;
  line-height: 1;
}
</style>
