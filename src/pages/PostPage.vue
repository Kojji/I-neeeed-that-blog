<template>
  <q-page class="row post-container">
    <div class="col">
      <q-item-section class="q-py-sm">
        <q-breadcrumbs>
          <q-breadcrumbs-el v-for="item in breadcrumbs" :key="item.label" :icon="item.icon ? item.icon : null"
            :label="item.label" :to="item.to" />
        </q-breadcrumbs>
      </q-item-section>
      <p class="text-h4 text-weight-bolder q-my-lg">
        {{ postSelected.title }}
      </p>
      <q-separator color="teal-9" inset />
      <q-list>
        <PostSection v-for="section in postSection" :key="section.order" v-bind:section="section" />
      </q-list>
    </div>
  </q-page>
</template>

<script setup>
import { computed } from 'vue';
import { useCategorySelected } from 'stores/CategoryPostList';
import { useBreadcrumbsStore } from 'stores/Breadcrumbs';
import PostSection from 'src/components/PostSection.vue';


const store = useCategorySelected();
const breadcrumbsStore = useBreadcrumbsStore();

const postSelected = computed(() => store.getPostSelected);
const postSection = computed(() => store.getPostContent);
const breadcrumbs = computed(() => breadcrumbsStore.getNavigationArray);


defineOptions({
  name: 'PostPage',

  async preFetch({ store, currentRoute }) {
    const postSelectedStore = useCategorySelected(store);
    const breadcrumbsStore = useBreadcrumbsStore(store);

    await postSelectedStore.retrievePost(currentRoute.params.alias, currentRoute.params.id);

    const category = postSelectedStore.getCategorySelected
    const post = postSelectedStore.getPostSelected
    await breadcrumbsStore.$patch({
      navigationArray: [{
        label: "Home",
        to: "/",
        icon: "home",
      },
      {
        label: category.title,
        to: "/category/" + currentRoute.params.alias,
        icon: "category"
      },
      {
        label: post.title,
        to: currentRoute.fullPath,
        icon: "category"
      },
      ]
    });
  }
});

/* data types
    embed
      links
      origin
      label
    text
      data
    image
      link
      alt
      ratio
      col
    cta
      products
      origin
    title
      data
      identifier

    compare *
*/
</script>

<style lang="scss">
.post-container {
  max-width: 720px;
  width: 100%;
  margin: 0 auto;

  font-family: sans-serif, Helvetica, Arial, sans-serif;
  font-weight: 400;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
