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
    </div>
  </q-page>
</template>

<script setup>
defineOptions({
  name: 'CategoriesPage'
});

import CategoryCard from 'src/components/CategoryCard.vue';

const categoriesList = [
  {
    title: 'Cooking Gadgets',
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
