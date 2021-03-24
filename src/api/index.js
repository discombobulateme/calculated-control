import { API_BASE_URL, API_KEY, GROUP_ID } from '@/constants.js';
import { getSwitchableLocale } from '@/locale';

const headers = {
  Authorization: `Bearer ${API_KEY}`,
};

const request = thing => async (params = {}) => {
  const url = new URL(API_BASE_URL);
  url.pathname = `/groups/${GROUP_ID}/${thing}`;

  for (const [key, value] of Object.entries(params)) {
    if (value === undefined) continue;
    if (Array.isArray(value)) {
      for (const arrayItem of value) {
        url.searchParams.append(key, arrayItem);
      }
      continue;
    }
    url.searchParams.set(key, value);
  }

  const response = await fetch(url.toString(), { headers });
  if (!response.ok) throw new Error(`Could not send request with params ${params}`);
  return response;
};

export const getItemsForTag = async ({ tag, limit = 1 }) => {
  const response = await request('items/top')({ tag, limit });
  return response.json();
};

export const getTagsForItemTags = async ({ limit = 25, tags = [], q }) => {
  const response = await request('items/top/tags')({
    itemQ: q,
    limit,
    sort: 'numItems',
    direction: 'desc',
    itemTag: tags.join(),
    itemQMode: 'titleCreatorYear',
  });

  const data = await response.json();
  return data.map(({ tag }) => tag.toLowerCase());
};

export const searchItems = async ({ q, tags, start = 0, limit = 24 }) => {
  const langExcludeTag = `-lang_${getSwitchableLocale()}`;
  const query = {
    q,
    tag: [...tags, langExcludeTag],
    qmode: 'titleCreatorYear',
    limit: start === 0 ? 23 : limit,
    itemType: '-attachment',
  };

  if (start) query.start = start;
  const response = await request('items/top')(query);

  const totalResults = response.headers.get('Total-Results');
  return {
    items: await response.json(),
    totalResults,
  }
};

export const getItem = async ({ key }) => {
  const response = await request(`items/${key}`)();
  return response.json();
};

export const getRelatedItems = async ({ keys, limit = 10 }) => {
  const response = await request('items')({
    itemKey: keys.join(),
    limit,
    itemType: '-attachment',
  });
  return response.json();
};

