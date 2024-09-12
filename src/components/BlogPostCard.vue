<template>
  <q-card flat bordered class="post-card col-12 q-ma-xs" @click="navigateToPostPage(urlAlias)">
    <q-card-section horizontal>
      <q-card-section class="col-4 flex flex-center">
        <q-img class="rounded-borders" :src="props.photoUrl" :ratio="16 / 9">
          <div class="text-h6 text-center">
            Article
          </div>
        </q-img>
      </q-card-section>
      <q-card-section>
        <div class="text-h5">
          {{ props.title }}
        </div>
        <div v-html="props.shortVersion">
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
  name: 'CategoryCard'
});

const props = defineProps({
  title: {
    type: String,
    default: ''
  },

  photoUrl: {
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
  redirectOnCLick: {
    type: Boolean,
    default: true
  }
});

async function navigateToPostPage(params) {
  if (props.redirectOnCLick) {
    console.log(params)
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
</style>
