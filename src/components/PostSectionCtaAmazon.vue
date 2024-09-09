<template>
  <div class="row justify-center">
    <div class="col-11">
      <q-card class="col" flat bordered>
        <q-card-section class="bg-teal-1 text-grey-8 text-h6 text-weight-bold">
          Find it on Amazon
        </q-card-section>
        <q-separator />
        <q-card-section v-for="productCard in productsFetch" :key="productCard.ASIN"
          class="row justify-between q-pa-xs items-center">
          <q-img style="max-width: 100px;" :src="productCard.URL"></q-img>

          <q-card-section class="col">
            <div><a :href="productCard.DetailPageURL" target="_blank" style="text-decoration: none;">
                {{ productCard.DisplayValue }}
              </a></div>
            <div>{{ productCard.DisplayAmount }} {{ productCard.Currency }}</div>
          </q-card-section>
          <q-card-section>
            <q-checkbox v-model="checkboxArray" :val="productCard.ASIN" color="orange" />
          </q-card-section>
        </q-card-section>
        <q-separator inset />
        <q-card-section class="row justify-end q-px-md">
          <!-- <q-btn>add to buylist</q-btn> -->
          <q-btn color="orange">add to cart button</q-btn>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useAmazonCtaSectionStore } from 'stores/SectionCtaAmazon';

const store = useAmazonCtaSectionStore();
const checkboxArray = ref([]);

const props = defineProps({
  products: {
    type: Array,
    required: true
  },
});

const productsFetch = computed(() => store.getProducts);
console.log(productsFetch)

onMounted(async () => {
  await store.retrieveProducts(props.products);
})

defineOptions({
  name: 'PostSectionCtaAmazon',

  // prefetch on child component not working
  // async preFetch({ store }) {
  //   console.log("on prefetch")
  //   const amazonCtaStore = useAmazonCtaSectionStore(store);
  //   await amazonCtaStore.retrieveProducts();
  // }
});
</script>

<style lang="scss"></style>
