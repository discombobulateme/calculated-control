<template>
  <Page>
    <template #meta>
      <h1 class="imprint__title">{{ $t('home.imprint') }}</h1>
    </template>
    <template #content>
      <template v-if="english">
        <address>
          Zentrum für Netzkunst e.V.<br>
          Kollwitzstraße 71<br>
          10435 Berlin
        </address>
        <p><a class="link" href="mailto:info@netart.berlin">info@netart.berlin</a></p>
        <p>Tax ID: 27/647/51440</p>
        <p>
          Responsible for all content as per § 5 TMG:<br>
          Zentrum für Netzkunst e.V.<br>
          Commercial ID: VR 30390 b
        </p>
        <p>
          LOGOS<br>
          Zentrum für Netzkunst<br>
          Haus der Statistik<br>
          Hauptstadtkulturfond<br>
          panke.gallery
        </p>
        <p>
          <em>Limitation of liability for internal content:</em> The content of our website has been compiled with meticulous care and to the best of our knowledge. However, we cannot assume any liability for the up-to-dateness, completeness or accuracy of any of the pages.
          Pursuant to section 7, para. 1 of the TMG (Telemediengesetz – tele media act by german law), we as service providers are liable for our own content on these pages in accordance with general laws. However, pursuant to sections 8 to 10 of the tmg, we as service providers are not under obligation to monitor external information provided or stored on our website. Once we have become aware of a specific infringement of the law, we will immediately remove the content in question. Any liability concerning this matter can only be assumed from the point in time at which the infringement becomes known to us.
        </p>
        <p>
          <em>Limitation of liability for external links:</em> Our website contains links to the websites of third parties (“external links”). As the content of these websites is not under our control, we cannot assume any liability for such external content. In all cases, the provider of information of the linked websites is liable for the content and accuracy of the information provided. At the point in time when the links were placed, no infringements of the law were recognisable to us. As soon as an infringement of the law becomes known to us, we will immediately remove the link in question.
        </p>
        <p>
          <em>Data protection:</em> A visit to our website can result in the storage on our server of information about the access (date, time, page accessed). This does not represent any analysis of personal data (e.g., name, address or e-mail address). If personal data are collected, this only occurs – to the extent possible – with the prior consent of the user of the website. Any forwarding of the data to third parties without the express consent of the user shall not take place.
        </p>
        <p>
          <em>Copyright:</em> A visit to our website can result in the storage on our server of information about the access (date, time, page accessed). This does not represent any analysis of personal data (e.g., name, address or e-mail address). If personal data are collected, this only occurs – to the extent possible – with the prior consent of the user of the website. Any forwarding of the data to third parties without the express consent of the user shall not take place.
        </p>
        <p>
          We would like to expressly point out that the transmission of data via the internet (e.g., by e-mail) can offer security vulnerabilities. It is therefore impossible to safeguard the data completely against access by third parties. We cannot assume any liability for damages arising as a result of such security vulnerabilities.
        </p>
        <p>
          The use by third parties of all published contact details for the purpose of advertising is expressly excluded. We reserve the right to take legal steps in the case of the unsolicited sending of advertising information; e.g., by means of spam mail.
        </p>
      </template>
      <template v-else>
        <address>
          Zentrum für Netzkunst e.V.<br>
          Kollwitzstraße 71<br>
          10435 Berlin
        </address>
        <p><a class="link" href="mailto:info@netart.berlin">info@netart.berlin</a></p>
        <p>Steuernummer: 27/647/51440</p>
        <p>
          Redaktionell verantwortlich gem. § 5 TMG:<br>
          Zentrum für Netzkunst e.V.<br>
          Handelsregisternummer: VR 30390 b
        </p>
        <p>
          LOGOS<br>
          Zentrum für Netzkunst<br>
          Haus der Statistik<br>
          Hauptstadtkulturfond<br>
          panke.gallery
        </p>
        <p>
          <em>Limitation of liability for internal content:</em> The content of our website has been compiled with meticulous care and to the best of our knowledge. However, we cannot assume any liability for the up-to-dateness, completeness or accuracy of any of the pages.
          Pursuant to section 7, para. 1 of the TMG (Telemediengesetz – tele media act by german law), we as service providers are liable for our own content on these pages in accordance with general laws. However, pursuant to sections 8 to 10 of the tmg, we as service providers are not under obligation to monitor external information provided or stored on our website. Once we have become aware of a specific infringement of the law, we will immediately remove the content in question. Any liability concerning this matter can only be assumed from the point in time at which the infringement becomes known to us.
        </p>
        <p>
          <em>Limitation of liability for external links:</em> Our website contains links to the websites of third parties (“external links”). As the content of these websites is not under our control, we cannot assume any liability for such external content. In all cases, the provider of information of the linked websites is liable for the content and accuracy of the information provided. At the point in time when the links were placed, no infringements of the law were recognisable to us. As soon as an infringement of the law becomes known to us, we will immediately remove the link in question.
        </p>
        <p>
          <em>Data protection:</em> A visit to our website can result in the storage on our server of information about the access (date, time, page accessed). This does not represent any analysis of personal data (e.g., name, address or e-mail address). If personal data are collected, this only occurs – to the extent possible – with the prior consent of the user of the website. Any forwarding of the data to third parties without the express consent of the user shall not take place.
        </p>
        <p>
          <em>Copyright:</em> A visit to our website can result in the storage on our server of information about the access (date, time, page accessed). This does not represent any analysis of personal data (e.g., name, address or e-mail address). If personal data are collected, this only occurs – to the extent possible – with the prior consent of the user of the website. Any forwarding of the data to third parties without the express consent of the user shall not take place.
        </p>
        <p>
          We would like to expressly point out that the transmission of data via the internet (e.g., by e-mail) can offer security vulnerabilities. It is therefore impossible to safeguard the data completely against access by third parties. We cannot assume any liability for damages arising as a result of such security vulnerabilities.
        </p>
        <p>
          The use by third parties of all published contact details for the purpose of advertising is expressly excluded. We reserve the right to take legal steps in the case of the unsolicited sending of advertising information; e.g., by means of spam mail.
        </p>
      </template>
    </template>
  </Page>
</template>

<script>
import { getCurrentLocale } from '@/locale';
import Page from '@/components/page';

export default {
  name: 'ArchiveAbout',
  components: {
    Page,
  },
  computed: {
    english() {
      return getCurrentLocale() === 'en';
    },
  },
  mounted() {
    document.title = `${this.$t('home.imprint')} - Calculating Control`;
  },
};
</script>

<style scoped>
.imprint__title {
  font-size: inherit;
  margin-top: 0;
}
</style>
