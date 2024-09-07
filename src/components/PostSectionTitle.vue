<template>
  <div :id="props.identifier ? props.identifier : null" class="text-grey-8 text-h5 text-weight-bold q-pa-md">
    {{ props.data }}
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
  data: {
    type: String,
    required: true
  },
  identifier: {
    type: String,
    default: ""
  }
})

</script>
