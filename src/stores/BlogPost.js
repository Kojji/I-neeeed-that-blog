import { defineStore } from "pinia";

export const usePostSelectedStore = defineStore("postSelected", {
  state: () => ({
    postSelected: {},
    postContent: [],
  }),

  getters: {
    getPostSelected: (state) => {
      return state.postSelected;
    },
    getPostContent: (state) => {
      return state.postContent;
    },
  },
  actions: {},
});
