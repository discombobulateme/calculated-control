import { API_BASE_URL, API_KEY, GROUP_ID } from './constants.js';

const headers = {
  Authorization: `Bearer ${API_KEY}`,
};

const request = thing => async (params = {}) => {
  const url = new URL(API_BASE_URL);
  url.pathname = `/groups/${GROUP_ID}/${thing}`;

  for (const [key, value] of Object.entries(params)) {
    url.searchParams.set(key, value);
  }

  const response = await fetch(url.toString(), { headers });
  if (!response.ok) throw new Error(`Could not send request with params ${params}`);
  return response.json();
};

export const getItemsForTags = async tags => {
  return request('items')({ tag: tags.join(' || ')});
};

export const getTags = async (limit = 10) => {
  return request('tags')({ limit, sort: 'numItems', direction: 'desc' });
};
