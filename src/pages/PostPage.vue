<template>
  <q-page class="row">
    <div class="col">
      {{ postSelected.title }}
      Post
      <q-list>

        <PostSection v-for="section in postSection" :key="section.order" />

      </q-list>
    </div>
  </q-page>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from "vue-router";
import { usePostSelectedStore } from 'stores/BlogPost';
import PostSection from 'src/components/PostSection.vue';


const store = usePostSelectedStore();
const route = useRoute();

const postSelected = computed(() => store.getPostSelected);

defineOptions({
  name: 'PostPage'
});

console.log(postSelected.value)
console.log(route.params)

const postSection = [{
  order: 1,
  type: "text",
  data: "texto 1"
},
{
  order: 2,
  type: "text",
  data: "texto 2"
}];
</script>
