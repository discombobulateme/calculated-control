<template>
  <div class="home-preview">
    <img v-if="imageUrl" :src="imageUrl" role="presentation" class="home-preview__image" />
    <div class="home-preview__text">
      <div class="home-preview__type">{{ type }}</div>
      <h2 class="home-preview__title">{{ title }}</h2>
    </div>
    <div v-if="tag" class="home-preview__highlight blob blob--green">
      <span class="hash">#</span>{{ $t(`tags.${tag}`) }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomePreview',
  props: {
    type: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: '',
    },
    imageUrl: {
      type: String,
      default: '',
    },
    tag: {
      type: String,
      default: '',
    },
  },
}
</script>

<style scoped>
.home-preview {
  position: relative;
  height: 100%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: var(--font-size-xs);
  width: 100%;
}

.home-preview__text {
  background: linear-gradient(264.28deg, rgba(255, 255, 255, 0.5) -3.29%, rgba(255, 255, 255, 0) 82.34%), rgba(156,250,111,0.5);
  border-radius: var(--border-radius);
  position: relative;
  padding: 15px;
}

@media screen and (min-width: 768px) {
  .home-preview__text {
    max-width: 70%;
  }
}

.home-preview__type,
.home-preview__title {
  position: relative;
}

.home-preview__title {
  font-size: inherit;
  margin: 0;
}

.home-preview__image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.home-preview__highlight {
  display: inline-block;
  font-size: inherit;
  padding: 5px 15px;
  position: absolute;
  top: 15px;
  right: 15px;
}
</style>
