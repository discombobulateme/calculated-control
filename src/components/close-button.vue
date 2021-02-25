<template>
  <button
      class="close-button"
      @click="$emit('click', $event)"
    >
      Close
    </button>
</template>

<script>
export default {
  name: 'CloseButton',
}
</script>

<style scoped>
.close-button {
  background: rgba(196,196,196,0.5);
  border: none;
  cursor: pointer;
  font-size: 0;
  border-radius: 50%;
  width: 110px;
  height: 110px;
  padding: 0;
}

.close-button::before,
.close-button::after {
  content: '';
  background: white;
  display: block;
  width: 100%;
  height: 1px;
  transform-origin: center center;
}

.close-button::before {
  transform: rotate(45deg);
}

.close-button::after {
  transform: rotate(-45deg);
}
</style>
