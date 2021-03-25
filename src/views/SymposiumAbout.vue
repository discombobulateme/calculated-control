<template>
  <Page>
    <template #meta>
      <h1 class="symposium-about__title">{{ english ? 'Between Techno-Euphoria and Regimes of Surveillance' : 'Zwischen Technikeuphorie und Überwachungsregime' }}</h1>
    </template>
    <template #content>
      <template v-if="english">
        The location and architecture of Haus der Statistik demonstrates the two-sided nature of the science of cybernetics: On the one hand, the potential of a new organizational model, and on the other, the risks associated with its use as a powerful instrument for surveillance and control. These ambivalent uses of cybernetics are explored in examples from the socialist political regimes of the past as well as the capitalist network society of today. A second focus of the symposium is the consideration of netart and its aesthetic expressions that reflect the cybernetic conditions of the internet, while also being dependent on them.
      </template>
      <template v-else>
        An der Verortung und Architektur des Haus der Statistik lassen sich zwei Seiten der Kybernetik ablesen — das erhoffte Potential eines neuen Organisationsmodells und die Gefahr eines Machtwerkzeugs zur Überwachung und Kontrolle. Dieser Doppelcharakter der Kybernetik wird sowohl an Beispielen aus historischen sozialistischen Staatsanordnungen als auch aus der gegenwärtigen kapitalistischen Netzwerkgesellschaft untersucht. Einen weiteren Schwerpunkt des Symposiums bildet die Netzkunst, die als ein ästhetischer Ausdruck der Netzwerkgesellschaft, die kybernetischen Bedingungen des Internets reflektiert, während sie selbst diesen unterliegt.
      </template>
    </template>
  </Page>
</template>

<script>
import { getCurrentLocale } from '@/locale';
import Page from '@/components/page';

export default {
  name: 'SymposiumAbout',
  components: {
    Page,
  },
  computed: {
    english() {
      return getCurrentLocale() === 'en';
    },
  },
  mounted() {
    document.title = `${this.$t('home.symposium')} - Calculating Control`;
  },
};
</script>

<style scoped>
.symposium-about__title {
  font-size: inherit;
  margin-top: 0;
}
</style>
