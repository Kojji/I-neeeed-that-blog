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

        <div class="row items-start">
          <CategoryCard v-for="categoryItem in categoriesList" :key="categoryItem.title" v-bind="categoryItem" />
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
import CategoryCard from 'src/components/CategoryCard.vue';
import { ref, computed } from 'vue'
import { useCategoryListStore } from 'stores/CategoryList';

const store = useCategoryListStore();
const categoriesList = computed(() => store.getCategories);

let current = ref(1);

defineOptions({
  name: 'CategoriesPage',

  async preFetch({ store }) {
    const categoryStore = useCategoryListStore(store);
    await categoryStore.retrieveCategoryList();
  }
});



</script>
