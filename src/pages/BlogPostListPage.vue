<template>
  <q-page class="row">
    <div class="col">
      <q-list>
        <q-item-section class="q-py-sm">
          <q-breadcrumbs class="text-teal-2" active-color="teal-4">
            <q-breadcrumbs-el v-for="item in breadcrumbs" :key="item.label" :icon="item.icon ? item.icon : 'none'"
              :label="item.label" :to="item.to" />
          </q-breadcrumbs>
        </q-item-section>
        <q-item-section class="text-center text-teal-3 text-h4 q-pt-lg text-uppercase">
          {{ categorySelected.title }} - Posts
        </q-item-section>

        <div class="row items-start">
          <BlogPostCard v-for="blogPostItem in postsList" :key="blogPostItem.title" v-bind:postCard="blogPostItem" />
        </div>
        <div class="row justify-center">
          <q-spinner v-if="loading" size="lg" color="teal-5" />
        </div>
      </q-list>
      <div class="row justify-center q-my-md">
        <q-btn color="teal-9" class="full-width" @click="paginateUp()" v-if="postsListCount > postsList.length">Load
          more posts</q-btn>
        <p v-else class="text-subtitle2 text-teal-2">
          Showing all {{ postsListCount }} posts
        </p>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import BlogPostCard from 'src/components/BlogPostCard.vue';
import { ref, computed } from 'vue';
import { useCategorySelected } from 'stores/CategoryPostList';
import { useRouter } from "vue-router";

const store = useCategorySelected();
const router = useRouter();

let loading = ref(false);
const categorySelected = computed(() => store.getCategorySelected);
const postsList = computed(() => store.getPostList);
const postsListCount = computed(() => store.getPostListCount);


const breadcrumbs = [{
  label: "Home",
  to: "/",
  icon: "home",
},
{
  label: categorySelected.value.title,
  to: router.currentRoute.value.fullPath,
  icon: "category"
},
]

defineOptions({
  name: 'BlogPostsPage',

  async preFetch({ store, currentRoute }) {
    const categorySelectedStore = useCategorySelected(store);
    await categorySelectedStore.retrievePostList(currentRoute.params.alias);
  }
});

function paginateUp() {
  loading.value = true;
  store.paginateUp().finally(() => {
    loading.value = false;
  });
}

</script>
