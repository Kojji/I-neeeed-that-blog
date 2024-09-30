<template>
  <q-page class="row buylist-container">
    <div class="col">
      <q-item-section class="q-py-sm">
        <q-breadcrumbs class="text-grey" active-color="teal-9">
          <q-breadcrumbs-el v-for="item in breadcrumbs" :key="item.label" :icon="item.icon ? item.icon : null"
            :label="item.label" :to="item.to" />
        </q-breadcrumbs>
      </q-item-section>
      <p class="text-center text-h4 q-pt-lg text-uppercase">
        My Buylist
      </p>
      <q-separator color="teal-9" inset />
      <div class="row ">
        <div class="col-6 q-pa-xs" v-for="productCard, index in buylistOthers" :key="index" tabindex="0">

          <!-- <q-card class="full-height content-end"> -->
          <q-card>
            <q-card-section>
              <q-img style="max-height: 200px;" fit="scale-down" :src="productCard.imageUrl">
                <div class="absolute-bottom text-subtitle2">
                  {{ productCard.title }}
                </div>
              </q-img>
              <div class="row justify-between q-pt-sm items-center">
                <div class="col-9 col-sm-10">

                  <q-btn class="full-width" :href="productCard.redirect" target="blank" color="teal-8" size="sm">
                    <q-icon left name="open_in_new" />
                    <div>Go to website</div>
                  </q-btn>
                </div>
                <q-btn flat round icon="mdi-close-thick" color="red-5" size="sm"
                  @click.stop.prevent="removeBookmark(index)"></q-btn>
              </div>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useQuasar } from 'quasar';

const $q = useQuasar();

const buylistOthers = ref([]);

const breadcrumbs = [{
  label: "Home",
  to: "/",
  icon: "home",
},
{
  label: "Buylist",
  to: "/buylist",
  icon: "receipt_long"
},
]

defineOptions({
  name: 'BuylistPage'
});

onMounted(async () => {
  buylistOthers.value = $q.localStorage.getItem("buylist");
})

function removeBookmark(index) {
  try {
    let oldArray = $q.localStorage.getItem("buylist");

    oldArray.splice(index, 1);
    $q.localStorage.set("buylist", oldArray);
    buylistOthers.value = oldArray;
    $q.notify({
      type: 'positive',
      message: 'Item removed!'
    })
  } catch (e) {
    console.log(e)
  }
};
</script>

<style lang="scss" scoped>
.buylist-container {
  max-width: 720px;
  width: 100%;
  margin: 0 auto;
}

.example-masonry {

  .flex-break {
    flex: 1 0 100% !important;
    width: 0 !important;
  }

  // $x: 4

  // @for $i from 1 through ($x - 1)
  //   .example-container > div:nth-child(#{$x}n + #{$i})
  //     order: #{$i}

  // .example-container > div:nth-child(#{$x}n)
  //   order: #{$x}

  // .example-container
  //   height: 700px

  // .example-cell
  //   width: 25%
  //   padding: 1px

  //   > div
  //     padding: 4px 8px
  //     box-shadow: inset 0 0 0 2px #9e9e9e
}
</style>
