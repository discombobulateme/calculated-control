<template>
  <main class="contact">
    <ArchiveHeader static-page class="contact__header">
      <template #meta>
        {{ $t('home.contact') }}
      </template>
    </ArchiveHeader>
    <section class="contact__section">
      <div class="contact__section-left">
        Zentrum für Netzkunst
      </div>
      <div class="contact__section-right">
        <address class="contact__panel">
          Zentrum für Netzkunst e.V.<br>
          Kollwitzstraße 71<br>
          10435 Berlin<br>
        </address>
        <div class="contact__panel">
          <a class="link" href="mailto:info@netart.berlin">info@netart.berlin</a>
          <br><br>
          <template v-if="english">Press</template>
          <template v-else>Presse</template>
          <br>Igor Štromajer<br>
          <a class="link" href="mailto:press@netzkunst.berlin">press@netzkunst.berlin</a>
        </div>
      </div>
    </section>
    <SiteFooter />
  </main>
</template>

<script>
import { getCurrentLocale } from '@/locale';
import ArchiveHeader from '@/components/archive-header';
import SiteFooter from '@/components/site-footer';

export default {
  name: 'contact',
  components: {
    ArchiveHeader,
    SiteFooter,
  },
  computed: {
    english() {
      return getCurrentLocale() === 'en';
    },
  },
  mounted() {
    document.title = `${this.$t('home.contact')} - Calculating Control`;
  },
};
</script>

<style scoped>
.contact {
  background: var(--color-prime-light-grey);
  border: solid 1px black;
  min-height: 100vh;
}

.contact__header {
  border: solid 1px black;
}

.contact__section {
  border: solid 1px black;
  min-height: 100vh;
}

.contact__section-left,
.contact__section-right {
  padding: 10px;
}

.contact__section-left {
  font-size: var(--font-size-xl);
}

.contact__section-right {
  font-size: var(--font-size-large);
}

@media screen and (min-width: 768px) {
  .contact__section {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }

  .contact__section-left {
    border-right: solid 1px black;
  }

  .contact__section-right {
    border-left: solid 1px black;
  }
}
</style>
