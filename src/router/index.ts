import { createRouter, createWebHistory } from 'vue-router'
import MainView from '../views/MainView.vue'
import MediaDetail from '@/views/MediaDetail.vue'
import FavsView from '@/views/FavsView.vue'
import ViewedView from '@/views/ViewedView.vue'
import { useCoreStore } from '@/store/core'
import { storeToRefs } from 'pinia'
import { MenuButton } from '@/types/core'

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
  } else {
    currentSelectedBtn.value = MenuButton.other
  }
})

export default router
