import { primaryTags } from '@/tags';

export const sleep = time => new Promise(resolve => setTimeout(resolve, time));

export const getMainTag = itemData => {
  const { tags, itemType } = itemData;
  const primaryTag = tags && tags.find(({ tag }) => tag && primaryTags.includes(tag.toLowerCase()));
  return (primaryTag && primaryTag.tag.toLowerCase()) || itemType;
};
