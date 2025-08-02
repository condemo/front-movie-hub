import type { MediaResume } from "@/types/media";
import { useFetch } from "@vueuse/core";
import { defineStore } from "pinia";
import { reactive, ref, type Ref } from "vue";

export const useMediaStore = defineStore('media', () => {
  const mediaList: Ref<MediaResume[]> = ref([])
  const loading: Ref<boolean> = ref(false)
  const err: Ref<Error | null> = ref(null)

  const mediaFetch = async () => {
    loading.value = true
    const { error, data } = await useFetch("http://192.168.3.54:5000/movie").json()
    err.value = error.value
    mediaList.value = data.value as MediaResume[]
    console.log(data.value)
    loading.value = false
  }
  mediaFetch()

  const mediaMockup: MediaResume = reactive({
    id: 1,
    type: "movie",
    title: "Distict 9",
    genres: "Acción,Drama,Ciencia Ficción",
    description: "ldasdsadasddaskhdasdhjaskdjhasjkdhasdasjkdhasjdashjdasjs",
    image: "imagen",
    fav: false,
    viewed: false
  })

  return {
    mediaMockup,
    mediaList,
    loading,
    err,
    mediaFetch,
  }
})
