<template>
  <Page>
    <template #meta>
      <h1 class="journal-about__title">{{ english ? 'Accuracy and Obsession' : 'Akribie und Obsession' }}</h1>
    </template>
    <template #content>
      <template v-if="english">
        Cybernetic control is achieved through accuracy, meticulousness, and a constant striving for perfection. Social processes are broken down into manageable parts, measured, and evaluated in order to regulate them by targeted readjustment. The authors of the online journal examine concrete practices, technologies, and materials of cybernetic control. The essays will be published on the project website from May to July.
      </template>
      <template v-else>
        Kybernetische Kontrolle wird durch Genauigkeit, Akribie und einem beständigen Streben nach Perfektion erlangt. Um gesellschaftliche Prozesse durch zielgerichtetes Nachjustieren zu regulieren, werden sie in überschaubare Einzelteile zerlegt, gemessen und bewertet. Die Autor*innen des online Journals untersuchen konkrete Praktiken, Technologien und Materialien der kybernetischen Kontrolle. Die Essays werden von Mai bis Juli auf der Projektwebsite veröffentlicht.
      </template>
    </template>
  </Page>
</template>

<script>
import { getCurrentLocale } from '@/locale';
import Page from '@/components/page';

export default {
  name: 'JournalAbout',
  components: {
    Page,
  },
  computed: {
    english() {
      return getCurrentLocale() === 'en';
    },
  },
};
</script>

<style scoped>
.journal-about__title {
  font-size: inherit;
  margin-top: 0;
}
</style>
