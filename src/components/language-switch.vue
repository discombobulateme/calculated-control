<template>
  <a
    class="language-switch"
    :aria-label="$t('buttons.language')"
    :title="$t('buttons.language')"
    @click.prevent="switchLanguage"
  >
    {{ switchableLanguage }}
  </a>
</template>

<script>
import { getSwitchableLocale, switchLocale } from '@/locale';

export default {
  name: 'LanguageSwitch',
  computed: {
    switchableLanguage() {
      return getSwitchableLocale();
    }
  },
  methods: {
    switchLanguage() {
      switchLocale(this.switchableLanguage);
      location.reload();
    },
  },
}
</script>

<style scoped>
.language-switch {
  cursor: pointer;
}
</style>
