<script setup lang="ts">
import MediaCard from '@/components/MediaCard.vue'
import { useMediaStore } from '@/store/media'
import { storeToRefs } from 'pinia'
import LoadingSpinner from '@/components/elements/LoadingSpinner.vue'

const mediaStore = useMediaStore()
const { mediaList, loading } = storeToRefs(mediaStore)

const swapMediaViewed = (index: number) => {
  mediaList.value[index].viewed = !mediaList.value[index].viewed
  var md = mediaList.value[index]
  mediaStore.updateMediaBooleans(md.id, { fav: md.fav, viewed: md.viewed })
}

const swapMediaFav = (index: number) => {
  mediaList.value[index].fav = !mediaList.value[index].fav
  var md = mediaList.value[index]
  mediaStore.updateMediaBooleans(md.id, { fav: md.fav, viewed: md.viewed })
}
</script>

<template>
  <div>
    <LoadingSpinner v-if="loading" />
    <div v-else class="flex flex-col space-y-1">
      <MediaCard
        v-for="(media, i) in mediaList"
        :key="media.id"
        :media="media"
        :index="i"
        @swap-media-viewed="swapMediaViewed"
        @swap-media-fav="swapMediaFav"
      />
    </div>
  </div>
</template>
