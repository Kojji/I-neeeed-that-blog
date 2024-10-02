<template>
  <router-link :to="'/category/' + props.urlAlias" class="col-6 col-md-4">
    <div class="category-card" @click="loadCategorySelected()">
      <img v-if="props.photoUrl" :src="props.photoUrl" class="category-card-image" />
      <img v-else src="/src/assets/image-not-found.jpg" class="category-card-image" />
      <div class="overlay column">
        <div class="subtitle-section text-h6 text-center">{{ props.title }}</div>
      </div>
    </div>
  </router-link>
</template>

<script setup>
import { useCategorySelected } from 'stores/CategoryPostList';

const store = useCategorySelected();

defineOptions({
  name: 'CategoryCard'
});

const props = defineProps({
  id: {
    type: String,
    required: true
  },

  title: {
    type: String,
    required: true
  },

  photoUrl: {
    type: String,
    default: ''
  },

  urlAlias: {
    type: String,
    required: true
  },

  active: {
    type: Boolean,
    default: false
  }
});

async function loadCategorySelected() {
  await store.$patch({
    selectedCategory: {
      id: props.id,
      title: props.title,
      active: props.active,
      photoUrl: props.photoUrl,
      urlAlias: props.urlAlias
    }
  })
};
</script>

<style lang="scss">
.category-card-image {
  vertical-align: top;
  object-fit: cover;
  width: 100%;
  max-width: 640px;
  aspect-ratio: 16/9;
}

.overlay {
  position: absolute;
  overflow: hidden;
  bottom: 0;
  width: 100%;
  max-width: 640px;
  height: 10%;
  min-height: 40px;
  color: #fff;
  background: rgba(0, 0, 0, 0.57);
  transition: all 0.3s ease-in-out;
}


.category-card {
  width: 100%;
  max-width: 640px;
  position: relative;

  &:hover .overlay {
    height: 100%;
  }
}

.subtitle-section {
  margin: auto;
}
</style>
