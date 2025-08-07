import type { MediaResume } from '@/types/media'
import { useFetch } from '@vueuse/core'
import { defineStore } from 'pinia'
import { ref, type Ref } from 'vue'

export const useMediaStore = defineStore('media', () => {
  const mediaList: Ref<MediaResume[]> = ref([])
  const loading: Ref<boolean> = ref(false)
  const err: Ref<Error | null> = ref(null)

  const mediaFetch = async () => {
    loading.value = true
    const { error, data } = await useFetch('http://192.168.3.54:5000/movie').json()
    err.value = error.value
    mediaList.value = data.value as MediaResume[]
    loading.value = false
  }
  mediaFetch()

  const updateMediaResume = (id: number, { fav = false, viewed = false }: { fav?: boolean; viewed?: boolean }) => {
    mediaList.value.forEach((value, index, array) => {
      if (value.id === id) {
        array[index].fav = fav
        array[index].viewed = viewed
      }
    })
  }

  const updateMediaBooleans = async (id: number, { fav = false, viewed = false }: { fav?: boolean, viewed?: boolean }) => {
    const { data, error } = await useFetch("http://192.168.3.54:5000/movie/resume").put({ id: id, fav: fav, viewed: viewed }).json()
    if (error.value) {
      // TODO: gestionar errores
      console.log("error")
    }

    mediaList.value.forEach((value, index, array) => {
      if (value.id === id) {
        array[index] = data.value as MediaResume
      }
    })
  }

  return {
    mediaList,
    loading,
    err,
    mediaFetch,
    updateMediaResume,
    updateMediaBooleans,
  }
})
