<template>
  <main class="page">
    <div class="page__back">
      <router-link :to="{ name: 'Home' }" class="page__back-link">
        calculating control:<br/>
        (netz)kunst und kybernetik<br/>
      </router-link>
    </div>
    <div v-if="loading">
      Loading...
    </div>
    <section v-else v-html="content" class="page__content" />
  </main>
</template>

<script>
import { getItem } from '@/api';

export default {
  name: 'About',
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  data: () => ({
    loading: false,
    content: '',
  }),
  created() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      this.loading = true;
      const { data: { note } } = await getItem({ key: this.id });
      this.content = note;
      this.loading = false;
    },
  },
};
</script>

<style scoped>
.page {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  overflow: scroll;
  text-align: center;
  z-index: 3;
}

.page__back {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.page__back-link {
  background-color: var(--color-prime-pink);
  border-radius: var(--border-radius);
  display: inline-flex;
  font-size: var(--font-size-large);
  color: var(--color-prime-green);
  padding: 20px;
  text-decoration: inherit;
  text-align: center;
}

.page__content {
  font-size: 1.5rem;
  max-width: 1500px;
  margin: 10px auto;
  padding: 0 10px;
  text-align: center;
}

@media screen and (min-width: 768px) {
  .page__back {
    height: 30vh;
    width: 50vw;
  }

  .page__content {
    font-size: 3.5vw;
  }
}
</style>
