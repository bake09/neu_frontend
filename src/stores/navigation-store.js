import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useNavigationStore = defineStore('navigation', () => {

  // State
  const usePageTransition = ref(false)

  const navItems = ref([
    {
      root: '/home',
      to: '/home',
      icon: 'home',
      label: 'Home'
    },
    {
      root: '/questions',
      to: '/questions',
      icon: 'help',
      label: 'Questions'
    },
    {
      root: '/images',
      to: '/images',
      icon: 'photo_library',
      label: 'Images'
    },
  ])

  const images = ref([
    {
      id: 'id1',
      url: '/images/1.jpeg',
      caption: 'Glühbirne'
    },
    {
      id: 'id2',
      url: '/images/2.jpeg',
      caption: 'Felder'
    },
    {
      id: 'id3',
      url: '/images/3.jpeg',
      caption: 'Sonnenblume'
    },
    {
      id: 'id4',
      url: '/images/4.jpeg',
      caption: 'See'
    },
    {
      id: 'id5',
      url: '/images/5.jpeg',
      caption: 'Kornfeld'
    },
    {
      id: 'id6',
      url: '/images/6.jpeg',
      caption: 'Wiese'
    }
  ])
  
  // Actions
  const updateNavItem = (router) => {
    const currentPath = router.currentRoute.value.path.split('/')[1]
    const basePath = `/${currentPath}`
    const navItemIndex = navItems.value.findIndex(navItem => {
      return navItem.root == basePath
    })
    if (navItemIndex !== -1) {
      navItems.value[navItemIndex].to = router.currentRoute.value.path;
    }
  }
  return {
    // State
    usePageTransition,
    navItems,
    images,

    // Getters

    // Actions
    updateNavItem
  }
})