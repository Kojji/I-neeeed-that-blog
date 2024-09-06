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
import CategoryCard from 'src/components/CategoryCard.vue';
import { ref } from 'vue'
import { db } from 'boot/firebase';
import {
  query,
  where,
  limit,
  getDocs,
  collection
} from "firebase/firestore"

defineOptions({
  name: 'CategoriesPage'
});

const categoriesList = ref([]);

let categoriesArray = [];
const categoriesQuery = query(collection(db, "categories"), where("active", "==", true), limit(6))
getDocs(categoriesQuery)
  .then((categoriesQuerySnapshot) => {
    categoriesQuerySnapshot.forEach((doc) => {
      let docData = doc.data()
      categoriesArray.push({
        id: doc.id,
        title: docData.title,
        urlAlias: docData['url-alias'],
        active: docData.active,
        photoUrl: docData['photo-url']
      })
    });
    console.log(categoriesArray)
    categoriesList.value = categoriesArray;
  }).catch(error => {
    console.log(error);
  })

</script>
