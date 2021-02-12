import { searchItems, getTags } from './api.js';
import TagList from './components/tag-list.js';
import SearchForm from './components/search-form.js';
import ResultsList from './components/results-list.js';

const init = async () => {
  const tags = await getTags();
  TagList(tags);
  SearchForm({
    onSubmit: async (...args) => {
      const items = await searchItems(...args);
      ResultsList(items);
    }
  });
};

init();

