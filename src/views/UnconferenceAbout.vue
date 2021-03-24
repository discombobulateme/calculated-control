<template>
  <Page>
    <template #meta>
      <h1 class="unconference-about__title">
        {{ english ? 'Embodied Cybernetics in Everyday Life (Mimetics, Empathy and Hacking)' : 'Verkörperte Kybernetik im Alltag (Mimetik, Empathie und Hacking)' }}
      </h1>
    </template>
    <template #content>
      <template v-if="english">
        Taking up the cybernetic logic of self-regulating systems, the unconference is a collective, collaborative, indisciplinary, and multi-perspectival summit that aims to produce embodied knowledge about statistics in their larger contexts and ties to everyday life. With experimental formats, we encourage dynamic exchange between bodies and things, ideas and places, practices and theories.
      </template>
      <template v-else>
        Die Unconference greift die kybernetische Logik von sich selbstregulierenden Systeme auf. Durch einen kollektiven, kollaborativen, indisziplinären und multiperspektivischen Wissensaustausch werden die Zusammenhänge von Kybernetik und Statistik verständlich gemacht und in unseren Alltag zurückgebunden. Mit experimentellen Formaten werden Diskurse körperlich erfahrbar gemacht und der dynamische Austausch zwischen Körpern und Dingen, Ideen und Orten, Praktiken und Theorien gefördert.
      </template>
    </template>
  </Page>
</template>

<script>
import { getCurrentLocale } from '@/locale';
import Page from '@/components/page';

export default {
  name: 'UnconferenceAbout',
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
.unconference-about__title {
  font-size: inherit;
  margin-top: 0;
}
</style>
