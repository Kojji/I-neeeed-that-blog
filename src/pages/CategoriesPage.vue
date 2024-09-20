<template>
  <q-page class="row">
    <div class="col">
      <q-list>
        <q-item-section class="text-center text-h4 q-pt-lg text-uppercase">
          Categories
        </q-item-section>
        <q-item-label header>
          Check out our posts according to what interests you
        </q-item-label>

        <div class="row items-start q-col-gutter-sm">
          <CategoryCard v-for="categoryItem in categoriesList" :key="categoryItem.title" v-bind="categoryItem" />
        </div>
        <div class="row justify-center">
          <q-spinner v-if="loading" size="lg" color="teal-5" />
        </div>
      </q-list>
      <div class="row justify-center q-my-md">
        <q-btn color="teal-9" class="full-width" @click="paginateUp()" v-if="categoryCount > categoriesList.length">Load
          more categories</q-btn>
        <p v-else class="text-subtitle2 text-teal-6">
          Showing all {{ categoryCount }} categories
        </p>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import CategoryCard from 'src/components/CategoryCard.vue';
import { ref, computed } from 'vue';
import { useCategoryListStore } from 'stores/CategoryList';

const store = useCategoryListStore();
const categoriesList = computed(() => store.getCategories);
const categoryCount = computed(() => store.getCategoryCount);

let loading = ref(false);

defineOptions({
  name: 'CategoriesPage',

  async preFetch({ store }) {
    const categoryStore = useCategoryListStore(store);
    await categoryStore.retrieveCategoryList();
  }
});

function paginateUp() {
  loading.value = true;
  store.paginateUp().finally(() => {
    loading.value = false;
  });
}
</script>
