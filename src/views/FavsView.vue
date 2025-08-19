<script setup lang="ts">
import { useMediaStore } from '@/store/media'
import { storeToRefs } from 'pinia'
import MediaCard from '@/components/MediaCard.vue'

const mediaStore = useMediaStore()
const { favMedia } = storeToRefs(mediaStore)
</script>

<template>
  <div class="flex flex-col space-y-1">
    <MediaCard v-for="(media, i) in favMedia" :key="media.id" :media="media" :index="i" />
  </div>
</template>
