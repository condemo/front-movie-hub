<script setup lang="ts">
import LoadingSpinner from '@/components/elements/LoadingSpinner.vue'
import FavButton from '@/components/elements/FavButton.vue'
import ViewedButton from '@/components/elements/ViewedButton.vue'
import { MediaType, type Media } from '@/types/media'
import { useFetch } from '@vueuse/core'
import { onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useMediaStore } from '@/stores/media'

const mediaStore = useMediaStore()
const route = useRoute()
const id = route.params.id
const media = ref<Media | null>(null)
const isImgLoaded = ref<boolean>(false)

const mediaUpdate = async () => {
  const { error } = await useFetch('http://192.168.3.54:5000/movie').put(media)
  if (!error.value) {
    if (media.value) {
      mediaStore.updateMediaResume(media.value.id, {
        fav: media.value.fav,
        viewed: media.value.viewed,
      })
    }
  }
}

onMounted(async () => {
  const { data } = await useFetch<Media>('http://192.168.3.54:5000/movie/' + id).json()
  media.value = data.value as Media

  watch(() => media.value?.fav, mediaUpdate)
  watch(() => media.value?.viewed, mediaUpdate)
})
</script>

<template>
  <div v-if="media">
    <img
      class="mx-auto mb-5"
      @load="isImgLoaded = true"
      :src="media.image"
      alt="poster"
      v-show="isImgLoaded"
    />
    <LoadingSpinner v-show="!isImgLoaded" />
    <div class="flex flex-col space-y-1">
      <h1 class="text-4xl font-bold">{{ media.title }}</h1>
      <div class="divider"></div>
      <p class="text-3xl">
        <span v-if="media.type === MediaType.Movie">
          <span class="text-accent">Película</span> | {{ media.year }}
        </span>
        <span v-else> <span class="text-info">Serie</span> | {{ media.firstAir }} </span>
        | <span class="text-3xl text-primary">{{ (Number(media.rating) / 10).toFixed(1) }}</span>
      </p>
      <p class="text-3xl" v-if="media.type === MediaType.Movie">
        Duración: {{ media.runtime }} minutos
      </p>
      <div class="text-3xl" v-if="media.type === MediaType.Series">
        Temporadas: {{ media.seasons }} | Capítulos: {{ media.caps }}
      </div>
      <div class="divider text-xl w-3/4 mx-auto">Géneros</div>
      <p class="text-2xl font-bold text-secondary">{{ media.genres }}</p>
      <div class="divider"></div>
      <p class="text-2xl mt-2" v-if="media.description">Sinopsis: {{ media.description }}</p>
    </div>
    <div class="flex flex-row justify-evenly mt-10">
      <FavButton :fav="media.fav || false" class="w-16 h-16" @click="media.fav = !media.fav" />
      <ViewedButton
        :viewed="media.viewed || false"
        class="w-16 h-16"
        @click="media.viewed = !media.viewed"
      />
    </div>
  </div>
</template>
