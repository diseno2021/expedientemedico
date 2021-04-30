
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', name:"home", component: () => import('pages/Index.vue') },
      {
        path: '/auth',
        component: () => import('pages/PageAuth.vue')
      },
      {
        path: '/plantilla',
        component: () => import('pages/Plantilla.vue')
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
