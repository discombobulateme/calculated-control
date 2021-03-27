import { Store } from 'vuex';

import { getItemsForTag } from '@/api';
import { getMainTag } from '@/utils';

export default () => new Store({
  state: {
    loadingLiveItem: false,
    liveItem: null,
    loadingNewItem: false,
    newItem: null,
    archiveItems: [],
    lastArchiveSearch: null,
    lastItem: null,
  },
  mutations: {
    setLiveItem(st, item) {
      st.liveItem = item;
    },
    setLoadingLiveItem(st, value) {
      st.loadingLiveItem = value;
    },
    setNewItem(st, item) {
      st.newItem = item;
    },
    setLoadingNewItem(st, value) {
      st.loadingNewItem = value;
    },
    setArchiveItems(st, items) {
      st.archiveItems = items;
    },
    setLastArchiveSearch(st, search) {
      st.lastArchiveSearch = search;
    },
    setLastItem(st, item) {
      st.lastItem = item;
    },
  },
  actions: {
    async fetchLiveItem({ commit, state }, translator) {
      if (state.liveItem) return;

      commit('setLoadingLiveItem', true);
      try {
        const items = await getItemsForTag({ tag: 'live' });

        commit('setLiveItem', {
          title: items[0].data.title,
          imageUrl: items[0].data.rights,
          type: getMainTag(items[0].data, translator),
          key: items[0].key,
        });
      } catch(err) {
        console.warn('error fetching item');
      } finally {
        commit('setLoadingLiveItem', false);
      }
    },
    async fetchNewItem({ commit, state }, translator) {
      if (state.newItem) return;

      commit('setLoadingNewItem', true);
      try {
        const items = await getItemsForTag({ tag: 'new' });
        commit('setNewItem', {
          title: items[0].data.title,
          imageUrl: items[0].data.rights,
          type: getMainTag(items[0].data, translator),
          key: items[0].key,
        });
      } catch(err) {
        console.warn('error fetching item');
      } finally {
        commit('setLoadingNewItem', false);
      }
    }
  }
});
