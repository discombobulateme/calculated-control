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
      <svg width="480" height="226" viewBox="0 0 480 226" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 0V41.4857L12.4055 73.0563L24.4261 103.645L35.4951 131.813L47.5165 162.401L60.4877 195.412H185.386L196.924 224.77L196.918 224.784L196.932 224.792L197.407 226H401.682L414.666 195.412H414.667L428.677 162.401H303.781L315.736 134.234H315.737L328.721 103.645H328.723L341.707 73.0563H466.605L479.999 41.5V0H0ZM477.577 2.42069V40.0464H2.42188V2.42069H477.577ZM249.368 101.223L236.384 131.813H236.382L223.398 162.401H175.015L163.947 134.234L151.926 103.645L139.906 73.0563H261.324L249.37 101.223H249.368ZM294.143 178.906L288.163 192.99H264.787L253.717 164.823H300.122L294.143 178.906ZM265.737 195.412H287.136L281.158 209.495L276.025 221.585L265.737 195.412ZM262.184 192.991H213.043L225 164.824H251.114L262.184 192.991ZM210.412 192.991H187.036L181.501 178.907L175.967 164.824H222.369L210.415 192.99L210.412 192.991ZM127.887 42.4679H250.182L261.251 70.6348H138.955L133.42 56.5515L127.887 42.4679ZM252.783 42.4679H352.062L340.106 70.6348H263.853L252.783 42.4679ZM125.285 42.4679L130.819 56.5515L136.352 70.6348H14.057L2.98818 42.4679H125.285ZM137.305 73.0563L148.373 101.223H26.0786L15.0083 73.0563H137.305ZM27.0293 103.645H149.325L160.394 131.813H38.0973L27.0293 103.645ZM39.0492 134.234H161.346L172.413 162.401H50.1186L39.0492 134.234ZM62.1369 192.99L51.0701 164.823H173.365L178.899 178.906L184.434 192.99H62.1369ZM187.988 195.411H209.385L198.274 221.588L187.988 195.411ZM200.058 223.578L212.017 195.411H263.137L274.206 223.578H200.058ZM400.077 223.578H277.811L283.789 209.494L289.768 195.411H412.036L400.077 223.578ZM425.02 164.822L413.063 192.989H290.796L296.774 178.906L302.754 164.822H425.02ZM301.15 162.401H226.027L237.987 134.234H313.107L301.15 162.401ZM314.133 131.813H239.013L250.972 103.645H326.092L314.133 131.813ZM327.119 101.223H251.998L263.955 73.0563H339.078L327.119 101.223ZM465.001 70.6348H342.735L354.694 42.4679H476.96L465.001 70.6348Z" fill="white"/>
      </svg>
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
</style>
