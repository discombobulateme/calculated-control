<template>
  <form :class="{
      'blob': true,
      'blob--green': true,
      'blob--shadow': true,
      'search-form': true,
    }"
    role="search"
    @submit.prevent="search"
  >
    <div class="search-form__content">
      <input ref="input" class="search-form__input" type="search" placeholder="search..." name="q" :value="$route.query.q" @input="onInput">
    </div>
    🔍
  </form>
</template>

<script>
export default {
  name: 'SearchForm',
  props: {
    tags: {
      type: Array,
      default: () => [],
    },
    query: {
      type: String,
      default: '',
    },
  },
  data: ({ query }) => ({
    currentQuery: query,
  }),
  mounted() {
    this.selectedTags = !Array.isArray(this.$route.query.tags) ? [this.$route.query.tags] : (this.$route.query.tags || []);
  },
  methods: {
    onInput(event) {
      this.currentQuery = event.target.value;
    },
    search() {
      const query = { q: this.currentQuery };
      this.$router.push({ query });
    },
  },
};
</script>

<style lang="css" scoped>
.search-form {
  display: flex;
  padding: 7px 35px;
  position: relative;
}

.search-form__content {
  display: inline-block;
  padding-right: 10px;
  height: 100%;
  width: 18vw;
  min-width: 200px;
  overflow: hidden;
}

.search-form__input {
  font: inherit;
  border: none;
  background: transparent;
  color: inherit;
  height: 100%;
  width: 100%;
}

.search-form__input:hover,
.search-form__input:focus {
  border-color: black;
  outline: none;
}
</style>
