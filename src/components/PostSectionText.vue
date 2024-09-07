<template>
  <div v-html="props.data"></div>
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
  data: {
    type: String,
    required: true
  },
})

</script>
