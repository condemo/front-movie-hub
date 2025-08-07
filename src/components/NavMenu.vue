<script setup lang="ts">
import { useCoreStore } from '@/store/core';
import { MenuButton } from '@/types/core';
import { storeToRefs } from 'pinia';

const coreStore = useCoreStore()
const { currentSelectedBtn } = storeToRefs(coreStore)

</script>
<template>
  <div>
    <div class="dock dock-xl">
      <router-link to="/">
        <button :class="currentSelectedBtn === MenuButton.home ? 'text-primary' : 'text-base-content'">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-[1.8em]">
            <path
              d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z" />
            <path
              d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z" />
          </svg>
        </button>
      </router-link>

      <router-link to="/fav">
        <button :class="currentSelectedBtn === MenuButton.fav ? 'text-primary' : 'text-base-content'">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-[1.8em]">
            <path fill-rule="evenodd"
              d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
              clip-rule="evenodd" />
          </svg>
        </button>
      </router-link>

      <router-link to="/viewed">
        <button :class="currentSelectedBtn === MenuButton.viewed ? 'text-primary' : 'text-base-content'">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-[1.8em]">
            <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
            <path fill-rule="evenodd"
              d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z"
              clip-rule="evenodd" />
          </svg>
        </button>
      </router-link>
    </div>
  </div>
</template>
