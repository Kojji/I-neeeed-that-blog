<template>
  <q-expansion-item v-model="expanded" label="Edit Post" header-class="bg-teal-1 text-weight-bold row" dense>
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
      <q-card-section class="row">
        <q-input filled v-model="editPostObject.title" label="title" class="col-4 q-pa-sm"></q-input>
        <q-input filled v-model="editPostObject.author" label="author" class="col-4 q-pa-sm"></q-input>
        <q-input filled v-model="editPostObject.urlAlias" label="urlAlias" class="col-4 q-pa-sm"></q-input>
        <q-input filled v-model="editPostObject.photoUrl" label="photoUrl" class="col-4 q-pa-sm"></q-input>
        <div class="col-4 q-pa-sm">
          <p>Created on:</p>
          <p>{{ createdAtComputed }}</p>
        </div>

        <q-checkbox left-label v-model="editPostObject.active" label="active" class="col-4 q-pa-sm" />
      </q-card-section>
      <q-card-section>
        <q-editor v-model="editPostObject.shortVersion" min-height="5rem" />
      </q-card-section>
      <q-card-section>
        <BlogPostCard v-if="viewPostCard" v-bind:postCard="editPostObject" v-bind:redirectOnCLick="false" />
      </q-card-section>
      <q-card-actions v-if="loadLoading" class="flex justify-end q-gutter-md">
        <q-btn disable style="width: 150px;" color="teal-9">
          <q-spinner size="xs"></q-spinner>
        </q-btn>
      </q-card-actions>
      <q-card-actions v-else class="flex justify-end q-gutter-md">
        <q-btn v-if="!viewPostCard" style="width: 150px;" color="teal-4" @click="viewPostCard = true">
          Preview Card
        </q-btn>
        <q-btn v-else style="width: 150px;" color="teal-4" @click="viewPostCard = false">
          Hide Card
        </q-btn>
        <q-btn style="width: 150px;" color="teal-8" @click="editPost()">
          Edit Post
        </q-btn>
      </q-card-actions>

    </q-card>
  </q-expansion-item>
</template>

<script setup>
import { ref, computed } from 'vue';
import { usePreviewPostStore } from 'stores/PreviewPost';
import { useQuasar } from 'quasar';
import BlogPostCard from 'src/components/BlogPostCard.vue';

defineOptions({
  name: 'PreviewEditPost'
});
defineExpose({ openExpanded });

const $q = useQuasar();
const store = usePreviewPostStore();

const categoryIdInput = computed(() => store.getCategoryId);
const foundPostInput = computed(() => store.getPostSelected);
const createdAtComputed = computed(() => {
  let setdate = new Date(null);
  setdate.setTime(foundPostInput.value.createdAt.seconds * 1000);
  return setdate.toLocaleString();
})

const viewPostCard = ref(false);
const loadLoading = ref(false);
const expanded = ref(false);
const editPostObject = ref({
  id: "",
  title: "",
  author: "",
  active: false,
  urlAlias: "",
  photoUrl: "",
  createdAt: "",
  shortVersion: "",
});

function openExpanded() {
  expanded.value = true;
  editPostObject.value = JSON.parse(JSON.stringify(foundPostInput.value))
}

function editPost() {
  loadLoading.value = true;
  store.editPreviewPost(JSON.parse(JSON.stringify(editPostObject.value)))
    .then(() => {
      $q.notify({
        type: 'positive',
        message: 'Post updated!'
      })
      loadLoading.value = false;
    }).catch((errorMessage) => {
      $q.notify({
        type: 'negative',
        message: errorMessage
      })
      loadLoading.value = false;
    })
}


</script>
