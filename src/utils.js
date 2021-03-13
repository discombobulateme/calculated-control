import { primaryTags } from '@/tags';

export const sleep = time => new Promise(resolve => setTimeout(resolve, time));

export const getMainTag = itemData => {
  const { tags, itemType } = itemData;
  const primaryTag = tags && tags.find(({ tag }) => tag && primaryTags.includes(tag.toLowerCase()));
  return (primaryTag && primaryTag.tag.toLowerCase()) || itemType;
};

export const getTagsFromRoute = route => {
  if (Array.isArray(route.query.tags)) {
    return route.query.tags;
  }
  if (typeof route.query.tags === 'string') {
    return [route.query.tags];
  }
  return [];
};

export const getItemAuthor = item => {
  if (!item || !item.creators) return null;
      return item.creators
        .map(({ firstName, lastName, name }) => [firstName, lastName, name].join(' '))
        .join(', ')
        .trim();
}

export const caseInsensitiveIncludes = (list = [], item = '') => {
  return list && list.find(listItem => listItem.toLowerCase() === item.toLowerCase())
}
