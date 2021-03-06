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
import debounce from 'lodash.debounce';

const DEBOUNCE_WAIT = 1000;

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
  data: ({ query, $route }) => ({
    currentQuery: query,
    selectedTags: !Array.isArray($route.query.tags) ? [$route.query.tags] : ($route.query.tags || []),
  }),
  created() {
    this.search = debounce(() => {
      const query = { q: this.currentQuery };
      if (this.selectedTags) query.tags = this.selectedTags;
      this.$router.push({ query });
    }, DEBOUNCE_WAIT);
  },
  mounted() {
    this.selectedTags = !Array.isArray(this.$route.query.tags) ? [this.$route.query.tags] : (this.$route.query.tags || []);
    if (this.$route.query.q && this.$route.query.q.length > 0) {
      this.expanded = true;
    }
  },
  methods: {
    onInput(event) {
      this.currentQuery = event.target.value;
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
  transition: width 500ms;
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
