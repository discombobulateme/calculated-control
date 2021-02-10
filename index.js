import { getItemsForTags, getTags } from './api.js';
import TagList from './components/tag-list.js';

const init = async () => {
  const tags = await getTags();
  TagList(tags);
};

init();

