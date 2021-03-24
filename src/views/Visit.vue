<template>
  <main class="visit">
    <ArchiveHeader static-page class="visit__header">
      <template #meta>
        {{ $t('home.visit') }}
      </template>
    </ArchiveHeader>
    <section class="visit__notice">
      <template v-if="english">
        COVID-19<br>
        Please note that due to the current pandemic, there is the possibility of last-minute changes to events.<br>
        For the most up-to-date information, please check our <a href="https://t.me/ZentrumderNetzkunst" class="link">Telegram Channel</a>.
      </template>
      <template v-else>
        COVID-19<br>
        Aufgrund der aktuellen Pandemie kann es zu kurzfristigen Programmänderungen kommen.<br>
        Für mehr Informationen siehe <a href="https://t.me/ZentrumderNetzkunst" class="link">Telegram Kanal</a>.
      </template>
    </section>
    <section class="visit__section">
      <div class="visit__section-left">
        Haus der Statistik
      </div>
      <div class="visit__section-right">
        <template v-if="english">
          <router-link class="link link--arrow" to="/node/ausstellung?tags=date_20_04_2021">Exhibition</router-link><br>
          30.04. – 09.05.2021<br>
          Opening hours<br>
          13.00 – 19.00<br>
          <br>
          <router-link class="link link--arrow" to="/node/symposium">Symposium</router-link><br>
          01.05. – 03.05.2021<br>
          Online<br>
          <br>
          <router-link class="link link--arrow" to="/node/unconference">Unconference</router-link><br>
          21.05. – 23.05.2021<br>
          <br>
          <address>
          Haus der Statistik<br>
          Haus A<br>
          Karl-Marx-Allee 1<br>
          10178 Berlin<br>
          </address><br>
          <br>
          <a class="link" href="https://classic-maps.openrouteservice.org/directions?n1=52.522324&n2=13.415195&n3=18&a=52.521985,13.412772,52.5222,13.418084&b=2&c=0&k1=en-US&k2=km">
          Directions</a><br>
          <iframe class="visit__map" width="425" height="350" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://www.openstreetmap.org/export/embed.html?bbox=13.416007161140444%2C52.52126414320506%2C13.419547677040102%2C52.5227917019113&amp;layer=mapnik&amp;marker=52.52202792919787%2C13.417777419090271"></iframe>
        </template>
        <template v-else>
          <router-link class="link link--arrow" to="/node/ausstellung?tags=date_20_04_2021">Ausstellung</router-link><br>
          30.04. – 09.05.2021<br>
          Öffnungszeiten<br>
          13.00 – 19.00<br>
          <br>
          <router-link class="link link--arrow" to="/node/symposium">Symposium</router-link><br>
          01.05. – 03.05.2021<br>
          Online<br>
          <br>
          <router-link class="link link--arrow" to="/node/unconference">Unconference</router-link><br>
          21.05. – 23.05.2021<br>
          <br>
          <address>
          Haus der Statistik<br>
          Haus A<br>
          Karl-Marx-Allee 1<br>
          10178 Berlin<br>
          </address><br>
          <br>
          <a class="link" href="https://classic-maps.openrouteservice.org/directions?n1=52.522324&n2=13.415195&n3=18&a=52.521985,13.412772,52.5222,13.418084&b=2&c=0&k1=en-US&k2=km">
          Anfahrt</a><br>
          <iframe class="visit__map" width="425" height="350" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://www.openstreetmap.org/export/embed.html?bbox=13.416007161140444%2C52.52126414320506%2C13.419547677040102%2C52.5227917019113&amp;layer=mapnik&amp;marker=52.52202792919787%2C13.417777419090271"></iframe>
        </template>
      </div>
    </section>
    <section class="visit__section">
      <div class="visit__section-left">
        panke.gallery
      </div>
      <div class="visit__section-right">
        <template v-if="english">
          <router-link class="link link--arrow" to="/node/ausstellung?tags=date_09_2021">Exhibition</router-link><br>
          <br>
          <address>
            Gerichtstraße 23<br>
            Hof 5<br>
            13347 Berlin<br>
          </address>
          <br>
          18/09 &mdash; 03/10/2021<br>
          Mittwoch &mdash; Samstag<br>
          Opening Hours/Öffnungszeiten<br>
          15:00 - 19:00<br>
          <br>
          Vernissage<br>
          18/09/2021<br>
          Finissage<br>
          03/10/2021<br><br>
          <a class="link" href="https://www.openstreetmap.org/directions?engine=fossgis_osrm_foot&route=52.54388%2C13.36949%3B52.54510%2C13.37424#map=18/52.54427/13.37324">
          Directions</a>

          <iframe class="visit__map" width="425" height="350" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://www.openstreetmap.org/export/embed.html?bbox=13.36715340614319%2C52.542048093392786%2C13.381315469741823%2C52.54815511835757&layer=mapnik&marker=52.545101712087344%2C13.374234437942505"></iframe>
        </template>
        <template v-else>
          <router-link class="link link--arrow" to="/node/ausstellung?tags=date_09_2021">Ausstellung</router-link><br>
          <br>
          <address>
            Gerichtstraße 23<br>
            Hof 5<br>
            13347 Berlin<br>
          </address>
          <br>
          18/09 &mdash; 03/10/2021<br>
          Mittwoch &mdash; Samstag<br>
          Öffnungszeiten<br>
          15:00 - 19:00<br>
          <br>
          Vernissage<br>
          18/09/2021<br>
          Finissage<br>
          03/10/2021<br><br>
          <a class="link" href="https://www.openstreetmap.org/directions?engine=fossgis_osrm_foot&route=52.54388%2C13.36949%3B52.54510%2C13.37424#map=18/52.54427/13.37324">
          Anfahrt</a>

          <iframe class="visit__map" width="425" height="350" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://www.openstreetmap.org/export/embed.html?bbox=13.36715340614319%2C52.542048093392786%2C13.381315469741823%2C52.54815511835757&layer=mapnik&marker=52.545101712087344%2C13.374234437942505"></iframe>
        </template>
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
  name: 'Visit',
  components: {
    ArchiveHeader,
    SiteFooter,
  },
  computed: {
    english() {
      return getCurrentLocale() === 'en';
    },
  },
};
</script>

<style scoped>
.visit {
  background: var(--color-prime-light-grey);
  border: solid 1px black;
  min-height: 100vh;
}

.visit__header {
  border: solid 1px black;
}

.visit__notice {
  background: var(--color-prime-green);
  border: solid 1px black;
  font-size: var(--font-size-xs);
  text-align: center;
  padding: 15px 0;
}

.visit__section {
  border: solid 1px black;
}

.visit__section-left,
.visit__section-right {
  padding: 10px;
}

.visit__section-left {
  font-size: var(--font-size-xl);
}

.visit__section-right {
  font-size: var(--font-size-large);
}

@media screen and (min-width: 768px) {
  .visit__section {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }

  .visit__section-left {
    border-right: solid 1px black;
  }

  .visit__section-right {
    border-left: solid 1px black;
  }
}

.visit__map {
  border: solid 1px black;
  display: block;
  margin: 15px -10px -10px -10px;
  width: calc(100% + 20px);
}
</style>
