<template>
  <ul class="items-list" tabindex="0">
    <li v-if="aboutPage" class="items-list__item items-list__about">
      <router-link :to="{ name: aboutPage }" class="blob items-list__about-link">
        {{ aboutPageText }}
      </router-link>
    </li>
    <li v-for="(item, index) in items" :key="index" class="items-list__item">
      <ItemPreview ref="item" :item="item" :from="from" />
    </li>
  </ul>
</template>

<script>
import ItemPreview from './item-preview';

export default {
  name: 'ItemsList',
  components: {
    ItemPreview,
  },
  props: {
    items: {
      type: Array,
      default: () => [],
    },
    aboutPage: {
      type: String,
      default: '',
    },
    aboutPageText: {
      type: String,
      default: '',
    },
    from: {
      type: String,
      default: '',
    },
  },
  mounted() {
    if (this.$refs.item) this.$refs.item[0].$el.focus();
  },
}
</script>

<style lang="css" scoped>
.items-list {
  border: solid 1px black;
  border-top: none;
  display: grid;
  list-style-type: none;
  padding: 0;
  margin: -1px 0 0;
  min-height: calc(100vh - 80px);
}

.items-list__item {
  border: solid 1px black;
  min-height: 100px;
}

@media screen and (min-width: 768px) {
  .items-list {
    grid-template-columns: repeat(2, 1fr);
  }

  .items-list__item {
    min-height: 288px;
    height: 100%;
  }

  .items-list__item:last-child:nth-of-type(2n - 1) {
    grid-column: span 2;
  }
}

@media screen and (min-width: 1200px) {
  .items-list {
    grid-template-columns: repeat(3, 1fr);
  }

  .items-list__item:last-child:nth-of-type(2n - 1) {
    grid-column: span 3;
  }

  .items-list__item:last-child:nth-of-type(3n + 2) {
    grid-column: span 2;
  }

  .items-list__item:last-child:nth-of-type(3n + 1) {
    grid-column: span 3;
  }
}

.items-list__about {
  padding: 5px;
}

.items-list__about-link {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 100%;
  text-decoration: none;
}

</style>
