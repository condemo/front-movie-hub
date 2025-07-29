<script setup lang="ts">
import PWAReload from './components/PWAReload.vue'
import NavMenu from './components/NavMenu.vue';
</script>

<template>
  <PWAReload />
  <div id="main-container" class="flex flex-col mx-auto text-center h-screen px-1">
    <router-view class="my-2" />
    <NavMenu />
  </div>
</template>
