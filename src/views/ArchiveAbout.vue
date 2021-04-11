<template>
  <Page>
    <template #meta>
      <h1 class="archive-about__title">{{ $t('archive.about') }}</h1>
    </template>
    <template #content>
      <template v-if="english">
        <p>In the former GDR, systems for statistical data collection and analysis reflected the underlying social, political, and economic realities of the state: technologically advanced in their novel approaches to information management, and filled with utopian aspirations.</p>
        <p>The Zentrum für Netzkunst, temporarily housed in the Haus der Statistik, the erstwhile epicenter of data administration in Berlin, presents a living archive of this site that also doubles as a platform for activities, projects, and symposia related to the building and its former operational structures.</p>
        <p>The content of this website changes in real-time by (mis)using Zotero: a management software that is primarily deployed in the scholarly community for the collection of research material. As a result, the idiosyncratic constructions of the database, its particularities, including its dysfunctionalities, imprint themselves into the website’s architecture. By essentially creating the structure through navigating the site, users are able to explore this online space while remaining aware of the urgent questions facing the field of data mining, statistics, and their widespread uses today.</p>
        <p>
          Interface Programming by <a class="link" target="_blank" rel="noopener" href="https://www.fiala.space/">Jakub Fiala</a><br>
          Information Architecture by <a class="link" target="_blank" rel="noopener" href="http://annaluiselorenz.com/">Anna-Luise Lorenz</a>
        </p>
      </template>
      <template v-else>
        <p>In der früheren DDR waren die Systeme der statistischen Datenerfassung und -auswertung ein Spiegelbild der gesellschaftlichen, politischen und wirtschaftlichen Realitäten des Staates: technologisch fortschrittlich in ihren neuartigen Ansätzen des Informationsmanagements und voller utopischer Hoffnungen.</p>
        <p>Das Zentrum für Netzkunst, das vorübergehend im Haus der Statistik, dem ehemaligen Epizentrum der Datenverwaltung in Berlin, untergebracht ist, präsentiert ein lebendiges Archiv dieses Ortes, das auch als Plattform für Aktivitäten, Projekte und Symposien dient, die sich auf das Gebäude und seine ehemaligen Betriebsstrukturen beziehen.</p>
        <p>Der Inhalt dieser Website verändert sich in Echtzeit durch die (Fehl-)Verwendung von Zotero: einer Verwaltungssoftware, die vor allem in der wissenschaftlichen Community für die Sammlung von Forschungsmaterial eingesetzt wird. Infolgedessen prägen sich die idiosynkratischen Konstruktionen der Datenbank, ihre Besonderheiten, einschließlich ihrer Dysfunktionalitäten, in die Architektur der Website ein. Indem die Struktur im Wesentlichen durch die Navigation auf der Website geschaffen wird, können die Benutzer diesen Online-Raum erkunden und sich dabei der dringenden Fragen bewusst sein, denen sich das Feld des Data Mining, der Statistik und ihrer weit verbreiteten Nutzung heute gegenüber sieht.</p>
        <p>
          Interface-Programmierung von <a class="link" target="_blank" rel="noopener" href="https://www.fiala.space/">Jakub Fiala</a><br>
          Informationsarchitektur von <a class="link" target="_blank" rel="noopener" href="http://annaluiselorenz.com/">Anna-Luise Lorenz</a>
        </p>
      </template>
    </template>
  </Page>
</template>

<script>
import { getCurrentLocale } from '@/locale';
import Page from '@/components/page';

export default {
  name: 'ArchiveAbout',
  components: {
    Page,
  },
  computed: {
    english() {
      return getCurrentLocale() === 'en';
    },
  },
  mounted() {
    document.title = `${this.$t('archive.title')} - Calculating Control`;
  },
};
</script>

<style scoped>
.archive-about__title {
  font-size: inherit;
  margin-top: 0;
}
</style>
