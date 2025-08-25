<script setup lang="ts">
import MediaCard from '@/components/MediaCard.vue'
import { useMediaStore } from '@/stores/media'
import { storeToRefs } from 'pinia'
import LoadingSpinner from '@/components/elements/LoadingSpinner.vue'
import { MediaFilter } from '@/types/media'
import { onMounted, onUnmounted, useTemplateRef } from 'vue'
import { ref } from 'vue'
import { watch } from 'vue'

const mediaStore = useMediaStore()
const { mediaList, loading, fetching, order } = storeToRefs(mediaStore)
const scrollComponent = useTemplateRef('scrollComponent')

const orderOptions = ref([
  { text: 'Sin Orden', value: MediaFilter.None },
  { text: 'Puntuación', value: MediaFilter.Rating },
])
watch(
  () => order.value,
  () => {
    mediaStore.mediaOrderBy()
  },
)

const swapMediaViewed = (index: number) => {
  mediaList.value[index].viewed = !mediaList.value[index].viewed
  const md = mediaList.value[index]
  mediaStore.updateMediaBooleans(md.id, { fav: md.fav, viewed: md.viewed })
}

const swapMediaFav = (index: number) => {
  mediaList.value[index].fav = !mediaList.value[index].fav
  const md = mediaList.value[index]
  mediaStore.updateMediaBooleans(md.id, { fav: md.fav, viewed: md.viewed })
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

const handleScroll = async () => {
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
    <div v-else class="flex flex-col">
      <div class="mx-auto">
        <select class="select select-secondary text-xl m-2" v-model="order">
          <option v-for="(option, i) in orderOptions" :value="option.value" :key="i">
            {{ option.text }}
          </option>
        </select>
      </div>
      <div ref="scrollComponent" class="flex flex-col space-y-1">
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
  </div>
</template>
