import { defineStore } from "pinia";
import { db } from "boot/firebase";
import {
  query,
  where,
  limit,
  doc,
  getDoc,
  getDocs,
  startAfter,
  collection,
  orderBy,
  getCountFromServer,
} from "firebase/firestore";

export const useCategorySelected = defineStore("categorySelected", {
  state: () => ({
    postList: [],
    postListCount: 0,
    selectedCategory: {
      id: "",
      title: "",
      active: false,
      photoUrl: "",
      urlAlias: "",
    },
    postSelected: {
      id: "",
      title: "",
      urlAlias: "",
    },
    postContent: [],
  }),
  persist: true,
  getters: {
    getPostList: (state) => {
      return state.postList;
    },
    getPostListCount: (state) => {
      return state.postListCount;
    },
    getCategorySelected: (state) => {
      return state.selectedCategory;
    },
    getPostSelected: (state) => {
      return state.postSelected;
    },
    getPostContent: (state) => {
      return state.postContent;
    },
  },
  actions: {
    async retrievePostList(alias) {
      try {
        if (
          this.postList.length > 0 &&
          this.postListCount > 0 &&
          !!this.selectedCategory.id
        ) {
          return;
        }
        if (!this.selectedCategory.id) {
          const selectedCategoryQuery = query(
            collection(db, "categories"),
            where("urlAlias", "==", alias),
            where("active", "==", true),
            limit(1)
          );
          const selectedCategoryQuerySnapshot = await getDocs(
            selectedCategoryQuery
          );
          if (selectedCategoryQuerySnapshot.docs.length < 1) {
            throw new Error("Category not found");
          }

          let foundCategory = selectedCategoryQuerySnapshot.docs[0].data();
          let foundCategoryId = selectedCategoryQuerySnapshot.docs[0].id;

          this.selectedCategory = {
            id: foundCategoryId,
            ...foundCategory,
          };
          console.log(this.selectedCategory);
        }

        let postListArray = [];
        const countSnapshot = await getCountFromServer(
          collection(db, "categories", this.selectedCategory.id, "posts"),
          where("active", "==", true)
        );
        this.postListCount = countSnapshot.data().count;
        const postListQuery = query(
          collection(db, "categories", this.selectedCategory.id, "posts"),
          where("active", "==", true),
          orderBy("createdAt", "asc"),
          limit(10)
        );
        const postListQuerySnapshot = await getDocs(postListQuery);
        postListQuerySnapshot.forEach((doc) => {
          let docData = doc.data();
          postListArray.push({
            id: doc.id,
            ...docData,
          });
        });

        this.postList = postListArray;

        // this.postList = [
        //   {
        //     title: "Post 1",
        //     photoUrl:
        //       "https://ae-pic-a1.aliexpress-media.com/kf/S3a417784280a4979a195eae718cfe28fF.jpg_640x640Q90.jpg_.webp",
        //     urlAlias: "cooking-gadgets",
        //     author: "Fernando Koji Yamashiro",
        //     shortVersion:
        //       "<p><b>Lorem ipsum dolor sit amet</b>, consectetur adipiscing elit. Nulla elementum fermentum sagittis. Sed vehicula semper erat at porta. Phasellus urna felis, ornare eu ornare ut, efficitur vel quam. Duis id",
        //     active: true,
        //   },
        //   {
        //     title: "Christmas Gifts",
        //     photoUrl:
        //       "https://images.mid-day.com/images/images/2022/nov/christmas_d.jpg",
        //     urlAlias: "christmas-gifts",
        //     author: "Fernando Koji Yamashiro",
        //     shortVersion:
        //       "<p><b>Lorem ipsum dolor sit amet</b>, consectetur adipiscing elit. Nulla elementum fermentum sagittis. Sed vehicula semper erat at porta. Phasellus urna felis, ornare eu ornare ut, efficitur vel quam. Duis id posuere purus, sed convallis massa. Nulla viverra, libero nec mollis tincidunt, risus ante euismod ante, id pharetra erat lectus nec risus. Curabitur purus tellus, pellentesque vel arcu in, tempus tincidunt nulla. Proin vestibulum suscipit hendrerit. Fusce lacinia magna egestas finibus maximus. Aliquam bibendum leo nec leo posuere, eu sollicitudin purus interdum. Donec scelerisque aliquam orci, a maximus orci posuere pulvinar. Mauris erat elit, egestas quis hendrerit non, interdum sit amet tellus. Nunc vel mi nec ex ullamcorper commodo et nec nisi. Donec dapibus laoreet ante, id viverra mi bibendum pharetra. Donec volutpat elit ut nisl dignissim, sit amet aliquam ante mattis.<br><br>",
        //     active: true,
        //   },
        // ];
      } catch (error) {
        console.log(error);
      }
    },
    async retrievePost(categoryAlias, postAlias) {
      try {
        if (!this.selectedCategory.id) {
          const selectedCategoryQuery = query(
            collection(db, "categories"),
            where("urlAlias", "==", categoryAlias),
            where("active", "==", true),
            limit(1)
          );
          const selectedCategoryQuerySnapshot = await getDocs(
            selectedCategoryQuery
          );
          if (selectedCategoryQuerySnapshot.docs.length < 1) {
            throw new Error("Category not found");
          }

          let foundCategory = selectedCategoryQuerySnapshot.docs[0].data();
          let foundCategoryId = selectedCategoryQuerySnapshot.docs[0].id;

          this.selectedCategory = {
            id: foundCategoryId,
            ...foundCategory,
          };
          console.log(this.selectedCategory);
        }
        if (!this.postSelected.id) {
          const selectedPostQuery = query(
            collection(db, "categories", this.selectedCategory.id, "posts"),
            where("urlAlias", "==", postAlias),
            where("active", "==", true),
            limit(1)
          );
          const selectedPostQuerySnapshot = await getDocs(selectedPostQuery);
          if (selectedPostQuerySnapshot.docs.length < 1) {
            throw new Error("Post not found");
          }

          let foundPost = selectedPostQuerySnapshot.docs[0].data();
          let foundPostId = selectedPostQuerySnapshot.docs[0].id;

          this.postSelected = {
            id: foundPostId,
            ...foundPost,
          };
          console.log(this.postSelected);
        }

        let sections = [];
        const postSectionsQuery = query(
          collection(
            db,
            "categories",
            this.selectedCategory.id,
            "posts",
            this.postSelected.id,
            "sections"
          ),
          orderBy("order", "asc")
        );
        const postSectionsQuerySnapshot = await getDocs(postSectionsQuery);
        postSectionsQuerySnapshot.forEach((doc) => {
          let docData = doc.data();
          sections.push({
            id: doc.id,
            ...docData,
          });
        });
        this.postContent = sections;
      } catch (error) {
        console.log(error.toString());
      }
      // });
    },
    async paginateUp() {
      try {
        let postListArray = [];

        const lastPostRef = doc(
          db,
          "categories",
          this.selectedCategory.id,
          "posts",
          this.postList[this.postList.length - 1].id
        );
        const docSnap = await getDoc(lastPostRef);

        const postListQuery = query(
          collection(db, "categories", this.selectedCategory.id, "posts"),
          where("active", "==", true),
          limit(10),
          orderBy("createdAt", "asc"),
          startAfter(docSnap)
        );

        const postListQuerySnapshot = await getDocs(postListQuery);
        postListQuerySnapshot.forEach((doc) => {
          let docData = doc.data();
          postListArray.push({
            id: doc.id,
            ...docData,
          });
        });
        let oldArray = this.postList;
        this.postList = oldArray.concat(postListArray);
      } catch (error) {
        console.log(error);
      }
    },
  },
});
