<template>
  <q-page class="row">
    <div class="col">
      <q-list>
        <q-item-section class="q-py-sm">
          <q-breadcrumbs>
            <q-breadcrumbs-el v-for="item in breadcrumbs" :key="item.label" :icon="item.icon ? item.icon : 'none'"
              :label="item.label" :to="item.to" />
          </q-breadcrumbs>
        </q-item-section>
        <q-item-section class="text-center text-h4 q-pt-lg text-uppercase">
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
        <p v-else class="text-subtitle2 text-teal-6">
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
import { useBreadcrumbsStore } from 'stores/Breadcrumbs';

const store = useCategorySelected();
const breadcrumbsStore = useBreadcrumbsStore();

let loading = ref(false);
const categorySelected = computed(() => store.getCategorySelected);
const postsList = computed(() => store.getPostList);
const postsListCount = computed(() => store.getPostListCount);
const breadcrumbs = computed(() => breadcrumbsStore.getNavigationArray);


defineOptions({
  name: 'BlogPostsPage',

  async preFetch({ store, currentRoute }) {
    const categorySelectedStore = useCategorySelected(store);
    const breadcrumbsStore = useBreadcrumbsStore(store);

    await categorySelectedStore.retrievePostList(currentRoute.params.alias);

    const category = categorySelectedStore.getCategorySelected
    await breadcrumbsStore.$patch({
      navigationArray: [{
        label: "Home",
        to: "/",
        icon: "home",
      },
      {
        label: category.title,
        to: currentRoute.fullPath,
        icon: "category"
      }]
    });
  }
});

function paginateUp() {
  loading.value = true;
  store.paginateUp().finally(() => {
    loading.value = false;
  });
}

</script>
