import { defineStore } from "pinia";
import { db } from "boot/firebase";
import {
  query,
  where,
  limit,
  getDocs,
  getDoc,
  doc,
  collection,
  orderBy,
  startAfter,
  getCountFromServer,
} from "firebase/firestore";

export const useCategoryListStore = defineStore("categoryList", {
  state: () => ({
    categories: [],
    categoryCount: 0,
  }),
  persist: true,
  getters: {
    getCategories(state) {
      return state.categories;
    },
    getCategoryCount(state) {
      return state.categoryCount;
    },
  },
  actions: {
    async retrieveCategoryList() {
      try {
        if (this.categories.length > 0 && this.categoryCount > 0) {
          return;
        }
        let categoriesArray = [];

        // categoriesArray = [
        //   {
        //     id: "ghXpIOWWN6A5W2abdn8F",
        //     title: "Cooking Gadgets",
        //     photoUrl:
        //       "https://ae-pic-a1.aliexpress-media.com/kf/S3a417784280a4979a195eae718cfe28fF.jpg_640x640Q90.jpg_.webp",
        //     urlAlias: "cooking-gadgets",
        //     active: true,
        //   },
        //   {
        //     id: "vKlpISuoc8zKmHMZExxv",
        //     title: "Christmas Gifts",
        //     photoUrl:
        //       "https://images.mid-day.com/images/images/2022/nov/christmas_d.jpg",
        //     urlAlias: "christmas-gifts",
        //     active: true,
        //   },
        // ];
        const countSnapshot = await getCountFromServer(
          collection(db, "categories"),
          where("active", "==", true)
        );
        this.categoryCount = countSnapshot.data().count;
        const categoriesQuery = query(
          collection(db, "categories"),
          where("active", "==", true),
          orderBy("order", "asc"),
          limit(6)
        );
        const categoriesQuerySnapshot = await getDocs(categoriesQuery);
        categoriesQuerySnapshot.forEach((doc) => {
          let docData = doc.data();
          categoriesArray.push({
            id: doc.id,
            ...docData,
          });
        });
        this.categories = categoriesArray;
      } catch (error) {
        console.log(error);
      }
    },
    async paginateUp() {
      try {
        let categoriesArray = [];

        const lastCategoryRef = doc(
          db,
          "categories",
          this.categories[this.categories.length - 1].id
        );
        const docSnap = await getDoc(lastCategoryRef);

        const categoriesQuery = query(
          collection(db, "categories"),
          where("active", "==", true),
          limit(6),
          orderBy("order", "asc"),
          startAfter(docSnap)
        );
        const categoriesQuerySnapshot = await getDocs(categoriesQuery);
        categoriesQuerySnapshot.forEach((doc) => {
          let docData = doc.data();
          categoriesArray.push({
            id: doc.id,
            ...docData,
          });
        });
        let oldArray = this.categories;
        this.categories = oldArray.concat(categoriesArray);
      } catch (error) {
        console.log(error);
      }
    },
  },
});
