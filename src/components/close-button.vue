<template>
  <button
      class="blob blob--shadow close-button"
      :aria-label="$t('buttons.close')"
      :title="$t('buttons.close')"
      @click="$emit('click', $event)"
    >
      <svg width="103" height="58" viewBox="0 0 103 58" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M37 14.7896L66.2105 44.0001" stroke="#675836" stroke-width="4"/>
        <path d="M37 44L66.2105 14" stroke="#675836" stroke-width="4"/>
      </svg>
    </button>
</template>

<script>
export default {
  name: 'CloseButton',
}
</script>

<style scoped>
.close-button {
  color: var(--color-prime-olive);
  cursor: pointer;
  display: flex;
}
</style>
