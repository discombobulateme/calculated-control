<template>
  <main class="page base-grid">
    <section class="page-section page__close">
      <CloseButton class="page__close-button" @click="close" />
    </section>
    <section class="page-section page__meta">
      <slot name="meta" />
    </section>
    <section class="page-section page__content">
      <slot name="content" />
    </section>
  </main>
</template>

<script>
import CloseButton from '@/components/close-button';

export default {
  name: 'Page',
  components: {
    CloseButton,
  },
  mounted() {
    document.body.scrollIntoView();
  },
  methods: {
    close() {
      this.$router.go(-1);
    },
  },
};
</script>

<style scoped>
.page {
  background: var(--color-prime-light-grey);
  font-size: var(--font-size-medium-small);
  min-height: 100vh;
  padding: 10px 15px;
}

.page__close {
  position: sticky;
  top: 15px;
  padding-bottom: 15px;
}

@media screen and (min-width: 768px) {
  .page {
    display: grid;
    grid-template-columns: 1fr 2fr 1fr;
    grid-template-areas: "side main close";
    grid-template-rows: 1fr;
    gap: 20px;
  }

  .page__meta {
    grid-area: side;
  }

  .page__content {
    grid-area: main;
  }

  .page__close {
    grid-area: close;
  }
}

.page__close-button {
  margin-left: auto;
}
</style>
