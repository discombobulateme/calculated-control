<template>
  <iframe
    v-if="src"
    class="youtube-embed"
    type="text/html"
    width="640"
    height="360"
    :src="src"
    frameborder="0"></iframe>
</template>

<script>
export default {
  name: 'YoutubeEmbed',
  props: {
    src: {
      type: String,
      default: '',
    },
  },
};
</script>

<style scoped>
.youtube-embed {
  height: 100%;
  width: 100%;
}
</style>
