import { defineStore } from "pinia";

export const useBreadcrumbsStore = defineStore("breadcrumbs", {
  state: () => ({
    navigationArray: [],
  }),
  persist: true,
  getters: {
    getNavigationArray(state) {
      return state.navigationArray;
    },
  },
  actions: {},
});
