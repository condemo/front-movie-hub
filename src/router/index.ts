import { createRouter, createWebHistory } from 'vue-router'
import MainView from '../views/MainView.vue'
import MediaDetail from '@/views/MediaDetail.vue'
import FavsView from '@/views/FavsView.vue'
import ViewedView from '@/views/ViewedView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior: () => {
    return { top: 0 }
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

export default router
