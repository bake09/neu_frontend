const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { 
        path: '', 
        component: () => import('pages/IndexPage.vue'),
        name: 'index'
      },
      { 
        path: '/tasks', 
        component: () => import('pages/TaskPage.vue'),
        name: 'tasks'
      },
      { 
        path: '/users', 
        component: () => import('pages/UsersPage.vue'),
        name: 'users'
      },
      { 
        path: '/login', 
        component: () => import('pages/LoginPage.vue'),
        name: 'login'
      },
      { 
        path: '/userslist', 
        component: () => import('pages/UserListPage.vue'),
        name: 'userslist'
      },
      { 
        path: '/register', 
        component: () => import('pages/RegisterPage.vue'),
        name: 'register'
      },
      { 
        path: '/logout', 
        component: () => import('pages/LogoutPage.vue'),
        name: 'logout'
      },
    ]
  },
  { 
    path: '/', 
    component: () => import('layouts/ChatLayout.vue'),
    // component: () => import('pages/ChatsPage.vue'),
    name: 'chatsLayout',
    children: [
      { 
        path: '/chats', 
        component: () => import('pages/ChatsPage.vue'),
        name: 'chats'
      },
      { 
        path: '/chats/chat/:id', 
        component: () => import('pages/ChatPage.vue'),
        name: 'chat'
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
