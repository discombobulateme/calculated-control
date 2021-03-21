import { Store } from 'vuex';

import { getItemsForTag } from '@/api';
import { getMainTag } from '@/utils';

export default () => new Store({
  state: {
    loadingLiveItem: false,
    liveItem: null,
    loadingNewItem: false,
    newItem: null
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
  },
  actions: {
    async fetchLiveItem({ commit, state }) {
      if (state.liveItem) return;

      commit('setLoadingLiveItem', true);
      const items = await getItemsForTag({ tag: 'live' });

      commit('setLiveItem', {
        title: items[0].data.title,
        imageUrl: items[0].data.rights,
        type: getMainTag(items[0].data),
        key: items[0].key,
      });
      commit('setLoadingLiveItem', false);
    },
    async fetchNewItem({ commit, state }) {
      if (state.newItem) return;

      commit('setLoadingNewItem', true);
      const items = await getItemsForTag({ tag: 'new' });

      commit('setNewItem', {
        title: items[0].data.title,
        imageUrl: items[0].data.rights,
        type: getMainTag(items[0].data),
        key: items[0].key,
      });
      commit('setLoadingNewItem', false);
    }
  }
});
