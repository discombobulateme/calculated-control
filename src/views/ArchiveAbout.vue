<template>
  <Page>
    <template #meta>
      <h1 class="archive-about__title">{{ $t('archive.about') }}</h1>
    </template>
    <template #content>
      Suas intellegebat eu mea, at est dicta assentior vituperatoribus, aperiam habemus vivendum usu no. Pri ex mucius ocurreret. Suas intellegebat eu mea, at est dicta assentior vituperatoribus, aperiam habemus. Suas intellegebat eu mea, at est dicta assentior vituperatoribus, aperiam habemus vivendum usu no. Pri ex mucius ocurreret. Suas intellegebat eu mea, at est dicta assentior vituperatoribus, aperiam habemus vivendum usu no. Pri ex mucius ocurreret. Suas intellegebat eu mea, at est dicta assentior vituperatoribus, aperiam habemus. Suas intellegebat eu mea, at est dicta assentior vituperatoribus, aperiam Suas intellegebat eu mea, at est dicta assentior vituperatoribus, aperiam habemus vivendum usu no. Pri ex mucius ocurreret. Suas intellegebat eu mea, at est d
    </template>
  </Page>
</template>

<script>
import Page from '@/components/page';

export default {
  name: 'ArchiveAbout',
  components: {
    Page,
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
