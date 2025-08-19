<script setup lang="ts">
import { useMediaStore } from '@/store/media'
import { storeToRefs } from 'pinia'
import MediaCard from '@/components/MediaCard.vue'

const mediaStore = useMediaStore()
const { viewedMedia } = storeToRefs(mediaStore)
</script>
<template>
  <div class="felx flex-col space-y-1">
    <MediaCard v-for="(media, i) in viewedMedia" :key="media.id" :media="media" :index="i" />
  </div>
</template>
