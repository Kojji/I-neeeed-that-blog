import { defineStore } from "pinia";
import { db } from "boot/firebase";
import {
  setDoc,
  collection,
  addDoc,
  doc,
  getDoc,
  getDocs,
  query,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";

export const usePreviewPostStore = defineStore("previewPost", {
  state: () => ({
    postCategoryId: "",
    postSelected: {
      id: "",
      title: "",
      author: "",
      active: false,
      photoUrl: "",
      urlAlias: "",
      createdAt: "",
      shortVersion: "",
    },
    postContent: [],
  }),
  persist: true,
  getters: {
    getCategoryId: (state) => {
      return state.postCategoryId;
    },
    getPostSelected: (state) => {
      return state.postSelected;
    },
    getPostContent: (state) => {
      return state.postContent;
    },
  },
  actions: {
    createPreviewPost(categoryId) {
      return new Promise(async (res, rej) => {
        try {
          let newDocData = {
            title: "New Post",
            active: false,
            shortVersion: "",
            createdAt: serverTimestamp(),
            urlAlias: "",
            photoUrl: "",
            author: "",
          };
          const docRef = await addDoc(
            collection(db, "categories", categoryId, "posts"),
            newDocData
          );
          delete newDocData.createdAt;
          this.postSelected = {
            id: docRef.id,
            ...newDocData,
          };
          this.postCategoryId = categoryId;
          res();
        } catch (error) {
          rej(error.toString());
        }
      });
    },
    loadPreviewPost(categoryId, postId) {
      return new Promise(async (res, rej) => {
        try {
          const postRef = doc(db, "categories", categoryId, "posts", postId);
          const docSnap = await getDoc(postRef);

          if (!docSnap.exists()) {
            throw new Error("Post not found!");
          }
          let foundPost = docSnap.data();
          let foundPostId = docSnap.id;
          this.postSelected = {
            id: foundPostId,
            ...foundPost,
          };
          this.postCategoryId = categoryId;

          let sections = [];
          const postSectionsQuery = query(
            collection(
              db,
              "categories",
              categoryId,
              "posts",
              postId,
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
          res();
        } catch (error) {
          rej(error.toString());
        }
      });
    },
    editPreviewPost(updateFields) {
      return new Promise(async (res, rej) => {
        try {
          if (!this.postCategoryId || !this.postSelected.id) {
            throw new Error("Undefined post to be edited.");
          }
          const postId = updateFields.id;
          delete updateFields.id;
          await setDoc(
            doc(
              db,
              "categories",
              this.postCategoryId,
              "posts",
              this.postSelected.id
            ),
            {
              ...updateFields,
            }
          );
          this.postSelected = { id: postId, ...updateFields };
          res();
        } catch (error) {
          rej(error.toString());
        }
      });
    },
    savePostSection(updateSection, index) {
      return new Promise(async (res, rej) => {
        try {
          if (!this.postCategoryId || !this.postSelected.id) {
            throw new Error("Undefined category/post id!");
          }
          if (!updateSection.id) {
            delete updateSection.id;
            const docRef = await addDoc(
              collection(
                db,
                "categories",
                this.postCategoryId,
                "posts",
                this.postSelected.id,
                "sections"
              ),
              {
                ...updateSection,
              }
            );
            this.postContent.push({
              id: docRef.id,
              ...updateSection,
            });
          } else {
            const sectionId = updateSection.id;
            delete updateSection.id;
            await setDoc(
              doc(
                db,
                "categories",
                this.postCategoryId,
                "posts",
                this.postSelected.id,
                "sections",
                sectionId
              ),
              {
                ...updateSection,
              }
            );
            this.postSelected[index] = { id: sectionId, ...updateSection };
          }
          res();
        } catch (error) {
          rej(error.toString());
        }
      });
    },
  },
});
