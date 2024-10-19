import { boot } from 'quasar/wrappers'
import { useAuthStore } from 'stores/auth-store';
import { useNavigationStore } from 'stores/navigation-store'

let routerInstance = null

export default boot(async ({ app, router, store  }) => {
  routerInstance = router
  const navigationStore = useNavigationStore(store)

  router.afterEach((to, from) => {
    let fromRootPath = `/${from.path.split('/')[1]}`
    let toRootPath = `/${to.path.split('/')[1]}`

    // console.log('fromRootPath :>> ', fromRootPath);
    // console.log('toRootPath :>> ', toRootPath);

    if(fromRootPath != toRootPath){
      navigationStore.usePageTransition = false
    }else{
      navigationStore.usePageTransition = true
      
      if((from.path == to.path) && (to.path != toRootPath)){
        router.push(toRootPath)
      }
    }
    navigationStore.updateNavItem(router)
  })

  router.beforeEach((to, from, next) => {
    const authStore = useAuthStore();

    // Überprüfen, ob der Benutzer authentifiziert ist
    const isAuthenticated = !!authStore.user;

    // Öffentliche Seiten, die für nicht authentifizierte Benutzer zugänglich sind
    const publicPages = ['/login', '/register'];
    const authRequired = !publicPages.includes(to.path);

    if (authRequired && !isAuthenticated) {
      // Wenn die Route eine Authentifizierung erfordert und der Benutzer nicht eingeloggt ist
      next('/login');
    } else if (isAuthenticated && publicPages.includes(to.path)) {
      // Wenn der Benutzer eingeloggt ist und versucht, auf eine öffentliche Seite zuzugreifen
      next('/'); // Leite auf eine geschützte Standardseite um (hier /dashboard, anpassen nach Bedarf)
    } else {
      // Andernfalls den Übergang zur Zielroute zulassen
      next();
    }
  });
});

export { routerInstance }