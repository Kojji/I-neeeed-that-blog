<template>
  <div class="q-my-sm">
    <PostSectionText v-if="props.section.type === 'text'" v-bind="props.section" />
    <PostSectionImage v-if="props.section.type === 'image'" v-bind="props.section" />
    <PostSectionEmbed v-if="props.section.type === 'embed'" v-bind="props.section" />
    <PostSectionTitle v-if="props.section.type === 'title'" v-bind="props.section" />
  </div>
</template>

<script setup>
import PostSectionText from 'src/components/PostSectionText.vue';
import PostSectionImage from 'src/components/PostSectionImage.vue';
import PostSectionEmbed from 'src/components/PostSectionEmbed.vue';
import PostSectionTitle from 'src/components/PostSectionTitle.vue';

defineOptions({
  name: 'PostSection'
})

const props = defineProps({
  section: {
    type: Object,
    required: true
  }
})

</script>
