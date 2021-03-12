<template>
  <footer class="site-footer">
    <section class="site-footer__section site-footer__nav">
      <nav class="site-footer__nav-container">
        <ul class="site-footer__list">
          <li><router-link class="site-footer__link" :to="{ name: 'Node', params: { node: 'exhibition' } }">#exhibition</router-link></li>
          <li><router-link class="site-footer__link" :to="{ name: 'Node', params: { node: 'symposium' } }">#symposium</router-link></li>
          <li><router-link class="site-footer__link" :to="{ name: 'Node', params: { node: 'journal' } }">#journal</router-link></li>
          <li><router-link class="site-footer__link" :to="{ name: 'Node', params: { node: 'unconference' } }">#unconference</router-link></li>
          <li><router-link class="site-footer__link" :to="{ name: 'Archive' }">archive</router-link></li>
        </ul>

        <ul class="site-footer__list">
          <li><router-link class="site-footer__link" :to="{ name: 'Visit' }">visit</router-link></li>
          <li><router-link class="site-footer__link" :to="{ name: 'Contact' }">contact</router-link></li>
          <li><router-link class="site-footer__link" :to="{ name: 'Team' }">team</router-link></li>
        </ul>
      </nav>
    </section>
    <section class="site-footer__section site-footer__logo">
      <img class="site-footer__logo" src="../assets/images/zfn_logo.svg" alt="Zentrum für Netzkunst logo" />
    </section>
    <section class="site-footer__section site-footer__socials">
      <ul class="site-footer__list">
          <li><a class="site-footer__link site-footer__link--green" href="https://t.me/ZentrumderNetzkunst">telegram</a></li>
          <li><a class="site-footer__link" href="https://fb.com/netzkunst.berlin">facebook</a></li>
          <li><a class="site-footer__link" href="">youtube</a></li>
          <li><a class="site-footer__link" href="https://instagram.com/netzkunst.berlin">instagram</a></li>
        </ul>
    </section>
  </footer>
</template>

<script>
export default {
  name: 'SiteFooter',
};
</script>

<style scoped>
.site-footer {
  background: black;
  color: white;
  display: grid;
  font-size: var(--font-size-small);
}

.site-footer__section {
  padding: 15px;
}

.site-footer__section + .site-footer__section {
  border-top: solid 2px white;
}

@media screen and (min-width: 768px) {
  .site-footer {
    grid-template-columns: 1fr 1fr 1fr;
    height: 390px;
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
}

.site-footer__link--green {
  color: var(--color-prime-green);
}

.site-footer__nav-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
}

.site-footer__logo {
  width: 100%;
}
</style>
