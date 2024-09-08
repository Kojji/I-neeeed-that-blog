<template>
  <div class="col-12">
    <q-expansion-item icon="video_library" :label="props.label" header-class="bg-teal-2">
      <q-card class="bg-teal-1">
        <q-card-section class="row justify-evenly">
          <div v-for="videoLink in props.links" :key="videoLink">
            <q-video class="q-pa-md video-embeded" :src="`${embedLinks[props.origin] + videoLink}`" />
          </div>
        </q-card-section>
      </q-card>
    </q-expansion-item>

  </div>
</template>

<script setup>

defineOptions({
  name: 'PostSectionEmbed'
});

const embedLinks = {
  'Youtube': "https://www.youtube.com/embed/",
};

const props = defineProps({
  order: {
    type: Number,
    required: false
  },
  type: {
    type: String,
    required: true
  },
  label: {
    type: String,
    required: true
  },
  links: {
    type: Array,
    required: true
  },
  origin: {
    type: String,
    required: true
  },
});

</script>

<style lang="scss">
.video-embeded {
  max-width: 330px;
}
</style>
