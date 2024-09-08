<template>
  <div class="row justify-center">
    <q-card flat bordered :class="`col-${props.col} text-center`">
      <q-img :ratio="`${props.ratio}`" :src="props.link" :alt="props.alt" />
      <q-card-section v-if="props.label" class="text-caption">
        Image: {{ props.label }}
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup>

defineOptions({
  name: 'PostSectionText'
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
  link: {
    type: String,
    required: true
  },
  alt: {
    type: String,
    required: true
  },
  ratio: {
    type: Number,
    default: 1
  },
  col: {
    type: String,
    default: "12"
  },
  label: {
    type: String,
    default: null
  }
});

</script>
