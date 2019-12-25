
const routes = [
  {
    path: '/',
    component: () => import('layouts/BlankLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Login.vue') }
    ]
  },
  {
    path: '/super-admin',
    component: () => import('layouts/SuperAdminLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
