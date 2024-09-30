<template>
  <div class="col-12">
    <q-card class="col" flat bordered>
      <q-card-section class="bg-teal-1 text-grey-8 text-h6 text-weight-bold">
        Find it online
      </q-card-section>
      <q-separator />
      <q-card-section v-for="productCard, index in linksFetch" :key="productCard.id"
        class="row justify-between q-pa-xs items-center">
        <q-img style="max-width: 100px;" :src="productCard.imageUrl"></q-img>

        <q-card-section class="col">
          <div class=""><a :href="productCard.redirect" target="_blank" style="text-decoration: none;">
              {{ productCard.title }} <q-icon left size="xs" name="open_in_new" />
            </a></div>
        </q-card-section>
        <q-card-section>
          <q-btn flat round color="teal-9" icon="mdi-receipt-text-plus-outline" @click="saveToCart(index)">
            <q-tooltip>
              Add to buylist
            </q-tooltip>
          </q-btn>
        </q-card-section>
      </q-card-section>
      <q-separator inset />
      <!-- <q-card-section class="column items-end q-px-md">
        <q-btn color="orange" @click="saveToCart()"><q-icon left size="sm" name="add_shopping_cart" />add to
          buylist</q-btn>
      </q-card-section> -->


    </q-card>
  </div>
</template>

<script setup>
import { useCategorySelected } from 'stores/CategoryPostList';
import { ref, computed, onMounted } from 'vue'
import { useQuasar } from 'quasar';

defineOptions({
  name: 'PostSectionCta'
});

const props = defineProps({
  id: {
    type: String,
    required: true
  },
  order: {
    type: Number,
    required: false
  },
  type: {
    type: String,
    required: true
  }
});

const $q = useQuasar();
const store = useCategorySelected();
const linksFetch = ref([]);

onMounted(async () => {
  linksFetch.value = await store.retrieveLinks(props.id);
})

function saveToCart(index) {
  try {

    let oldArray = $q.localStorage.getItem("buylist");


    oldArray.push({
      ...linksFetch.value[index]
    })

    $q.localStorage.set("buylist", oldArray);
    $q.notify({
      type: 'positive',
      message: 'Products added to cart!'
    })
  } catch (e) {
    console.log(e)
  }

}

</script>

<style lang="scss"></style>
