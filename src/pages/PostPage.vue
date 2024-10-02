<template>
  <q-page class="row post-container">
    <div class="col">
      <q-item-section class="q-py-sm">
        <q-breadcrumbs class="text-grey" active-color="teal-9">
          <q-breadcrumbs-el v-for="item in breadcrumbs" :key="item.label" :icon="item.icon ? item.icon : null"
            :label="item.label" :to="item.to" />
        </q-breadcrumbs>
      </q-item-section>
      <p class="text-h4 text-weight-bolder q-mt-lg">
        {{ postSelected.title }}
      </p>
      <p class="text-subtitle2 text-blue-grey-6 text-weight-medium q-mb-lg">
        Written in {{ createdAtComputed }}
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
import { useRouter } from "vue-router";
import { useCategorySelected } from 'stores/CategoryPostList';
import PostSection from 'src/components/PostSection.vue';


const store = useCategorySelected();
const router = useRouter();

const postSelected = computed(() => store.getPostSelected);
const postSection = computed(() => store.getPostContent);
const category = computed(() => store.getCategorySelected);

const breadcrumbs = [{
  label: "Home",
  to: "/",
  icon: "home",
},
{
  label: category.value.title,
  to: "/category/" + router.currentRoute.value.params.alias,
  icon: "category"
},
{
  label: postSelected.value.title,
  to: router.currentRoute.value.fullPath,
  icon: "article"
},
]

defineOptions({
  name: 'PostPage',

  async preFetch({ store, currentRoute }) {
    const postSelectedStore = useCategorySelected(store);
    await postSelectedStore.retrievePost(currentRoute.params.alias, currentRoute.params.id);
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

const createdAtComputed = computed(() => {
  let setdate = new Date(null);
  setdate.setTime(postSelected.value.createdAt.seconds * 1000);
  return setdate.toLocaleDateString();
})


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
