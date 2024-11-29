import { createRouter, createWebHistory } from 'vue-router/auto'
import { routes } from 'vue-router/auto-routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

/**
 * Redirect on non-existent urls
 */
router.afterEach((to) => {
  if (to.matched.length == 0)
    router.replace({
      name: 'collections-list'
    })
})

export default router
