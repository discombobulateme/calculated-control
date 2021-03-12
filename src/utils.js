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
