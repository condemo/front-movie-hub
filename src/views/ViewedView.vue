<script setup lang="ts">
import { useMediaStore } from '@/store/media'
import { storeToRefs } from 'pinia'
import MediaCard from '@/components/MediaCard.vue'

const mediaStore = useMediaStore()
const { viewedMedia } = storeToRefs(mediaStore)
</script>
<template>
  <div class="flex flex-col space-y-1">
    <div v-if="viewedMedia.length > 0">
      <MediaCard v-for="(media, i) in viewedMedia" :key="media.id" :media="media" :index="i" />
    </div>
    <div v-else class="text-2xl font-bold text-primary">No hay vistas todavía!!</div>
  </div>
</template>
