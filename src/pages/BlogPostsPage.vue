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
import { ref, computed } from 'vue'
import { useRoute } from "vue-router";
import { useCategorySelected } from 'src/stores/BlogNavigation';

const store = useCategorySelected();
const route = useRoute();

let current = ref(1);
const categorySelected = computed(() => store.getCategorySelected);

defineOptions({
  name: 'BlogPostsPage'
});

console.log(categorySelected)
console.log(route.params)

const postsList = [
  {
    title: 'Post 1',
    photoUrl: 'https://ae-pic-a1.aliexpress-media.com/kf/S3a417784280a4979a195eae718cfe28fF.jpg_640x640Q90.jpg_.webp',
    urlAlias: 'cooking-gadgets',
    active: true
  },
  {
    title: 'Christmas Gifts',
    photoUrl: 'https://images.mid-day.com/images/images/2022/nov/christmas_d.jpg',
    urlAlias: 'christmas-gifts',
    active: true
  },
];
</script>
