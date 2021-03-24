<template>
  <main>
    <SiteNav :blurred="true"/>
    <section class="about__content">
      <div class="about__back">
        <router-link :to="{ name: 'Home' }" class="blob blob--green about__back-link">
          Calculating Control:<br/>
          (Netz)Kunst und Kybernetik<br/>
        </router-link>
      </div>
      <p class="about__large">
        <template v-if="english">
          The calculative management of the unknown via algorithms, big data or predictive methods has not only nurtured utopian visions on governing complex systems, but also exposed the fissures of informational capitalism.
        </template>
        <template v-else>
          The calculative management of the unknown via algorithms, big data or predictive methods has not only nurtured utopian visions on governing complex systems, but also exposed the fissures of informational capitalism.
        </template>
      </p>
      <p>
        <template v-if="english">
          Taking Haus der Statistik as a starting point, Calculating Control draws a critical and poetic trajectory from historic perspectives on the role of cyberneticsc in the former GDR towards the sociopolitical effects of contemporary algorithmic practices within a networked society. Over the duration of 6 months Zentrum für Netzkunst will explore the topics and its effects on the arts in an exhibition, a symposium and a conference as well as a series of essays.
        </template>
        <template v-else>
          Taking Haus der Statistik as a starting point, Calculating Control draws a critical and poetic trajectory from historic perspectives on the role of cyberneticsc in the former GDR towards the sociopolitical effects of contemporary algorithmic practices within a networked society. Over the duration of 6 months Zentrum für Netzkunst will explore the topics and its effects on the arts in an exhibition, a symposium and a conference as well as a series of essays.
        </template>
      </p>
    </section>
  </main>
</template>

<script>
import { getCurrentLocale } from '@/locale';
import SiteNav from '@/components/site-nav';

export default {
  name: 'About',
  components: {
    SiteNav,
  },
  computed: {
    english() {
      return getCurrentLocale() === 'en';
    },
  },
};
</script>

<style scoped>
.about__back.about__back {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 80px 0;
  max-width: 50vw;
  width: 100%;
}

.about__back-link {
  display: inline-flex;
  font-size: var(--font-size-large);
  padding: 20px;
  text-decoration: inherit;
  text-align: center;
}

.about__content {
  font-size: var(--font-size-large);
  letter-spacing: -0.25px;
  position: absolute;
  top: 0;
  width: 100%;
  padding: 0 60px;
}

.about__content > * {
  max-width: 900px;
  margin: 0 auto;
}

.about__large {
  font-size: var(--font-size-xxl);
  text-align: center;
  margin-bottom: 45px;
  max-width: 1300px;
}
</style>
