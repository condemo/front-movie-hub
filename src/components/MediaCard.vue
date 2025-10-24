<template>
  <div>
    <div class="card card-side bg-base-100 h-40 max-w-full border-b-2 border-t-2 border-neutral">
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
          <p class="font-bold text-base" :class="media.type === MediaType.Movie ? 'text-accent' : 'text-info'">
            {{ media.type === MediaType.Movie ? 'Película' : 'Serie' }}
          </p>
          <p class="font-bold text-secondary">{{ media.genres }}</p>
        </router-link>
        <div class="card-actions flex flex-row justify-evenly mx-auto w-full space-x-3 *:w-10">
          <FavButton :fav="media.fav || false" @click="$emit('swap-media-fav', index)" />
          <ViewedButton :viewed="media.viewed || false" @click="$emit('swap-media-viewed', index)" />
          <RecomendedIcon v-show="media.recomended" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { MediaType, type MediaResume } from '@/types/media'
import type { PropType } from 'vue'
import FavButton from './elements/FavButton.vue'
import ViewedButton from './elements/ViewedButton.vue'
import RecomendedIcon from './elements/RecomendedIcon.vue'

defineProps({
  media: { type: Object as PropType<MediaResume>, required: true },
  index: { type: Number, required: true },
})
</script>
