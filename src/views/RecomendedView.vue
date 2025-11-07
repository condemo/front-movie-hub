<script setup lang="ts">
import { useMediaStore } from '@/stores/media';
import { storeToRefs } from 'pinia';
import MediaCard from '@/components/MediaCard.vue';


const mediaStore = useMediaStore()
const { mediaList } = storeToRefs(mediaStore)

</script>

<template>
  <div class="flex flex-col space-y-1">
    <div v-if="mediaList.length > 0">
      <MediaCard v-for="(media, i) in mediaList" :key="media.id" :media="media" :index="i" />
    </div>

  </div>
</template>
