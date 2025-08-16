<script setup lang="ts">
import MediaCard from '@/components/MediaCard.vue'
import { useMediaStore } from '@/store/media'
import { storeToRefs } from 'pinia'
import LoadingSpinner from '@/components/elements/LoadingSpinner.vue'
import { onMounted, onUnmounted, useTemplateRef } from 'vue'

const mediaStore = useMediaStore()
const { mediaList, loading, fetching } = storeToRefs(mediaStore)
const scrollComponent = useTemplateRef("scrollComponent")

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

onMounted(() => {
  window.addEventListener("scroll", handleScroll)
})

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll)
})

const handleScroll = async (_: Event) => {
  const element = scrollComponent.value as Element | null
  if (element) {
    if (element.getBoundingClientRect().bottom / 2 < window.innerHeight) {
      if (!fetching.value) {
        await mediaStore.getMoreMedia()
      }
    }
  }
}
</script>

<template>
  <div>
    <LoadingSpinner v-if="loading" />
    <div ref="scrollComponent" v-else class="flex flex-col space-y-1">
      <MediaCard v-for="(media, i) in mediaList" :key="media.id" :media="media" :index="i"
        @swap-media-viewed="swapMediaViewed" @swap-media-fav="swapMediaFav" />
    </div>
  </div>
</template>
