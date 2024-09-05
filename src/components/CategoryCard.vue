<template>
  <q-card class="my-card col-6 col-md-4 q-pa-sm" @click="navigateToPostList(urlAlias)">
    <q-img :src="props.photoUrl" :ratio="16 / 9">
      <div class="col content-center subtitle-section text-h6 text-center">
        {{ props.title }}
      </div>
    </q-img>
  </q-card>
</template>

<script setup>
import { useRouter } from "vue-router";
import { useCategorySelectedStore } from 'stores/BlogNavigationStore';

const router = useRouter();
const store = useCategorySelectedStore();

defineOptions({
  name: 'CategoryCard'
})

const props = defineProps({
  title: {
    type: String,
    required: true
  },

  photoUrl: {
    type: String,
    default: ''
  },

  urlAlias: {
    type: String,
    required: true
  },

  active: {
    type: Boolean,
    default: false
  }
})

async function navigateToPostList(params) {
  await store.$patch({
    title: props.title,
    active: props.active,
    photoUrl: props.photoUrl,
    shortVersion: "",
  })
  console.log(params)
  router.push('/category/' + params)
}
</script>

<style lang="scss">
.my-card {
  width: 100%;
  box-shadow: none !important;

  &:hover .subtitle-section {
    height: 100%;
  }
}

.subtitle-section {
  bottom: 0;
  width: 100%;
  height: 10%;
  min-height: 40px;
  padding: 0 !important;
  color: #fff;
  background: rgba(0, 0, 0, 0.47);
  transition: all 0.3s ease-in-out;

}
</style>
