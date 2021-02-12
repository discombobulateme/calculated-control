<template>
  <form class="search-form" role="search">
    <input class="search-form__input" type="search" placeholder="Suche" name="q" :value="query" @input="onInput">
    <fieldset class="search-form__tags">
      <label
        v-for="tag in tags"
        :key="tag"
        :class="{
          'search-form__tag': true,
          'search-form__tag--selected': selectedTags.includes(tag),
        }"
      >
        <input type="checkbox" name="tag" :value="tag" v-model="selectedTags" class="search-form__tag-input">
        {{ tag }}
      </label>
    </fieldset>
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
  data: ({ tags, query }) => ({
    currentQuery: query,
    selectedTags: tags,
  }),
  created() {
    this.search = debounce(() => {
      const query = { q: this.currentQuery, tags: this.selectedTags };
      this.$router.push({ query });
    }, DEBOUNCE_WAIT);
  },
  watch: {
    currentQuery() {
      this.search();
    },
    selectedTags() {
      this.search();
    },
  },
  methods: {
    onInput(event) {
      console.log(event.target.value);
      this.currentQuery = event.target.value;
    },
  },
};
</script>

<style lang="css" scoped>
.search-form__input {
  font: inherit;
  border: solid 3px #ddd;
  border-radius: 0;
  font-size: 1.25rem;
  margin: 10px 0;
  padding: 10px;
  width: 100%;
}

.search-form__input:hover,
.search-form__input:focus {
  border-color: black;
  outline: none;
}

.search-form__tags {
  border: solid 3px #ddd;
  display: flex;
  flex-wrap: wrap;
  margin-left: 0;
  padding: 5px;
}

.search-form__tags:hover,
.search-form__tags:focus-within {
  border-color: black;
}

.search-form__tag {
  align-items: center;
  background: #ddd;
  border: solid 3px #ddd;
  cursor: pointer;
  display: inline-flex;
  flex-grow: 1;
  justify-content: center;
  margin: 2px;
  padding: 5px;
}

.search-form__tag:hover,
.search-form__tag:focus-within {
  background: black;
  color: white;
}

.search-form__tag-input {
  appearance: none;
  height: 0;
  margin: 0;
  opacity: 0;
  width: 0;
}

.search-form__tag--selected {
  border: solid 3px black;
}
</style>
