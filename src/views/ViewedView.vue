<script setup lang="ts">
import { useMediaStore } from '@/stores/media'
import { storeToRefs } from 'pinia'
import MediaCard from '@/components/MediaCard.vue'

const mediaStore = useMediaStore()
const { mediaList } = storeToRefs(mediaStore)

const swapMediaViewed = (index: number) => {
  const md = mediaList.value[index]
  mediaStore.updateMediaBooleans(md.id, { fav: md.fav, viewed: !md.viewed })
}

const swapMediaFav = (index: number) => {
  const md = mediaList.value[index]
  mediaStore.updateMediaBooleans(md.id, { fav: !md.fav, viewed: md.viewed })
}
</script>
<template>
  <div class="flex flex-col space-y-1">
    <div v-if="mediaList.length > 0">
      <MediaCard
        v-for="(media, i) in mediaList"
        :key="media.id"
        :media="media"
        :index="i"
        @swap-media-viewed="swapMediaViewed"
        @swap-media-fav="swapMediaFav"
      />
    </div>
    <div v-else class="text-2xl font-bold text-primary">No hay vistas todavía!!</div>
  </div>
</template>
