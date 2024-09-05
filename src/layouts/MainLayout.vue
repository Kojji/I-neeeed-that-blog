<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-white text-teal-9 ">
      <q-toolbar class="custom-container ">
        <q-toolbar-title>
          Quasar App
        </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-page-container class="custom-container">
      <router-view />
    </q-page-container>

    <q-footer elevated class="bg-white q-py-md">
      <div class="custom-container row justify-center">
        <a class="text-teal-9" href="https://fernandokoji.dev" target="_blank" style="text-decoration: none;">
          {{
            `@${year} - Fernando Koji Yamashiro`
          }}
        </a>
      </div>
    </q-footer>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'
import EssentialLink from 'components/EssentialLink.vue'

defineOptions({
  name: 'MainLayout'
})

const year = new Date().getFullYear();


const leftDrawerOpen = ref(false)

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
</script>

<style lang="scss">
.custom-container {
  max-width: 980px;
  width: 100%;
  margin: 0 auto;
}
</style>
