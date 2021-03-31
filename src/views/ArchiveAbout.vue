<template>
  <Page>
    <template #meta>
      <h1 class="archive-about__title">{{ $t('archive.about') }}</h1>
    </template>
    <template #content>
      <template v-if="english">
        <p>Statistical systems in the former GDR were not only mirroring the underlying socio-political and economic structures as well as utopist ideals present at that time but were shaped by technological advances and novel methodological approaches to data management and organization.</p>
        <p>The website, a living archive and platform for the Zentrum für Netzkunst’s activities, serves as a hands-on experiment and critical meta-comment on such practices of archiving and data management. The content of this website is operated in real-time by (mis)using Zotero, a management software that is primarily used in the academic community for the collection of research materials such as PDFs or webpages, as the backbone of the archive. It, thereby, imprints not only the functional but also the dysfunctional structures of this particular database into the website’s architecture. What is knowledge in the first place?</p>
        <p>
          Interface Programming by Jakub Fiala<br>
          Information Architecture by <a class="link" target="_blank" rel="noopener" href="http://annaluiselorenz.com/">Anna-Luise Lorenz</a>
        </p>
      </template>
      <template v-else>
        <p>Statistical systems in the former GDR were not only mirroring the underlying socio-political and economic structures as well as utopist ideals present at that time but were shaped by technological advances and novel methodological approaches to data management and organization.</p>
        <p>The website, a living archive and platform for the Zentrum für Netzkunst’s activities, serves as a hands-on experiment and critical meta-comment on such practices of archiving and data management. The content of this website is operated in real-time by (mis)using Zotero, a management software that is primarily used in the academic community for the collection of research materials such as PDFs or webpages, as the backbone of the archive. It, thereby, imprints not only the functional but also the dysfunctional structures of this particular database into the website’s architecture. What is knowledge in the first place?</p>
        <p>
          Interface Programming by <a class="link" target="_blank" rel="noopener" href="https://fiala.space">Jakub Fiala</a><br>
          Information Architecture by <a class="link" target="_blank" rel="noopener" href="http://annaluiselorenz.com/">Anna-Luise Lorenz</a>
        </p>
      </template>
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
