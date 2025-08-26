<template>
  <div class="card card-side bg-base-100 shadow-sm h-40 max-w-full border-2 border-secondary">
    <figure class="w-1/3">
      <img :src="media.thumbnail" alt="Movie" />
    </figure>
    <div class="card-body flex space-y-0">
      <router-link :to="'/resume/' + media.id">
        <div class="flex flex-row justify-between">
          <h2 class="card-title truncate max-h-4 max-w-44 mx-auto">
            {{ media.title }}
          </h2>
          <span class="font-bold text-xl text-error">{{
            (Number(media.rating) / 10).toFixed(1)
          }}</span>
        </div>
        <p
          class="font-bold text-base"
          :class="media.type === MediaType.Movie ? 'text-accent' : 'text-info'"
        >
          {{ media.type === MediaType.Movie ? 'Película' : 'Serie' }}
        </p>
        <p class="font-bold text-secondary">{{ media.genres }}</p>
      </router-link>
      <div class="card-actions justify-end mx-auto w-1/2 space-x-3 *:w-10">
        <FavButton :fav="media.fav || false" @click="$emit('swap-media-fav', index)" />
        <ViewedButton :viewed="media.viewed || false" @click="$emit('swap-media-viewed', index)" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { MediaType, type MediaResume } from '@/types/media'
import type { PropType } from 'vue'
import FavButton from './elements/FavButton.vue'
import ViewedButton from './elements/ViewedButton.vue'

defineProps({
  media: { type: Object as PropType<MediaResume>, required: true },
  index: { type: Number, required: true },
})
</script>
