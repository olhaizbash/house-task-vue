import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/:id',
      name: 'house information',
      component: () => import('../views/HouseView.vue'),
      props: true
    },
    {
      path: '/create',
      name: 'create listing',
      component: () => import('../views/CreateListingView.vue')
    }
  ]
})

export default router
