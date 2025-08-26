import { MediaFilter, MediaOrder, MediaType, type MediaResume } from '@/types/media'

import { useFetch } from '@vueuse/core'
import { defineStore } from 'pinia'
import { computed, ref, watch, type Ref } from 'vue'

export const useMediaStore = defineStore('media', () => {
  const mediaList: Ref<MediaResume[]> = ref([])
  const loading: Ref<boolean> = ref(false)
  const err: Ref<Error | null> = ref(null)
  const offset: Ref<number> = ref(0)
  const order: Ref<MediaOrder> = ref(MediaOrder.None)
  const filter: Ref<MediaFilter> = ref(MediaFilter.None)
  const mediaType: Ref<string> = ref('Both')
  const fetching: Ref<boolean> = ref(false)

  watch(
    () => filter.value,
    async () => {
      await mediaFetch()
      offset.value = 50
    },
  )

  // const favMedia = computed(() => {
  //   return mediaList.value.filter((value) => {
  //     return value.fav === true
  //   })
  // })
  // const viewedMedia = computed(() => {
  //   return mediaList.value.filter((value) => {
  //     return value.viewed === true
  //   })
  // })

  const mediaFetch = async (limit: string = '') => {
    loading.value = true
    const { error, data, response } = await useFetch(
      `http://192.168.3.54:5000/movie?type=${mediaType.value}&filter=${filter.value}&limit=${limit}&order=${order.value}`,
    ).json()
    if (response.value?.status === 404) {
      mediaList.value = []
      loading.value = false
    } else {
      err.value = error.value
      mediaList.value = data.value as MediaResume[]
      offset.value = offset.value + 50
      loading.value = false
    }
  }
  mediaFetch()

  const updateMediaResume = (
    id: number,
    { fav = false, viewed = false }: { fav?: boolean; viewed?: boolean },
  ) => {
    mediaList.value.forEach((value, index, array) => {
      if (value.id === id) {
        array[index].fav = fav
        array[index].viewed = viewed
      }
    })
  }

  const updateMediaBooleans = async (
    id: number,
    { fav = false, viewed = false }: { fav?: boolean; viewed?: boolean },
  ) => {
    const { data, error } = await useFetch('http://192.168.3.54:5000/movie/resume')
      .put({ id: id, fav: fav, viewed: viewed })
      .json()
    if (error.value) {
      // TODO: gestionar errores
      console.log('error')
    }

    mediaList.value.forEach((value, index, array) => {
      if (value.id === id) {
        array[index] = data.value as MediaResume
      }
    })
  }

  const getMoreMedia = async () => {
    fetching.value = true
    const { data, error } = await useFetch(
      `http://192.168.3.54:5000/movie?type=${mediaType.value}&offset=${offset.value}&limit=50&order=${order.value}`,
    ).json()
    if (error.value) {
      console.log(error.value)
    } else {
      offset.value = offset.value + 50
      if (data.value) {
        if ((data.value as MediaResume[]).length > 0) {
          mediaList.value.push(...(data.value as MediaResume[]))
        }
      }
    }
    fetching.value = false
  }

  return {
    mediaList,
    loading,
    err,
    fetching,
    order,
    offset,
    filter,
    mediaType,
    mediaFetch,
    updateMediaResume,
    updateMediaBooleans,
    getMoreMedia,
  }
})
