<template>
  <main class="team base-grid">
    <div class="team__back">
      <router-link :to="{ name: 'Home' }" class="team__back-link nav__item nav__item--page">team</router-link>
    </div>
    <section class="team-section team__meta">
      <h1 class="team__title">{{ title }}</h1>
    </section>
    <section class="team-section team__content">
      <div v-if="loading">
        Loading...
      </div>
      <div v-else v-html="content" />
    </section>
  </main>
</template>

<script>
import { getItem } from '@/api';

export default {
  name: 'team',
  props: {
    id: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      default: '',
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
.team {
  grid-template-areas: "a a a b b b"
                       "a a a b b b"
                       "a a a b b b"
                       "c c d d d d";
  min-height: 100vh;
}

.team-section {
  border: solid 2px black;
}

.team__title {
  font-size: var(--font-size-xl);
  margin: 0;
  text-align: justify;
  padding: 0 15px;
}

.team__meta {
  grid-area: a;
}

.team__content {
  font-size: var(--font-size-medium);
  grid-area: b;
  padding: 15px;
}

.team__back {
  position: fixed;
  top: 30%;
  left: calc(100% / 3);
  width: calc(100% / 6);
}

.team__back-link {
  color: inherit;
  position: absolute;
  top: 15vh;
  left: calc(100vw / 6 / 2);
  transform: translateY(-50%) translateX(-50%);
  text-decoration: inherit;
  padding: 7px 35px;
}
</style>

<style>
.team__content p:first-of-type {
  margin-top: 0;
}

.team__content a {
  color: var(--color-prime-pink);
  text-decoration: inherit;
}
</style>
