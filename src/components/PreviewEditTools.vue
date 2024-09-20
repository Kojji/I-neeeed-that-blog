<template>
  <q-expansion-item v-model="expanded" label="Section Tools" header-class="bg-teal-1 text-weight-bold row" dense>
    <q-card flat>
      <q-card-section class="row justify-evenly">
        <div class="col-5">
          <p>Category Id:</p>
          <p>{{ categoryIdInput }}</p>
        </div>
        <div class="col-5">
          <p>Post Id:</p>
          <p>{{ foundPostInput.id }}</p>
        </div>
      </q-card-section>
      <q-card-actions class="flex justify-end q-gutter-md">

        <q-btn round color="grey-8" icon="mdi-help">
          <q-tooltip>
            data types<br>
            embed - links, origin, label<br>
            text - data<br>
            image - link, alt, ratio, col<br>
            cta - products, origin<br>
            title - data, identifier
          </q-tooltip>
        </q-btn>
        <q-btn color="red-5" @click="openExpanded()">
          Reset Changes
        </q-btn>
        <q-btn color="teal-8" @click="createSection()">
          New Section
        </q-btn>
      </q-card-actions>
    </q-card>
    <div>
      <div v-for="(item, index) in editSections" :key="index" class="row">
        <q-input v-model="item.sectionString" class="col-10" filled type="textarea" />
        <div class="content-center q-mx-auto">
          <q-btn v-if="!item.loading" unelevated round color="green-8" icon="mdi-content-save"
            @click="saveSection(index)" />
          <q-btn v-else disable unelevated round color="green-8">
            <q-spinner size="xs"></q-spinner>
          </q-btn>
        </div>
      </div>
    </div>
  </q-expansion-item>
</template>

<script setup>
import { ref, computed } from 'vue';
import { usePreviewPostStore } from 'stores/PreviewPost';
import { useQuasar } from 'quasar';

defineOptions({
  name: 'PreviewEditTools'
});
defineExpose({ openExpanded });

const $q = useQuasar();
const store = usePreviewPostStore();
const categoryIdInput = computed(() => store.getCategoryId);
const foundPostInput = computed(() => store.getPostSelected);
const postSections = computed(() => store.getPostContent);

const expanded = ref(false);

let editSections = ref([]);

function openExpanded() {
  expanded.value = true;
  editSections.value = [];
  postSections.value.forEach(element => {
    editSections.value.push({ sectionString: JSON.stringify(element), loading: false });
  });
}

function createSection() {
  editSections.value.push({ sectionString: '{"id":null,"order":' + (editSections.value.length + 1) + ',"type":""}', loading: false });
}

function saveSection(index) {
  try {
    editSections.value[index].loading = true;
    let parsedPost = JSON.parse(editSections.value[index].sectionString);
    store.savePostSection(parsedPost, index).then(() => {
      $q.notify({
        type: 'positive',
        message: 'Section updated!'
      });
      editSections.value[index].loading = false;
      openExpanded();
    }).catch((errorMessage) => {
      $q.notify({
        type: 'negative',
        message: errorMessage
      });
      editSections.value[index].loading = false;

    });

  } catch (error) {
    console.log(error);
    editSections.value[index].loading = false;
  }
}
</script>
