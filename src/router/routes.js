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
        path: '/login', 
        component: () => import('pages/LoginPage.vue'),
        name: 'login'
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
      { 
        path: '/users', 
        component: () => import('pages/UsersPage.vue'),
        name: 'users'
      },
      { 
        path: '/userslist', 
        component: () => import('pages/UserListPage.vue'),
        name: 'userslist'
      },
      { 
        path: '/tasks', 
        component: () => import('pages/TaskPage.vue'),
        name: 'tasks'
      },
    ]
  },
  { 
    path: '/', 
    component: () => import('layouts/ChatLayout.vue'),
    name: 'chatsLayout',
    children: [
      { 
        path: '/chat', 
        component: () => import('pages/ChatIndexPage.vue'),
      },
      { 
        path: '/chat/chats', 
        component: () => import('pages/ChatsPage.vue'),
        name: 'chats',
        children: [
          {
            path: '/chat/chats/:id', 
            component: () => import('pages/ChatPage.vue'),
            name: 'chat'
          },
        ]
      },
      { 
        path: '/profile', 
        component: () => import('pages/ProfilePage.vue'),
        name: 'profile'
      },
      { 
        path: '/settings', 
        component: () => import('pages/SettingsPage.vue'),
        name: 'settings'
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
