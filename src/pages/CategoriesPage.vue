<template>
  <q-page class="row">
    <div class="col">
      <section class="row main-banner">
        <div class="col-10 col-md-6 offset-1 content-center">
          <div>
            <div class="text-teal-1 banner-title">
              WELCOME
            </div>
            <div class="text-teal-1 banner-text">
              This my personal blog, a vibrant hub where creativity and playful curiosity converge. As an avid
              enthusiast of arts and crafts, photography, and the fascinating world of gashapon and blind boxes toys,
              this space is
              dedicated to exploring and sharing the joy these hobbies and interests bring.<br>
              So let’s embark on a journey of creativity and
              delightful surprises together!
            </div>
          </div>
        </div>
      </section>
      <section>
        <q-list>
          <q-item-section class="text-center banner-title q-pt-lg text-uppercase text-teal-1">
            Categories
          </q-item-section>
          <!-- <q-item-label class="text-teal-3" header>
            Check out our posts according to what interests you
          </q-item-label> -->

          <div class="row items-start q-col-gutter-sm">
            <CategoryCard v-for="categoryItem in categoriesList" :key="categoryItem.title" v-bind="categoryItem" />
          </div>
          <div class="row justify-center">
            <q-spinner v-if="loading" size="lg" color="teal-5" />
          </div>
        </q-list>
        <div class="row justify-center q-my-md">
          <q-btn color="teal-9" class="full-width" @click="paginateUp()"
            v-if="categoryCount > categoriesList.length">Load
            more categories</q-btn>
          <p v-else class="text-subtitle2 text-teal-2">
            Showing all {{ categoryCount }} categories
          </p>
        </div>
      </section>
      <section class="q-mb-lg">
        <div class="text-center banner-title q-pt-lg text-uppercase text-teal-1">
          Extra features
        </div>
        <div class="row q-mx-auto" style="max-width: 560px;">
          <div class="col-6 q-px-xs">
            <q-card class="bg-blue-grey-7">
              <q-card-section class="row justify-center">
                <q-icon name="mdi-bookmark-multiple" size="90px" color="white" />
              </q-card-section>
              <q-card-section class="text-teal-1">
                Save posts for later with the icon <q-icon name="mdi-bookmark-plus-outline" size="md" /> and easily
                access them on the top of the page.
              </q-card-section>
            </q-card>
          </div>
          <div class="col-6 q-px-xs">
            <q-card class="bg-blue-grey-7">

              <q-card-section class="row justify-center">
                <q-icon name="mdi-receipt-text-outline" size="90px" color="white" />
              </q-card-section>
              <q-card-section class="text-teal-1">
                You can save products I mention with the icon <q-icon name="mdi-receipt-text-plus-outline" size="md" />
                and create your own buylist.
              </q-card-section>
            </q-card>
          </div>
        </div>
      </section>
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

// const breadcrumbs = [{
//   label: "Home",
//   to: "/",
//   icon: "home",
// },
// ]

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

<style lang="scss">
.main-banner {
  background-image: url("../assets/banner-background-effect.png");
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  min-height: 250px;
}

.banner-title {
  font-size: 1.75em;
}

.banner-text {
  font-size: 1.125em;
}

@media (min-width: 598px) {
  .main-banner {
    background-image: url("../assets/banner-background-effect.png");
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
    min-height: 350px;
  }

  .banner-title {
    font-size: 2.250em;
  }

  .banner-text {
    font-size: 1.275em;
  }

}

@media (min-width: 1024px) {
  .main-banner {
    background-image: url("https://firebasestorage.googleapis.com/v0/b/bundled-articles.appspot.com/o/stickers_background.png?alt=media&token=302ca831-cb31-447c-956f-de8e818a7c0c"), url("../assets/banner-background-effect.png");
    background-repeat: no-repeat, no-repeat;
    background-position: right, center;
    background-size: contain, contain;
    min-height: 500px;
  }

  .banner-title {
    font-size: 2.750em;
  }
}
</style>
