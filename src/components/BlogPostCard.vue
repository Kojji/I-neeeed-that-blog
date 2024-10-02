<template>
  <router-link :to="router.currentRoute.value.fullPath + '/post/' + props.postCard.urlAlias" class="col-12"
    style="text-decoration: none;">
    <q-card flat bordered class="post-card  q-ma-xs" @click="loadPostSelected()">
      <q-card-section class="row">
        <div class="col-12 col-sm-4 flex flex-center">
          <img v-if="props.postCard.photoUrl" :src="props.postCard.photoUrl" class="rounded-borders post-card-image" />
          <img v-else src="/src/assets/image-not-found.jpg" class="rounded-borders post-card-image" />
        </div>
        <div class="col-12 col-sm-8 q-px-sm">
          <div class="text-h5 row">
            <div class="col-11 text-teal-1">
              {{ props.postCard.title }}
            </div>
            <div class="col-1">
              <q-btn flat round color="teal-1" icon="mdi-bookmark-plus-outline" size="md"
                @click.stop.prevent="addToBookmarks()" />
            </div>
          </div>
          <div class="text-subtitle2 text-teal-2 q-mb-sm">
            Written in {{ props.postCard.dateCreated }}
          </div>
          <div class="text-body2 card-text-section text-teal-1" v-html="props.postCard.shortVersion">
          </div>
        </div>

      </q-card-section>
    </q-card>
  </router-link>

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
    dateCreated: {
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

async function loadPostSelected() {
  if (props.redirectOnCLick) {
    await store.$patch({
      postSelected: {
        id: props.postCard.id,
        title: props.postCard.title,
        urlAlias: props.postCard.urlAlias
      }
    });
  }
};

function addToBookmarks() {
  try {
    let oldArray = [];
    let localStorageData = $q.localStorage.getItem("bookmarks");
    oldArray = localStorageData;

    oldArray.push({
      id: props.postCard.id,
      path: router.currentRoute.value.fullPath + '/post/' + props.postCard.urlAlias,
      title: props.postCard.title
    })
    $q.localStorage.set("bookmarks", oldArray);
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
  background: rgb(50, 71, 79);
  background: linear-gradient(5deg, rgb(9, 34, 31) 40%, rgb(50, 71, 79) 60%) top;
  background-size: 100% 250%;
  transition: background-position 0.25s ease-in;

  &:hover {
    background-position: bottom;
  }
}

.post-card-image {
  vertical-align: top;
  object-fit: cover;
  width: 100%;
  aspect-ratio: 16/9;
  opacity: 0.75;
}

.card-text-section {
  font-family: sans-serif, Helvetica, Arial, sans-serif;
  font-weight: 400;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
