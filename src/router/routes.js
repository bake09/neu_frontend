
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { 
        path: '', 
        // component: () => import('pages/IndexPage.vue'),
        component: () => import('pages/TaskPage.vue'),
        // redirect: { name: 'tasks' },
        name: 'index'
      },
      { 
        path: '/tasks', 
        component: () => import('pages/TaskPage.vue'),
        name: 'tasks'
      },
      { 
        path: '/login', 
        component: () => import('pages/LoginPage.vue'),
        name: 'login'
      },
      { 
        path: '/register', 
        component: () => import('pages/RegisterPage.vue'),
        name: 'register'
      },
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
