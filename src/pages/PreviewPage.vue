<template>
  <div>
    <q-page v-if="!loggedIn" class="bg-grey-5 column items-center justify-center">
      <p class="text-h3" style="max-width: 480px">User must be logged in to access this page</p>
      <q-btn color="teal-9" to="/admin/login">Login</q-btn>
    </q-page>
    <q-page v-else class="row post-container">
      <div class="col">
        <q-expansion-item default-opened icon="menu" label="Function Menu" header-class="bg-teal-2">
          <PreviewLoadComponent
            @postLoaded="$refs.editPostComponent.openExpanded(); $refs.editSectionsComponent.openExpanded();" />
          <PreviewEditPostComponent ref="editPostComponent" />
          <PreviewEditToolsComponent ref="editSectionsComponent" />
        </q-expansion-item>
        <q-separator color="teal-9" />

        <p class="text-h4 text-weight-bolder q-my-lg">
          {{ postSelected.title ? postSelected.title : "Preview" }}
        </p>
        <q-separator color="teal-9" inset />
        <q-list>
          <PostSection v-for="section in postSections" :key="section.order" v-bind:section="section" />
        </q-list>
      </div>
    </q-page>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { usePreviewPostStore } from 'stores/PreviewPost';
import { useAuthenticationStore } from 'stores/LoginAuth';
import PreviewLoadComponent from 'src/components/PreviewLoad.vue';
import PreviewEditPostComponent from 'src/components/PreviewEditPost.vue';
import PreviewEditToolsComponent from 'src/components/PreviewEditTools.vue';
import PostSection from 'src/components/PostSection.vue';

const authStore = useAuthenticationStore();
const store = usePreviewPostStore();
const loggedIn = computed(() => authStore.getLoggedIn);
const postSelected = computed(() => store.getPostSelected);
const postSections = computed(() => store.getPostContent);


defineOptions({
  name: 'PreviewPage',
});

</script>

<style lang="scss">
.post-container {
  max-width: 720px;
  width: 100%;
  margin: 0 auto;

  font-family: sans-serif, Helvetica, Arial, sans-serif;
  font-weight: 400;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
