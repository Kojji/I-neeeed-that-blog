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
        }

        let postListArray = [];
        const countSnapshot = await getCountFromServer(
          query(
            collection(db, "categories", this.selectedCategory.id, "posts"),
            where("active", "==", true)
          )
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

          let dateCreated = "";
          if (docData.createdAt) {
            let setdate = new Date(null);
            setdate.setTime(docData.createdAt.seconds * 1000);
            dateCreated = setdate.toLocaleDateString();
          }

          postListArray.push({
            id: doc.id,
            ...docData,
            dateCreated: dateCreated,
          });
        });

        console.log(postListArray);
        this.postList = postListArray;
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
          let dateCreated = "";

          if (foundPost.createdAt) {
            let setdate = new Date(null);
            setdate.setTime(foundPost.createdAt.seconds * 1000);
            dateCreated = setdate.toLocaleDateString();
          }

          this.postSelected = {
            id: foundPostId,
            ...foundPost,
            dateCreated: dateCreated,
          };
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
    async retrieveLinks(documentId) {
      return new Promise(async (res, rej) => {
        try {
          let links = [];
          const linksSectionQuery = query(
            collection(
              db,
              "categories",
              this.selectedCategory.id,
              "posts",
              this.postSelected.id,
              "sections",
              documentId,
              "links"
            )
          );
          const linksSectionQuerySnapshot = await getDocs(linksSectionQuery);
          linksSectionQuerySnapshot.forEach((doc) => {
            let docData = doc.data();
            links.push({
              id: doc.id,
              ...docData,
            });
          });
          res(links);
        } catch (error) {
          console.log(error.toString());
          rej(error.toString());
        }
      });
    },
  },
});
