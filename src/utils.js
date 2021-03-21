import { primaryTags } from '@/tags';

export const sleep = time => new Promise(resolve => setTimeout(resolve, time));

export const getMainTag = (itemData, translator = x => x) => {
  const { tags, itemType } = itemData;
  const primaryTag = tags && tags.find(({ tag }) => tag && primaryTags.includes(tag.toLowerCase()));
  const tagKey = primaryTag && primaryTag.tag.toLowerCase();
  return tagKey ? translator(`tags.${tagKey.toLowerCase()}`) : itemType;
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

export const formatDate = date => {
  if (!date) return null;
  const dateObject = new Date(date);
  if (isNaN(dateObject)) return date;
  return dateObject.toLocaleString();
}

export const routesEqual = (route1, route2) => {
  if (!route1 || !route2) return false;

  const samePath = route1.path === route2.path;
  const sameQueryKeysLength = Object.keys(route1.query).length === Object.keys(route2.query).length;
  const sameQueryKeys = Object.keys(route1.query).every(key => Object.keys(route2.query).includes(key));
  const sameSearchTerm = route1.query.q === route2.query.q;
  const route1Tags = getTagsFromRoute(route1);
  const route2Tags = getTagsFromRoute(route2);
  const bothHaveTags = route1Tags && route2Tags;
  const neitherHasTags = !route1Tags && !route2Tags;

  if (!samePath) return false;
  if (!sameSearchTerm) return false;
  if (!sameQueryKeys && !sameQueryKeysLength) return false;
  if (bothHaveTags) {
    const sameTagsLength = route1Tags.length === Object.keys(route2Tags).length;
    const sameTags = route1Tags.every(tag => route2Tags.includes(tag));
    if (!sameTagsLength || !sameTags) return false;
  } else if (!neitherHasTags) {
    return false;
  }

  return true;
};
