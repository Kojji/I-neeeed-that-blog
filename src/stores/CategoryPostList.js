import { defineStore } from "pinia";
import { db } from "boot/firebase";
import { query, where, limit, getDocs, collection } from "firebase/firestore";

export const useCategorySelected = defineStore("categorySelected", {
  state: () => ({
    postList: [],
    selectedCategory: {
      id: "",
      title: "",
      active: false,
      photoUrl: "",
      urlAlias: "",
    },
  }),
  persist: true,
  getters: {
    getPostList: (state) => {
      return state.postList;
    },
    getCategorySelected: (state) => {
      return state.selectedCategory;
    },
  },
  actions: {
    async retrievePostList(alias) {
      try {
        // if (!this.selectedCategory.id) {
        //   const selectedCategoryQuery = query(
        //     collection(db, "categories"),
        //     where("url-alias", "==", alias),
        //     where("active", "==", true),
        //     limit(1)
        //   );
        //   const selectedCategoryQuerySnapshot = await getDocs(
        //     selectedCategoryQuery
        //   );
        //   if (selectedCategoryQuerySnapshot.docs.length < 1) {
        //     throw new Error("Category not found");
        //   }

        //   let foundCategory = selectedCategoryQuerySnapshot.docs[0].data();
        //   let foundCategoryId = selectedCategoryQuerySnapshot.docs[0].id;

        //   this.selectedCategory = {
        //     id: foundCategoryId,
        //     ...foundCategory,
        //   };
        //   console.log(this.selectedCategory);
        // }

        // let postListArray = [];
        // const postListQuery = query(
        //   collection(db, "categories", this.selectedCategory.id, "Posts"),
        //   where("active", "==", true),
        //   limit(10)
        // );
        // const postListQuerySnapshot = await getDocs(postListQuery);
        // postListQuerySnapshot.forEach((doc) => {
        //   let docData = doc.data();
        //   console.log(docData);
        //   postListArray.push({
        //     id: doc.id,
        //     title: docData.title,
        //     urlAlias: docData["url-alias"],
        //     active: docData.active,
        //     photoUrl: docData["photo-url"],
        //   });
        // });

        // this.postList = postListArray;

        this.postList = [
          {
            title: "Post 1",
            photoUrl:
              "https://ae-pic-a1.aliexpress-media.com/kf/S3a417784280a4979a195eae718cfe28fF.jpg_640x640Q90.jpg_.webp",
            urlAlias: "cooking-gadgets",
            author: "Fernando Koji Yamashiro",
            active: true,
          },
          {
            title: "Christmas Gifts",
            photoUrl:
              "https://images.mid-day.com/images/images/2022/nov/christmas_d.jpg",
            urlAlias: "christmas-gifts",
            author: "Fernando Koji Yamashiro",
            active: true,
          },
        ];
      } catch (error) {
        console.log(error);
      }
    },
  },
});
