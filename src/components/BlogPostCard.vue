<template>
  <q-card flat bordered class="my-card col-12 q-ma-xs" @click="navigateToPostPage(urlAlias)">
    <q-card-section horizontal>
      <q-card-section class="col-4 flex flex-center">
        <q-img class="rounded-borders" :src="props.photoUrl" :ratio="16 / 9">
          <div class="text-h6 text-center">
            Article
          </div>
        </q-img>
      </q-card-section>
      <q-card-section>
        {{ props.title }} - Author - Date - likes
      </q-card-section>
    </q-card-section>
  </q-card>
</template>

<script setup>
import { useRouter } from "vue-router";
const router = useRouter();

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

function navigateToPostPage(params) {
  console.log(params)
  // router.push('/category/' + params)
}
</script>

<style lang="scss">
.my-card {
  width: 100%;
}

.subtitle-section {
  bottom: 0;
  width: 100%;
  height: 10%;
  min-height: 40px;
  padding: 0 !important;
  color: #fff;
  background: rgba(0, 0, 0, 0.47);

}
</style>
