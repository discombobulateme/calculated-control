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
          From 1970 to 1989, Haus der Statistik operated as the Central Administrative Headquarters for Statistics in the German Democratic Republic (GDR): an institution for the cybernetic regulation of society and everyday life.
        </template>
        <template v-else>
          Von 1970 bis 1989 befand sich im Haus der Statistik die Staatliche Zentralverwaltung für Statistik der Deutschen Demokratischen Republik (DDR): eine Institution, die an der kybernetischen Regulation der Gesellschaft mitwirkte.
        </template>
      </p>
      <p>
        <template v-if="english">
          Working from the site-specific history of Haus der Statistik, Calculating Control explores the impact of cybernetics on artistic and social practices, networks, and technology. Connecting Haus der Statistik with other locations and histories of cybernetic ideals, Calculating Control draws a trajectory from this building to contemporary algorithmic practices and their socio-political effects, many of which mark a crucial point of reference for netart.
        </template>
        <template v-else>
          Ausgehend von der ortsspezifischen Geschichte des Haus der Statistik erforscht Calculating Control die Resonanzen der Kybernetik in künstlerischen und sozialen Praktiken, Netzwerken und Technologien. Calculating Control bringt das Haus der Statistik mit anderen Orten und Geschichten kybernetischer Utopien in Verbindung. Von der Geschichte des Gebäudes wird ein Bogen zu zeitgenössischen algorithmischen Praktiken und ihren gesellschaftspolitischen Auswirkungen gespannt, die insbesondere von der Netzkunst aufgegriffen werden.
        </template>
      </p>
      <p>
        <template v-if="english">
          As an artistic practice of network society, netart traces systems of cybernetic administration and renders their forms visible and subject to revision. Over the duration of 6 months, Calculating Control will unravel cybernetic thinking in the space of two separate exhibitions, a symposium, an unconference, as well as an online journal. These various formats are connected and contextualized by further research material available in the archive section of this site.
        </template>
        <template v-else>
          Als eine künstlerische Praxis der Netzwerkgesellschaft zeichnet die Netzkunst gegenwärtige kybernetische Kontrollmechanismen nach. Über einen Zeitraum von 6 Monaten folgt Calculating Control dem kybernetischen Denken im Rahmen von zwei Ausstellungen, einem Symposium, einer Unconference und einem online Journal. Die verschiedenen Formate werden miteinander verbunden und in dem Archiv auf dieser Seite durch weiteres Forschungsmaterial kontextualisiert.
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
  margin: 30px 0;
  width: 100%;
}

@media screen and (min-width: 768px) {
  .about__back.about__back {
    max-width: 50vw;
  }
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
  padding: 10px 20px 100px;
}

@media screen and (min-width: 768px) {
  .about__content {
    padding: 60px 0 200px;
  }
}

.about__content > * {
  max-width: 900px;
  margin: 0 auto;
  hyphens: auto;
}

.about__large {
  font-size: var(--font-size-xxl);
  text-align: center;
  margin-bottom: 15px;
  max-width: 1300px;
}

.about__large ~ p {
  padding: 0 10px;
  margin-bottom: 25px;
  text-indent: 1ch;
}

@media screen and (min-width: 768px) {
  .about__large {
    margin-bottom: 45px;
  }

  .about__large ~ p {
    text-indent: 3ch;
  }
}
</style>
