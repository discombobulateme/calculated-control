<template>
  <main class="archive-about base-grid">
    <section class="archive-about-section archive-about__close">
      <CloseButton class="archive-about__close-button" @click="close" />
    </section>
    <section class="archive-about-section archive-about__meta">
      <h1 class="archive-about__title">About the Archive</h1>
    </section>
    <section class="archive-about-section archive-about__content">
      Suas intellegebat eu mea, at est dicta assentior vituperatoribus, aperiam habemus vivendum usu no. Pri ex mucius ocurreret. Suas intellegebat eu mea, at est dicta assentior vituperatoribus, aperiam habemus. Suas intellegebat eu mea, at est dicta assentior vituperatoribus, aperiam habemus vivendum usu no. Pri ex mucius ocurreret. Suas intellegebat eu mea, at est dicta assentior vituperatoribus, aperiam habemus vivendum usu no. Pri ex mucius ocurreret. Suas intellegebat eu mea, at est dicta assentior vituperatoribus, aperiam habemus. Suas intellegebat eu mea, at est dicta assentior vituperatoribus, aperiam Suas intellegebat eu mea, at est dicta assentior vituperatoribus, aperiam habemus vivendum usu no. Pri ex mucius ocurreret. Suas intellegebat eu mea, at est d
    </section>
  </main>
</template>

<script>
import CloseButton from '@/components/close-button';

export default {
  name: 'ArchiveAbout',
  components: {
    CloseButton,
  },
  methods: {
    close() {
      this.$router.go(-1);
    },
  },
};
</script>

<style scoped>
.archive-about {
  background: var(--color-prime-light-grey);
  font-size: var(--font-size-medium-small);
  min-height: 100vh;
  padding: 10px 15px;
}

@media screen and (min-width: 768px) {
  .archive-about {
    display: grid;
    grid-template-areas: "side side main main x close";
    grid-template-rows: 1fr;
  }

  .archive-about__meta {
    grid-area: side;
  }

  .archive-about__content {
    grid-area: main;
  }

  .archive-about__close {
    grid-area: close;
  }
}

.archive-about__title {
  font-size: inherit;
  margin-top: 0;
}

.archive-about__close-button {
  float: right;
}
</style>
