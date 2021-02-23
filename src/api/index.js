import { API_BASE_URL, API_KEY, GROUP_ID } from '@/constants.js';

const headers = {
  Authorization: `Bearer ${API_KEY}`,
};

const request = thing => async (params = {}) => {
  const url = new URL(API_BASE_URL);
  url.pathname = `/groups/${GROUP_ID}/${thing}`;

  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined) url.searchParams.set(key, value);
  }

  const response = await fetch(url.toString(), { headers });
  if (!response.ok) throw new Error(`Could not send request with params ${params}`);
  return response.json();
};

export const getItemsForTags = async tags => {
  return request('items')({ tag: tags.join(' || ')});
};

export const getTags = async ({ limit = 20 }) => {
  return request('tags')({ limit, sort: 'numItems', direction: 'desc' });
};

export const getTagsForItemTags = async ({ limit = 25, tags = [], q }) => {
  return request('items/top/tags')({
    itemQ: q,
    limit,
    sort: 'numItems',
    direction: 'desc',
    itemTag: tags.join(),
    itemQMode: 'titleCreatorYear',
  });
};

export const searchItems = async ({ q, tags, start = 0, limit = 30 }) => {
  return request('items')({
    q,
    tag: tags?.join(' || '),
    qmode: 'titleCreatorYear',
    limit,
    start,
    itemType: '-attachment',
  });
};

export const getItem = async ({ key }) => {
  return request(`items/${key}`)();
};

