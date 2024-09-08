<template>
  <div class="col-12">
    <PostSectionCtaAmazon v-if="props.origin === 'Amazon'" v-bind:products="props.products" />
  </div>
</template>

<script setup>
import PostSectionCtaAmazon from './PostSectionCtaAmazon.vue';

defineOptions({
  name: 'PostSectionCta'
});

const props = defineProps({
  order: {
    type: Number,
    required: false
  },
  type: {
    type: String,
    required: true
  },
  origin: {
    type: String,
    required: true
  },
  products: {
    type: Array,
    required: true
  },
});

</script>

<style lang="scss"></style>
