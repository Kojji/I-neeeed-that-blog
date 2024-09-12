<template>
  <q-expansion-item v-model="expanded" label="Load Post" header-class="bg-teal-1 text-weight-bold row" dense>
    <q-card flat>
      <q-card-section class="row justify-evenly">
        <q-input filled v-model="categoryIdInput" label="category id" class="col-5"></q-input>
        <q-input filled v-model="postIdInput" label="post id" class="col-5"></q-input>
      </q-card-section>
      <q-card-actions v-if="loadLoading" class="flex justify-end q-gutter-md">
        <q-btn disable style="width: 150px;" color="teal-9">
          <q-spinner size="xs"></q-spinner>
        </q-btn>
      </q-card-actions>

      <q-card-actions v-else class="flex justify-end q-gutter-md">
        <q-btn style="width: 150px;" @click="loadPost()" color="teal-8">
          Load Post
        </q-btn>
        <q-btn style="width: 150px;" @click="createPost()" color="green-8">
          Create Post
        </q-btn>
      </q-card-actions>
    </q-card>
  </q-expansion-item>
</template>

<script setup>
import { ref } from 'vue';
import { useQuasar } from 'quasar';
import { usePreviewPostStore } from 'stores/PreviewPost';

const store = usePreviewPostStore();
const $q = useQuasar();

const expanded = ref(true);
const loadLoading = ref(false);
const categoryIdInput = ref('');
const postIdInput = ref('');
const emit = defineEmits(['postLoaded'])

defineOptions({
  name: 'PreviewLoad'
});

async function createPost() {
  if (!categoryIdInput.value) {
    $q.notify({
      type: 'negative',
      message: 'Category id required!'
    })
  } else {
    loadLoading.value = true;
    store.createPreviewPost(categoryIdInput.value)
      .then(() => {
        $q.notify({
          type: 'positive',
          message: 'Post created!'
        })
        loadLoading.value = false;
        expanded.value = false;
        emit('postLoaded');
      }).catch((errorMessage) => {
        $q.notify({
          type: 'negative',
          message: errorMessage
        })
        loadLoading.value = false;
      });
  }
}

async function loadPost() {
  if (!categoryIdInput.value || !postIdInput.value) {
    $q.notify({
      type: 'negative',
      message: 'Category alias and post id required!'
    })
  } else {
    loadLoading.value = true;
    store.loadPreviewPost(categoryIdInput.value, postIdInput.value)
      .then(() => {
        $q.notify({
          type: 'positive',
          message: 'Post loaded!'
        })
        loadLoading.value = false;
        expanded.value = false;
        emit('postLoaded');
      }).catch((errorMessage) => {
        $q.notify({
          type: 'negative',
          message: errorMessage
        })
        loadLoading.value = false;
      })
  }
}

</script>
