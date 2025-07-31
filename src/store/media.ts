import type { MediaResume } from "@/types/media";
import { defineStore } from "pinia";
import { reactive } from "vue";

export const useMediaStore = defineStore('media', () => {
  const mediaMockup: MediaResume = reactive({
    Id: 1,
    Type: "movie",
    Title: "Distict 9",
    Genres: "Acción,Drama,Ciencia Ficción",
    Description: "ldasdsadasddaskhdasdhjaskdjhasjkdhasdasjkdhasjdashjdasjs",
    Image: "imagen",
    Fav: false,
    Viewed: false
  })

  return {
    mediaMockup
  }
})
