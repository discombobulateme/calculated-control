<template>
  <form :class="{
      'blob': true,
      'blob--green': true,
      'blob--shadow': true,
      'search-form': true,
      'search-form--expanded': expanded,
    }"
    role="search"
    @click="expanded = true"
    @submit.prevent="search"
  >
    <div class="search-form__content">
      <input ref="input" class="search-form__input" type="search" placeholder="search..." name="q" :value="$route.query.q" @input="onInput">
    </div>
    <svg width="38" height="36" viewBox="0 0 38 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="15.5" cy="15.5" r="13.5" stroke="#675836" stroke-width="4"/>
      <line x1="25.8327" y1="23.9113" x2="36.4141" y2="34.4927" stroke="#675836" stroke-width="4"/>
    </svg>
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
    expanded: false,
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
  cursor: pointer;
}

.search-form__content {
  display: inline-block;
  height: 100%;
  min-width: 0;
  width: 0;
  overflow: hidden;
  transition: width 400ms, min-width 400ms;
}

.search-form--expanded .search-form__content {
  padding-right: 10px;
  min-width: 200px;
  width: 18vw;
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
