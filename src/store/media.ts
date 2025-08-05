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

  return {
    mediaList,
    loading,
    err,
    mediaFetch,
  }
})
