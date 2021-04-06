import {auth} from 'boot/firebase'

export default ({router}) => {
  router.beforeEach((to, from, next) => {
    auth.onAuthStateChanged(user => {
      if( !user && to.path !== '/auth'){
        next('/auth')
      }else{
        // console.log(loggedIn);
        next()
      }    
    })
  })
}