<template>
  <footer class="site-footer">
    <section class="site-footer__section site-footer__nav">
      <nav class="site-footer__nav-container">
        <ul class="site-footer__list">
          <li><router-link class="site-footer__link" :to="{ name: 'Node', params: { node: 'ausstellung' } }">{{ $t('home.ausstellung') }}</router-link></li>
          <li><router-link class="site-footer__link" :to="{ name: 'Node', params: { node: 'symposium' } }">{{ $t('home.symposium') }}</router-link></li>
          <li><router-link class="site-footer__link" :to="{ name: 'Node', params: { node: 'journal' } }">{{ $t('home.journal') }}</router-link></li>
          <li><router-link class="site-footer__link" :to="{ name: 'Node', params: { node: 'unconference' } }">{{ $t('home.unconference') }}</router-link></li>
          <li><router-link class="site-footer__link" :to="{ name: 'Archive' }">{{ $t('archive.title') }}</router-link></li>
        </ul>

        <ul class="site-footer__list">
          <li><router-link class="site-footer__link" :to="{ name: 'Visit' }">{{ $t('home.visit') }}</router-link></li>
          <li><router-link class="site-footer__link" :to="{ name: 'Contact' }">{{ $t('home.contact') }}</router-link></li>
          <li><router-link class="site-footer__link" :to="{ name: 'Team' }">{{ $t('home.team') }}</router-link></li>
        </ul>
      </nav>
    </section>
    <section class="site-footer__section site-footer__logo-section">
      <a href="https://netzkunst.berlin/">
        <img class="site-footer__logo" src="../assets/images/zfn_logo.svg" alt="Zentrum für Netzkunst logo" />
      </a>
    </section>
    <section class="site-footer__section site-footer__socials">
      <nav class="site-footer__nav-container">
        <ul class="site-footer__list">
          <li><a target="_blank" rel="noopener" class="site-footer__link site-footer__link--green" href="https://t.me/ZentrumderNetzkunst">telegram</a></li>
          <li><a target="_blank" rel="noopener" class="site-footer__link" href="https://fb.com/netzkunst.berlin">facebook</a></li>
          <li><a target="_blank" rel="noopener" class="site-footer__link" href="https://www.youtube.com/channel/UCg0wwEdrQjLrPOITC7nrIwA">youtube</a></li>
          <li><a target="_blank" rel="noopener" class="site-footer__link" href="https://instagram.com/netzkunst.berlin">instagram</a></li>
        </ul>

        <ul class="site-footer__list">
          <li><router-link class="site-footer__link" :to="{ name: 'Imprint' }">{{ $t('home.imprint') }}</router-link></li>
          <li>
            <LanguageSwitch />
          </li>
        </ul>

        <a class="site-sponsor__link" href="https://hauptstadtkulturfonds.berlin.de/" target="_blank" rel="noopener">
          <img class="site-sponsor__logo" src="../assets/images/HKF-Logo-W.svg" alt="Hauptstadt Kultur Fonds logo" />
        </a>
      </nav>
    </section>
  </footer>
</template>

<script>
import LanguageSwitch from '@/components/language-switch';

export default {
  name: 'SiteFooter',
  components: {
    LanguageSwitch,
  },
};
</script>

<style scoped>
.site-footer {
  background: black;
  color: white;
  display: grid;
  font-size: var(--font-size-xs);
  line-height: 1.2;
}

.site-footer__section {
  padding: 15px;
  position: relative;
}

.site-footer__section + .site-footer__section {
  border-top: solid 2px white;
}

@media screen and (min-width: 768px) {
  .site-footer {
    grid-template-columns: 1fr 1fr 1fr;
    height: 290px;
  }

  .site-footer__section + .site-footer__section {
    border-top: none;
    border-left: solid 2px white;
  }
}


.site-footer__list {
  list-style-type: none;
  margin: 0;
  padding: 0;
}

.site-footer__link,
.site-footer__link:visited {
  color: inherit;
  text-decoration: inherit;
  transition: color var(--transition-time);
}

.site-footer__link:hover {
  color: var(--color-prime-green);
  text-decoration: inherit;
}

.site-footer__link--green {
  color: var(--color-prime-green);
}

.site-footer__link--green:hover {
  color: white;
}

.site-footer__nav-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
}

.site-footer__logo-section {
  display: flex;
}

.site-footer__logo {
  width: 80%;
}

.site-sponsor__link {
  position: absolute;
  top: 15px;
  right: 15px;
}

.site-sponsor__logo{
  display: block;
  width: 80px;
}
</style>
