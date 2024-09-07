import { defineStore } from "pinia";

export const useCategorySelected = defineStore("categorySelected", {
  state: () => ({
    title: "",
    active: false,
    photoUrl: "",
    shortVersion: "",
  }),

  getters: {
    getCategorySelected: (state) => {
      let category = {
        title: state.title,
        active: state.active,
        photoUrl: state.photoUrl,
        shortVersion: state.shortVersion,
      };

      return category;
    },
  },
  actions: {},
});
