<template>
  <main class="team">
    <ArchiveHeader static-page class="team__header">
      <template #meta>
        {{ $t('home.team') }}
      </template>
    </ArchiveHeader>
    <section class="team__section">
      <div class="team__section-left">
        <h2 class="team__section-title">Zentrum für Netzkunst</h2>
      </div>
      <div class="team__section-centre">
        <template v-if="english">
          <p>Zentrum für Netzkunst (center for net art) reconstructs, maintains and preserves net art and net culture. The initiative researches archiving and contextualization of net art.</p>
          <p>The Center for Net Art has been a pioneer user in the House of Statistics since September 2019 and is funded by the Kulturamt Berlin Mitte for the exhibition “stick.t.me” (June 2020). Until the foundation of the association, the members of the Center for Network Art have realized exhibition and publication projects in various cooperations, such as: „En Plein Air. Ethnographies of the Digital“ (2019, funded by the Federal Cultural Foundation), „Zentrum für Netzkunst, then and now «(2018, funded by the Senate Department for Culture and Europe), and» warehouse. industries ”(2017, funded by the German Federal Cultural Foundation).</p>
          <p>Members of the association are: <a class="link" href="https://wwwwwwwwwwwwwwwwwwwwww.bitnik.org/">!Mediengruppe Bitnik</a>, Tereza Havlíková, <a class="link" href="http://www.discombobulate.me/en/">Paloma Oliveira</a>, Anneliese Ostertag, <a class="link" href="https://super-filme.org/">Tabea Rossol</a>, <a class="link" href="http://www.curatingyoutube.net/">Robert Sakrowski</a> and <a class="link" href="http://artwarez.org/">Cornelia Sollfrank</a>.</p>
        </template>
        <template v-else>
          <p>Das Zentrum für Netzkunst rekonstruiert, erhält und be- wahrt Netzkunst und Netzkultur. Die Initiative erforscht Möglichkeiten der Archivierung, und Kontextualisierung von Netzkunst.</p>
          <p>Zentrum für Netzkunst ist seit September 2019 Pioniernutzerin im Haus der Statistik und wird für die Ausstellung »stick.t.me« (Juni 2020) vom Kulturamt Berlin Mitte gefördert. Bis zur Gründung des Vereins haben die Mitglieder des Zentrum für Netz­ kunst in unterschiedlichen Kooperationen Ausstellungs- und Publikationsprojekte realisiert, wie: »En Plein Air. Ethnographies of the Digital« (2019, gefördert durch die Kulturstiftung des Bundes), »Zentrum der Netzkunst, damals und heute« (2018, gefördert durch die Senatsverwaltung für Kultur und Europa), und »warehouse. industries« (2017, gefördert durch durch die Kulturstif- tung des Bundes).</p>
          <p>Mitglieder des Vereins sind: <a class="link" href="https://wwwwwwwwwwwwwwwwwwwwww.bitnik.org/">!Mediengruppe Bitnik</a>, Tereza Havlíková, <a class="link" href="http://www.discombobulate.me/en/">Paloma Oliveira</a>, Anneliese Ostertag, <a class="link" href="https://super-filme.org/">Tabea Rossol</a>, <a class="link" href="http://www.curatingyoutube.net/">Robert Sakrowski</a> und <a class="link" href="http://artwarez.org/">Cornelia Sollfrank</a>.</p>
        </template>
        <img class="team__image" src="../assets/images/zfn.jpg" alt="Zentrum für Netzkunst Team" />
      </div>
      <div class="team__section-right">
        <a class="blob blob--green team__link" href="https://netzkunst.berlin/">
          netzkunst.berlin
        </a>
        <a class="blob blob--green team__link" href="https://www.hausderstatistik.org">
          hausderstatistik.org
        </a>
        <a class="blob blob--green team__link" href="https://www.panke.gallery">
          panke.gallery
        </a>
      </div>
    </section>
    <section class="team__section">
      <div class="team__section-left">
        <h2 class="team__section-title">Team</h2>
      </div>
      <div class="team__section-centre">
        <template v-if="english">
          <p>
          <strong>Concept and Curation</strong><br>
          Tereza Havlíková, Paloma Oliveira, Anneliese Ostertag, Tabea Rossol, Sakrowski
          </p>
          <p>
          <strong>Research, Graphic Concept, and Design</strong><br>
          <a class="link" href="http://annaluiselorenz.com/">Anna-Luise Lorenz</a>
          </p>
          <p>
          <strong>Programming</strong><br>
          <a class="link" href="https://fiala.space">Jakub Fiala</a>
          </p>
          <p>
          <strong>Press and Public Relations</strong><br>
          Igor Štromajer
          </p>
          <p>
          <strong>Editing and Translation</strong><br>
          Colin Lang
          </p>
          <p>
          <p>
          <strong>Symposium Assistance</strong><br>
          Noemi Garay
          </p>
          <p>
          <strong>Exhibition Architecture</strong><br>
          Alexej Paryla
          </p>
          <p>
          <strong>Technical Advisor</strong><br>
          xx
          </p>
          <p>
          <strong>Sound Recording</strong><br>
          Jürg Meister
          </p>
          <p>
          <strong>Documentation</strong><br>
          Hannah Rumstedt
          Alexia Manzano Schlamp
          </p>
        </template>
        <template v-else>
          <p>
          <strong>Konzept und Kuration</strong><br>
          Tereza Havlíková, Paloma Oliveira, Anneliese Ostertag, Tabea Rossol, Sakrowski
          </p>
          <p>
          <strong>Recherche, Grafik Konzept und Design</strong><br>
          <a class="link" href="http://annaluiselorenz.com/">Anna-Luise Lorenz</a>
          </p>
          <p>
          <strong>Programmierung</strong><br>
          <a class="link" href="https://fiala.space">Jakub Fiala</a>
          </p>
          <p>
          <strong>Presse und Öffentlichkeitsarbeit</strong><br>
          Igor Štromajer
          </p>
          <p>
          <strong>Lektorat und Übersetzung</strong><br>
          Colin Lang
          </p>
          <p>
          <strong>Symposium Assistenz</strong><br>
          Noemi Garay
          </p>
          <p>
          <strong>Ausstellungsarchitektur</strong><br>
          x
          </p>
          <p>
          <strong>Technische Beratung</strong><br>
          x
          </p>
          <p>
          <strong>Tonaufnahme</strong><br>
          Jürg Meister
          </p>
          <p>
          <strong>Dokumentation</strong><br>
          Hannah Rumstedt
          Alexia Manzano Schlamp
          </p>
        </template>
      </div>
      <div class="team__section-right">
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
  name: 'Team',
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
.team {
  background: var(--color-prime-light-grey);
  border: solid 1px black;
  min-height: 100vh;
}

.team__header {
  border: solid 1px black;
}

.team__section {
  border: solid 1px black;
  min-height: 60vh;
}

.team__section + .team__section {
  border-top: none;
}

.team__section-title {
  font-size: inherit;
  margin: 0;
}

.team__section-left {
  border: solid 1px black;
  border-top: none;
  border-bottom: none;
  font-size: var(--font-size-xl);
  padding: 10px;
}

.team__section-centre,
.team__section-right {
  border: solid 1px black;
  border-top: none;
  border-bottom: none;
  font-size: var(--font-size-large);
  padding: 10px;
}

.team__section-right {
  display: flex;
  flex-direction: column;
}

.team__link {
  min-height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.team__link + .team__link {
  margin-top: 5px;
}

.team__section-centre p:first-of-type {
  margin-top: 0;
}

@media screen and (min-width: 768px) {
  .team__section {
    display: grid;
    grid-template-columns: 1fr 2fr 1fr;
  }
}

.team__image {
  width: 100%;
}
</style>
