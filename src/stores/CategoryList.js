import { defineStore } from "pinia";
import { db } from "boot/firebase";
import { query, where, limit, getDocs, collection } from "firebase/firestore";

export const useCategoryListStore = defineStore("categoryList", {
  state: () => ({
    categories: [],
  }),
  persist: true,
  getters: {
    getCategories(state) {
      return state.categories;
    },
  },
  actions: {
    async retrieveCategoryList() {
      try {
        let categoriesArray = [];

        // categoriesArray = [
        //   {
        //     title: "Cooking Gadgets",
        //     photoUrl:
        //       "https://ae-pic-a1.aliexpress-media.com/kf/S3a417784280a4979a195eae718cfe28fF.jpg_640x640Q90.jpg_.webp",
        //     urlAlias: "cooking-gadgets",
        //     active: true,
        //   },
        //   {
        //     title: "Christmas Gifts",
        //     photoUrl:
        //       "https://images.mid-day.com/images/images/2022/nov/christmas_d.jpg",
        //     urlAlias: "christmas-gifts",
        //     active: true,
        //   },
        // ];

        const categoriesQuery = query(
          collection(db, "categories"),
          where("active", "==", true),
          limit(6)
        );
        const categoriesQuerySnapshot = await getDocs(categoriesQuery);
        categoriesQuerySnapshot.forEach((doc) => {
          let docData = doc.data();
          categoriesArray.push({
            id: doc.id,
            title: docData.title,
            urlAlias: docData["url-alias"],
            active: docData.active,
            photoUrl: docData["photo-url"],
          });
        });
        this.categories = categoriesArray;
      } catch (error) {
        console.log(error);
      }
    },
  },
});
