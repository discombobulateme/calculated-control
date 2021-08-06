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
          <p>
            Zentrum für Netzkunst reconstructs, maintains, and preserves netart
            and net culture. The association researches archiving and
            contextualization of netart. Since 2019, we are based at the Haus
            der Statisik, where we are conducting research on the history of the
            building and its former functions.
          </p>
          <p>
            Members of the association are:
            <a
              class="link"
              target="_blank"
              rel="noopener"
              href="https://wwwwwwwwwwwwwwwwwwwwww.bitnik.org/"
              >!Mediengruppe Bitnik</a
            >, Tereza Havlíková,
            <a
              class="link"
              target="_blank"
              rel="noopener"
              href="http://www.discombobulate.me/en/"
              >Paloma Oliveira</a
            >,
            <a
              href="https://super-filme.org/"
              target="_blank"
              rel="noopener"
              class="link"
              >Anneliese Ostertag</a
            >,
            <a
              class="link"
              target="_blank"
              rel="noopener"
              href="https://super-filme.org/"
              >Tabea Rossol</a
            >,
            <a
              class="link"
              target="_blank"
              rel="noopener"
              href="http://www.curatingyoutube.net/"
              >Sakrowski</a
            >, and
            <a
              class="link"
              target="_blank"
              rel="noopener"
              href="http://artwarez.org/"
              >Cornelia Sollfrank</a
            >.
          </p>
        </template>
        <template v-else>
          <p>
            Das Zentrum für Netzkunst rekonstruiert, erhält und bewahrt
            Netzkunst und Netzkultur. Der Verein erforscht Möglichkeiten der
            Archivierung und Kontextualisierung von Netzkunst. Seit September
            2019 arbeiten wir als Pioniernutzer*innen am Haus der Statistik
            Berlin und forschen zu der Geschichte des Hauses.
          </p>
          <p>
            Mitglieder des Vereins sind:
            <a
              class="link"
              target="_blank"
              rel="noopener"
              href="https://wwwwwwwwwwwwwwwwwwwwww.bitnik.org/"
              >!Mediengruppe Bitnik</a
            >, Tereza Havlíková,
            <a
              class="link"
              target="_blank"
              rel="noopener"
              href="http://www.discombobulate.me/en/"
              >Paloma Oliveira</a
            >,
            <a
              href="https://super-filme.org/"
              target="_blank"
              rel="noopener"
              class="link"
              >Anneliese Ostertag</a
            >,
            <a
              class="link"
              target="_blank"
              rel="noopener"
              href="https://super-filme.org/"
              >Tabea Rossol</a
            >,
            <a
              class="link"
              target="_blank"
              rel="noopener"
              href="http://www.curatingyoutube.net/"
              >Sakrowski</a
            >, und
            <a
              class="link"
              target="_blank"
              rel="noopener"
              href="http://artwarez.org/"
              >Cornelia Sollfrank</a
            >.
          </p>
        </template>
        <img
          class="team__image"
          src="../assets/images/zfn.jpg"
          alt="Zentrum für Netzkunst Team"
        />
      </div>
      <div class="team__section-right">
        <a class="blob blob--green team__link" href="https://netzkunst.berlin/">
          netzkunst.berlin
        </a>
        <a
          class="blob blob--green team__link"
          href="https://www.hausderstatistik.org"
        >
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
            <span>Concept and Curation</span><br />
            <em
              >Tereza Havlíková, Paloma Oliveira, Anneliese Ostertag, Tabea
              Rossol, Sakrowski</em
            >
          </p>
          <p>
            <span>Research, Graphic Concept, and Design</span><br />
            <em
              ><a
                class="link"
                target="_blank"
                rel="noopener"
                href="http://annaluiselorenz.com/"
                >Anna-Luise Lorenz</a
              ></em
            >
          </p>
          <p>
            <span>Programming</span><br />
            <em
              ><a
                class="link"
                target="_blank"
                rel="noopener"
                href="https://fiala.space"
                >Jakub Fiala</a
              ></em
            >
          </p>
          <p>
            <span>Social Medial</span><br />
            <em
              ><a
                class="link"
                target="_blank"
                rel="noopener"
                href="https://intima.org"
                >Igor Štromajer</a
              ></em
            >
          </p>
          <p>
            <span>Editing and Translation</span><br />
            <em>Colin Lang</em>
            <em>Paulina Thom</em>
          </p>
          <p>
            <span>Symposium Assistance</span><br />
            <em>Noemi Garay</em>
          </p>
          <p>
            <span>Exhibition Architecture</span><br />
            <em>Omer Polak</em><br />
            <em>Cäcilia Verweyen</em>
          </p>
          <p>
            <span>Sound Recording</span><br />
            <em>Jürg Meister</em>
          </p>
          <p>
            <span>Documentation</span><br />
            <em>Hannah Rumstedt</em><br />
            <em>Alexia Manzano Schlamp</em>
          </p>
        </template>
        <template v-else>
          <p>
            <span>Konzept und Kuration</span><br />
            <em
              >Tereza Havlíková, Paloma Oliveira, Anneliese Ostertag, Tabea
              Rossol, Sakrowski</em
            >
          </p>
          <p>
            <span>Recherche, Grafik Konzept und Design</span><br />
            <em
              ><a
                class="link"
                target="_blank"
                rel="noopener"
                href="http://annaluiselorenz.com/"
                >Anna-Luise Lorenz</a
              ></em
            >
          </p>
          <p>
            <span>Programmierung</span><br />
            <em
              ><a
                class="link"
                target="_blank"
                rel="noopener"
                href="https://fiala.space"
                >Jakub Fiala</a
              ></em
            >
          </p>
          <p>
            <span>Soziale Medien</span><br />
            <em
              ><a
                class="link"
                target="_blank"
                rel="noopener"
                href="https://intima.org"
                >Igor Štromajer</a
              ></em
            >
          </p>
          <p>
            <span>Lektorat und Übersetzung</span><br />
            <em>Colin Lang</em>
            <em>Paulina Thom</em>
          </p>
          <p>
            <span>Symposium Assistenz</span><br />
            <em>Noemi Garay</em>
          </p>
          <p>
            <span>Ausstellungsgestaltung</span><br />
            <em>Omer Polak</em><br />
            <em>Cäcilia Verweyen</em>
          </p>
          <p>
            <span>Tonaufnahme</span><br />
            <em>Jürg Meister</em>
          </p>
          <p>
            <span>Dokumentation</span><br />
            <em>Hannah Rumstedt</em><br />
            <em>Alexia Manzano Schlamp</em>
          </p>
        </template>
      </div>
      <div class="team__section-right"></div>
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
  mounted() {
    document.title = `${this.$t('home.team')} - Calculating Control`;
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
  border-bottom: solid 2px black;
}

.team__section {
  border-bottom: solid 2px black;
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
