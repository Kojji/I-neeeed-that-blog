<template>
  <q-card flat bordered class="post-card q-ma-xs cursor-pointer" @click="navigateToPostPage(props.postCard.urlAlias)">
    <q-card-section class="row">
      <q-card-section class="col-12 col-sm-4 flex flex-center">
        <q-img class="rounded-borders" :src="props.postCard.photoUrl" :ratio="16 / 9">
          <div class="text-h6 text-center">
            Article
          </div>
        </q-img>
      </q-card-section>
      <q-card-section class="col-12 col-sm-7">
        <div class="text-h5 row">
          <div class="col-11">
            {{ props.postCard.title }}
          </div>
          <div class="col-1">
            <q-btn flat round color="teal-9" icon="mdi-bookmark-plus-outline" @click.stop="addToBookmarks()" />
          </div>
        </div>
        <div class="text-subtitle2 text-grey-8 q-mb-sm">
          written by <b>{{ props.postCard.author }}</b>
        </div>
        <div class="text-body2 card-text-section" v-html="props.postCard.shortVersion">
        </div>
      </q-card-section>
    </q-card-section>
  </q-card>

</template>

<script setup>
import { useCategorySelected } from 'stores/CategoryPostList';
import { useRouter } from "vue-router";
import { useQuasar } from 'quasar';

const $q = useQuasar();
const router = useRouter();
const store = useCategorySelected();

defineOptions({
  name: 'BlogPostCard'
});

const props = defineProps({
  postCard: {
    id: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    photoUrl: {
      type: String,
      default: ''
    },
    author: {
      type: String,
      default: ''
    },
    urlAlias: {
      type: String,
      default: ''
    },
    shortVersion: {
      type: String,
      default: ''
    },
    active: {
      type: Boolean,
      default: false
    },
  },
  redirectOnCLick: {
    type: Boolean,
    default: true
  }
});

async function navigateToPostPage(params) {
  if (props.redirectOnCLick) {
    await store.$patch({
      postSelected: {
        id: props.postCard.id,
        title: props.postCard.title,
        urlAlias: props.postCard.urlAlias
      }
    });
    router.push(router.currentRoute.value.fullPath + '/post/' + params)
  }
};

function addToBookmarks() {
  try {
    let oldArray = [];
    let localStorageData = $q.localStorage.getItem("bookmarks");
    oldArray = localStorageData.posts;

    oldArray.push({
      id: props.postCard.id,
      path: router.currentRoute.value.fullPath + '/post/' + props.postCard.urlAlias,
      title: props.postCard.title
    })
    $q.localStorage.set("bookmarks", { posts: oldArray });
    $q.notify({
      type: 'positive',
      message: 'Post bookmarked!'
    })
  } catch (e) {
    console.log(e)
  }
}
</script>

<style lang="scss">
.post-card {
  width: 100%;
  background: rgb(255, 255, 255);
  background: linear-gradient(5deg, rgb(177, 204, 201) 40%, rgba(255, 255, 255, 1) 60%) top;
  background-size: 100% 250%;
  transition: background-position 0.25s ease-in;

  &:hover {
    background-position: bottom;
  }
}

.card-text-section {
  font-family: sans-serif, Helvetica, Arial, sans-serif;
  font-weight: 400;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
