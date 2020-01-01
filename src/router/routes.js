
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
      { path: '', component: () => import('pages/Airman.vue') },
      { path: 'squadron', component: () => import('pages/Squadron.vue') },
      { path: 'room', component: () => import('pages/Room.vue') },
      { path: 'phase', component: () => import('pages/Phase.vue') },
      { path: 'status', component: () => import('pages/Status.vue') },
      { path: 'activity', component: () => import('pages/Activity.vue') },
      { path: 'user', component: () => import('pages/User.vue') },
      { path: 'reporting', component: () => import('pages/Reporting.vue') }
    ]
  },
  {
    path: '/admin',
    component: () => import('layouts/SuperAdminLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Airman.vue') },
      { path: 'reporting', component: () => import('pages/Reporting.vue') }
    ]
  },
  {
    path: '/user',
    component: () => import('layouts/SuperAdminLayout.vue'),
    children: [
      { path: 'reporting', component: () => import('pages/Reporting.vue') }
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
