<template>
  <div :class="{
      'archive-about': true,
      'archive-about--collapsed': aboutCollapsed,
      'archive-about--expanded': aboutExpanded,
      'archive-about--node': primary,
    }"
    @click="aboutExpanded = true, aboutCollapsed = false"
  >
    <h2 class="archive-about__title">About the archive</h2>
    <div class="archive-about__content">
      Suas intellegebat eu mea, at est dicta assentior vituperatoribus, aperiam habemus vivendum usu no. Pri ex mucius ocurreret. Suas intellegebat eu mea, at est dicta assentior vituperatoribus, aperiam habemus. Suas intellegebat eu mea, at est dicta assentior vituperatoribus, aperiam habemus vivendum usu no. Pri ex mucius ocurreret. Suas intellegebat eu mea, at est dicta assentior vituperatoribus, aperiam habemus...
    </div>
    <CloseButton
      class="archive-about__close"
      @click.stop="aboutExpanded = false, aboutCollapsed = true"
    >
      Close
    </CloseButton>
  </div>
</template>

<script>
import CloseButton from '@/components/close-button';

export default {
  name: 'ArchiveAbout',
  components: {
    CloseButton,
  },
  props: {
    primary: {
      type: Boolean,
      default: false,
    }
  },
  data: () => ({
    aboutCollapsed: false,
    aboutExpanded: false,
  }),
  created() {
    const scrollHandler = () => {
      this.aboutCollapsed = true;
      window.removeEventListener('scroll', scrollHandler);
    };
    window.addEventListener('scroll', scrollHandler);
  }
}
</script>

<style scoped>
.archive-about {
  display: grid;
  background: var(--color-prime-green);
  height: 30vh;
  transition: transform 500ms, height 500ms;
  overflow: hidden;
  position: relative;
}

.archive-about::after {
  content: '';
  display: block;
  background: linear-gradient(180deg, rgba(220, 182, 189, 0) 0%, #DCB6BD 99.99%, #DCB6BD 100%);
  width: 100%;
  height: 120px;
  position: absolute;
  bottom: 0;
}

.archive-about--collapsed {
  height: 50px;
}

.archive-about--expanded {
  height: 100vh;
  overflow: scroll;
  overscroll-behavior: contain;
}

.archive-about--node {
  background: var(--color-prime-pink);
}

.archive-about--collapsed::after,
.archive-about--expanded::after {
  transform: translateY(100%);
}

@media screen and (min-width: 768px) {
  .archive-about {
    grid-template-columns: 1fr 1fr;
  }
}

.archive-about__title {
  font-size: var(--font-size-large);
  margin: 0;
  padding: 5px 15px;
}

.archive-about__content {
  font-size: var(--font-size-large);
  padding: 5px 15px;
  opacity: 1;
  transition: opacity 500ms;
}

.archive-about--collapsed .archive-about__content {
  opacity: 0;
}

.archive-about__close {
  display: none;
  position: absolute;
  top: 0;
  right: 0;
}

.archive-about--expanded .archive-about__close {
  display: block;
}
</style>
