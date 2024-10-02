<template>
  <q-layout view="hHh lpR fFf" class="root-styling">
    <q-header elevated class="bg-blue-grey-9 text-teal-9 ">
      <q-toolbar class="custom-container ">
        <q-toolbar-title>
          <router-link to="/" class="text-white row items-center" style="text-decoration: none;">
            <q-avatar rounded class="q-mr-sm q-my-sm">
              <img src="/src/assets/logo-white.png">
            </q-avatar>
            <div class="gt-xs">Fernando Koji's Blog</div>
          </router-link>
        </q-toolbar-title>

        <div>
          <div class="q-gutter-sm">
            <q-btn v-if="loggedIn" color="white" @click="logout()">
              Log out
            </q-btn>
            <q-btn flat round color="white" icon="mdi-bookmark-multiple">
              <q-tooltip>
                Bookmarks
              </q-tooltip>
              <NavBarBookmarks />
            </q-btn>
            <q-btn flat round color="white" icon="mdi-receipt-text-outline" @click="goToBuylist()">
              <q-tooltip>
                Buylist
              </q-tooltip>
            </q-btn>
          </div>
        </div>
      </q-toolbar>
    </q-header>

    <q-page-container class="custom-container q-px-sm">
      <router-view />
    </q-page-container>

    <q-card class="bg-blue-grey-9 q-py-md">
      <div class="custom-container row justify-center">
        <a class="text-white" href="https://fernandokoji.dev" target="_blank" style="text-decoration: none;">
          {{
            `@${year} - Fernando Koji Yamashiro`
          }}
        </a>
      </div>
    </q-card>
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
    $q.localStorage.set("buylist", []);
  }
  if (!$q.localStorage.getItem("bookmarks")) {
    $q.localStorage.set("bookmarks", []);
  }
})

function goToBuylist() {
  router.push("/buylist");
}

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

.root-styling {
  background-color: #1c273f;
}
</style>
