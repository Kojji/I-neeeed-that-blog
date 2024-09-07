<template>
  <div class="row justify-center">
    <q-img :class="`col-${props.col}`" :ratio="`${props.ratio}`" :src="props.link" :alt="props.alt" />
  </div>
</template>

<script setup>

defineOptions({
  name: 'PostSectionText'
})

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
  }
})

</script>
