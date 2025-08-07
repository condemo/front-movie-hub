import { MenuButton } from "@/types/core";
import { defineStore } from "pinia";
import { ref } from "vue";



export const useCoreStore = defineStore('core', () => {
  const currentSelectedBtn = ref<MenuButton>(MenuButton.home)

  return {
    currentSelectedBtn
  }
})
