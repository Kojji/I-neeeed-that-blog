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
      <q-card-section class="col-12 col-sm-8">
        <div class="text-h5">
          {{ props.postCard.title }}
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
import { usePostSelectedStore } from 'stores/BlogPost';
import { useRouter } from "vue-router";
const router = useRouter();
const store = usePostSelectedStore();

defineOptions({
  name: 'BlogPostCard'
});

const props = defineProps({
  postCard: {
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
        title: props.title,
        urlAlias: props.urlAlias
      }
    });
    router.push(router.currentRoute.value.fullPath + '/post/' + params)
  }
};
</script>

<style lang="scss">
.post-card {
  width: 100%;
  background: rgb(255, 255, 255);
  background: linear-gradient(142deg, rgba(255, 255, 255, 1) 30%, rgba(52, 167, 153, 1) 50%, rgba(255, 255, 255, 1) 61%) right;
  background-size: 300% 100%;
  transition: background-position 0.4s ease-in;

  &:hover {
    background-position: left;
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
