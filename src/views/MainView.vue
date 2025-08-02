<script setup lang="ts">
import MediaCard from '@/components/MediaCard.vue';
import { useMediaStore } from '@/store/media';
import { storeToRefs } from 'pinia';
import LoadingSpinner from '@/components/elements/LoadingSpinner.vue';

const mediaStore = useMediaStore()
const { mediaList, loading } = storeToRefs(mediaStore)

</script>

<template>
  <div>
    <LoadingSpinner v-if="loading" />
    <div v-else class="flex flex-col space-y-1">
      <MediaCard v-for="media in mediaList" :key="media.id" :media="media" />
    </div>
  </div>
</template>
