<template>
  <Page>
    <template #meta>
      <h1 class="exhibition-about__title">{{ english ? 'Duo Exhibition with Constant Dullaart and UBERMORGEN' : 'Duo Ausstellung mit Constant Dullaart und UBERMORGEN' }}</h1>
    </template>
    <template #content>
      <template v-if="english">
        The exhibition presents two contemporary netart positions that address socio-cybernetic issues by artistically investigating informational processes in both social and technological space.
      </template>
      <template v-else>
        Die Ausstellung zeigt zwei zeitgenössische Netzkunstpositionen, die sich soziokybernetischen Fragen widmen, indem sie informationelle Prozesse sowohl im gesellschaftlichen als auch im technologischen Raum künstlerisch untersuchen.
      </template>
    </template>
  </Page>
</template>

<script>
import { getCurrentLocale } from '@/locale';
import Page from '@/components/page';

export default {
  name: 'PankeExhibitionAbout',
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
