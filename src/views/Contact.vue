<template>
  <main class="contact base-grid">
    <div class="contact__back">
      <router-link :to="{ name: 'Home' }" class="contact__back-link nav__item nav__item--page">contact</router-link>
    </div>
    <section class="contact-section contact__meta">
      <h1 class="contact__title">{{ title }}</h1>
    </section>
    <section class="contact-section contact__content">
      <div v-if="loading">
        Loading...
      </div>
      <div v-else v-html="content" />
    </section>
    <section class="contact__imprint">
      <router-link :to="{ name: 'Imprint' }" class="contact__imprint-link">imprint</router-link>
    </section>
    <section class="contact-section contact__newsletter">
      <router-link :to="{ name: 'Newsletter' }" class="contact__newsletter-link">newsletter</router-link>
    </section>
  </main>
</template>

<script>
import { getItem } from '@/api';

export default {
  name: 'contact',
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
.contact {
  grid-template-areas: "a a a b b b"
                       "d d d b b b"
                       "d d d b b b"
                       "d d d c c c";
  min-height: 100vh;
}

.contact-section {
  border: solid 2px black;
}

.contact__title {
  font-size: var(--font-size-xl);
  margin: 0;
  text-align: justify;
  padding: 0 15px;
}

.contact__meta {
  grid-area: a;
}

.contact__content {
  font-size: var(--font-size-medium);
  grid-area: b;
  padding: 15px;
}

.contact__back {
  position: fixed;
  top: 90%;
  left: calc(100% / 3);
  width: calc(100% / 6);
}

.contact__back-link {
  color: inherit;
  position: absolute;
  top: 5vh;
  left: calc(100vw / 6 / 2);
  transform: translateY(-50%) translateX(-50%);
  text-decoration: inherit;
  padding: 7px 35px;
}

.contact__imprint {
  grid-area: d;
}

.contact__imprint-link {
  background: var(--color-prime-pink);
  border-radius: var(--border-radius);
  color: inherit;
  display: flex;
  font-size: var(--font-size-large);
  justify-content: center;
  align-items: center;
  text-decoration: inherit;
  width: 100%;
  height: 100%;
}

.contact__newsletter {
  grid-area: c;
}
</style>

<style>
.contact__content p:first-of-type {
  margin-top: 0;
}

.contact__content a {
  color: var(--color-prime-pink);
  text-decoration: inherit;
}
</style>
