import { createRouter, createWebHistory } from 'vue-router'
import MainView from '../views/MainView.vue'
import MediaDetail from '@/views/MediaDetail.vue'
import FavsView from '@/views/FavsView.vue'
import ViewedView from '@/views/ViewedView.vue'
import { useCoreStore } from '@/stores/core'
import { storeToRefs } from 'pinia'
import { MenuButton } from '@/types/core'
import { useMediaStore } from '@/stores/media'
import { MediaFilter } from '@/types/media'
import RecomendedView from '@/views/RecomendedView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior: (to, _, savedPosition) => {
    if (to.name === 'favs' || to.name === 'viewed') {
      return { top: 0 }
    } else {
      if (savedPosition) {
        return savedPosition
      }
    }
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: MainView,
    },
    {
      path: '/resume/:id',
      name: 'media_resume',
      component: MediaDetail,
    },
    {
      path: '/fav',
      name: 'favs',
      component: FavsView,
    },
    {
      path: '/viewed',
      name: 'viewed',
      component: ViewedView,
    },
    {
      path: '/recomended',
      name: 'recomended',
      component: RecomendedView,
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue'),
    // },
  ],
})

router.afterEach((to) => {
  const coreStore = useCoreStore()
  const { currentSelectedBtn } = storeToRefs(coreStore)

  if (to.name === 'home') {
    currentSelectedBtn.value = MenuButton.home
  } else if (to.name === 'favs') {
    currentSelectedBtn.value = MenuButton.fav
  } else if (to.name === 'viewed') {
    currentSelectedBtn.value = MenuButton.viewed
  } else if (to.name === 'recomended') {
    currentSelectedBtn.value = MenuButton.recomended
  } else {
    currentSelectedBtn.value = MenuButton.other
  }
})

router.beforeEach((to) => {
  const mediaStore = useMediaStore()
  const { filter } = storeToRefs(mediaStore)

  if (to.name === 'home') {
    filter.value = MediaFilter.None
  } else if (to.name === 'favs') {
    filter.value = MediaFilter.Fav
  } else if (to.name === 'viewed') {
    filter.value = MediaFilter.Viewed
  } else if (to.name === 'recomended') {
    filter.value = MediaFilter.Recomended
  }
})

export default router
