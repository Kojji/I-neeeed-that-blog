import { defineStore } from "pinia";
import { auth } from "boot/firebase";
import {
  signInWithEmailAndPassword,
  setPersistence,
  browserSessionPersistence,
  // inMemoryPersistence,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

export const useAuthenticationStore = defineStore("loginAuthentication", {
  state: () => ({
    loggedIn: false,
    userUid: null,
  }),

  getters: {
    getLoggedIn: (state) => {
      return state.loggedIn;
    },
  },
  actions: {
    signIn(email, password) {
      return new Promise((res, rej) => {
        setPersistence(auth, browserSessionPersistence)
          // setPersistence(auth, inMemoryPersistence)
          .then(() => {
            signInWithEmailAndPassword(auth, email, password)
              .then((result) => {
                this.loggedIn = true;
                this.userUid = result.user.uid;
                res();
              })
              .catch((error) => {
                rej(error.code);
              });
          });
      });
    },
    checkToken() {
      return new Promise(async (res, rej) => {
        await onAuthStateChanged(auth, (user) => {
          if (user) {
            this.loggedIn = true;
            this.userUid = user.uid;
            res();
          } else {
            rej({ message: "User session expired!" });
          }
        });
      });
    },
    signOut() {
      return new Promise((res, rej) => {
        signOut(auth)
          .then(() => {
            this.loggedIn = false;
            this.userUid = null;
            res();
          })
          .catch(() => {
            rej();
          });
      });
    },
  },
});
