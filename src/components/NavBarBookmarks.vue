<template>
  <q-menu anchor="bottom right" self="top right" @show="loadList()">
    <div class="column bg-grey-2 bookmarks-menu q-pa-sm" style="width: 360px;">
      <div class="row justify-center text-h6 q-my-sm">READ LATER</div>
      <q-separator />
      <div v-if="bookmarkList.length == 0" class="row justify-center q-pt-sm text-grey-9">
        No bookmarks found!
      </div>
      <div v-for="(item, index) in bookmarkList" :key="index" class="content-center">
        <router-link :to="item.path" class="text-grey-9" style="text-decoration: none;">
          <div class="row justify-between">
            <div class="col-11 q-pl-xs">
              {{ item.title }}
            </div>
            <div class="col-auto">
              <q-btn flat round icon="mdi-close-thick" color="red" size="xs"
                @click.stop.prevent="removeBookmark(index)"></q-btn>
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </q-menu>
</template>

<script setup>
import { ref } from 'vue';
import { useQuasar } from 'quasar';

const $q = useQuasar();

const bookmarkList = ref([]);

defineOptions({
  name: 'NavBarBookmarks'
});

function loadList() {
  let bookmarksArray = $q.localStorage.getItem("bookmarks");
  bookmarkList.value = bookmarksArray.posts;
}

function removeBookmark(index) {
  try {
    let oldArray = [];
    let localStorageData = $q.localStorage.getItem("bookmarks");
    oldArray = localStorageData.posts;

    oldArray.splice(index, 1);
    $q.localStorage.set("bookmarks", { posts: oldArray });
    bookmarkList.value = oldArray;
    $q.notify({
      type: 'positive',
      message: 'Post removed!'
    })
  } catch (e) {
    console.log(e)
  }
};
</script>

<style lang="scss" scoped>
.bookmarks-menu {
  font-family: "Averia Serif Libre", Helvetica, Arial, sans-serif;
  font-weight: 400;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
