<template>
  <Page>
    <template #meta>
      <h1 class="exhibition-about__title">{{ english ? 'Situating Cybernetics' : 'Kybernetik Verorten' }}</h1>
    </template>
    <template #content>
      <template v-if="english">
        From 1970 – 1989, Haus der Statistik at Alexanderplatz Berlin operated as the Central Administrative Headquarters for Statistics in the German Democratic Republic (GDR), where information was collected, mined, and analyzed. Through datasets, diagrams, charts, and other visual tools, standards and deviations were determined in order to meticulously plan and control the economy of the socialist republic. The exhibition features works from 1966 until the present, showing how artists have been influenced by cybernetic theories, and have worked to render their bureaucratic and administrative processes in aesthetic terms. The works investigate sites, technologies, and narratives of cybernetics, pointing to their possible meanings for the present.
      </template>
      <template v-else>
        Im Haus der Statistik befand sich von 1970 – 1989 die Staatliche Zentralverwaltung für Statistik der DDR, die Daten erhob und auswertete. Mit Hilfe von Datensätzen, Diagrammen, Tabellen und anderen visuellen Werkzeugen wurden Normwerte und Abweichungen bestimmt, um die sozialistische Volkswirtschaft minutiös zu planen und zu kontrollieren. In der Ausstellung werden Werke von 1966 bis heute präsentiert, die zeigen, wie Künstler*innen von der Kybernetik beeinflusst wurden und bürokratische und administrative Prozesse ästhetisch aufgriffen. Die Arbeiten untersuchen Orte, Technologien und Narrative der Kybernetik und verweisen auf ihre möglichen Bedeutungen für die Gegenwart.
      </template>
    </template>
  </Page>
</template>

<script>
import { getCurrentLocale } from '@/locale';
import Page from '@/components/page';

export default {
  name: 'HDSExhibitionAbout',
  components: {
    Page,
  },
  computed: {
    english() {
      return getCurrentLocale() === 'en';
    },
  },
  mounted() {
    document.title = `${this.$t('home.ausstellung')} - Calculating Control`;
  },
};
</script>

<style scoped>
.exhibition-about__title {
  font-size: inherit;
  margin-top: 0;
}
</style>
