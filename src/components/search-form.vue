<template>
  <form :class="{
      'blob': true,
      'blob--green': true,
      'blob--shadow': true,
      'search-form': true,
      'search-form--expanded': expanded,
    }"
    role="search"
    @click="onExpand"
    @submit.prevent="search"
  >
    <div class="search-form__content">
      <input ref="input" class="search-form__input" type="search" placeholder="Search" name="q" :value="$route.query.q" @input="onInput">
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
    expanded: false,
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
    onExpand() {
      if (!this.expanded) {
        this.expanded = true;
        if (this.$refs.input) {
          this.$refs.input.focus();
        }
      }
    },
  },
};
</script>

<style lang="css" scoped>
.search-form {
  display: flex;
  padding: 0 30px;
  position: relative;
}

.search-form__content {
  display: inline-block;
  height: 100%;
  width: 0;
  overflow: hidden;
  transition: width 500ms;
}

.search-form--expanded .search-form__content {
  width: 18vw;
  min-width: 200px;
}

.search-form__input {
  font: inherit;
  border: none;
  background: transparent;
  color: inherit;
}

.search-form__input:hover,
.search-form__input:focus {
  border-color: black;
  outline: none;
}
</style>
