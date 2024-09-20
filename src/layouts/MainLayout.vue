<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-white text-teal-9 ">
      <q-toolbar class="custom-container ">
        <q-toolbar-title>
          <router-link to="/" class="text-teal-9" style="text-decoration: none;">
            I NEEEED THAT!
          </router-link>
        </q-toolbar-title>

        <div>
          <div class="q-gutter-sm">
            <q-btn v-if="loggedIn" color="teal-9" @click="logout()">
              Log out
            </q-btn>
            <q-btn flat round color="teal-9" icon="mdi-bookmark-multiple">
              <NavBarBookmarks />
            </q-btn>
            <q-btn flat round color="teal-9" icon="mdi-cart" />
          </div>

        </div>
      </q-toolbar>
    </q-header>

    <q-page-container class="custom-container">
      <router-view />
    </q-page-container>

    <q-footer elevated class="bg-white q-py-md">
      <div class="custom-container row justify-center">
        <a class="text-teal-9" href="https://fernandokoji.dev" target="_blank" style="text-decoration: none;">
          {{
            `@${year} - Fernando Koji Yamashiro`
          }}
        </a>
      </div>
    </q-footer>
  </q-layout>
</template>

<script setup>
import NavBarBookmarks from 'src/components/NavBarBookmarks.vue';
import { useAuthenticationStore } from 'stores/LoginAuth';
import { computed, onBeforeMount } from 'vue';
import { useQuasar } from 'quasar';
import { useRouter } from "vue-router";

defineOptions({
  name: 'MainLayout'
})

const $q = useQuasar();
const store = useAuthenticationStore();
const loggedIn = computed(() => store.getLoggedIn);
const router = useRouter();

const year = new Date().getFullYear();

onBeforeMount(() => {
  if (!loggedIn.value) {
    store.checkToken();
  }
  if (!$q.localStorage.getItem("buylist")) {
    $q.localStorage.set("buylist", { amazon: [] });
  }
  if (!$q.localStorage.getItem("bookmarks")) {
    $q.localStorage.set("bookmarks", { posts: [] });
  }
})

function logout() {
  store.signOut().then(() => {
    $q.notify({
      type: 'positive',
      message: 'User logged out!'
    });
    router.push("/");
  })
}
</script>

<style lang="scss">
.custom-container {
  max-width: 980px;
  width: 100%;
  margin: 0 auto;
}
</style>
