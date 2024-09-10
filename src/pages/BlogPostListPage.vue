<template>
  <q-page class="row">
    <div class="col">
      <q-list>
        <q-item-section class="text-center text-h4 q-pt-lg text-uppercase">
          {{ categorySelected.title }} - Posts
        </q-item-section>

        <div class="row items-start">
          <BlogPostCard v-for="categoryItem in postsList" :key="categoryItem.title" v-bind="categoryItem" />
        </div>
      </q-list>
      <div class="row justify-center q-ma-md">
        <q-pagination v-model="current" :max="1" :max-pages="5" gutter="sm" direction-links outline color="teal-9"
          active-design="unelevated" active-color="teal-9" active-text-color="white" />
      </div>
    </div>
  </q-page>
</template>

<script setup>
import BlogPostCard from 'src/components/BlogPostCard.vue';
import { ref, computed } from 'vue';
import { useCategorySelected } from 'stores/CategoryPostList';

const store = useCategorySelected();

let current = ref(1);
const categorySelected = computed(() => store.getCategorySelected);
const postsList = computed(() => store.getPostList);

defineOptions({
  name: 'BlogPostsPage',

  async preFetch({ store, currentRoute }) {
    const categorySelectedStore = useCategorySelected(store);
    await categorySelectedStore.retrievePostList(currentRoute.params.alias);
    console.log("blog post list page prefetch");
    // retrieve post list from db
  }
});

</script>
