import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Articulo from '../components/Articulos.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/perfil',
    name: 'Perfil',
    component: () => import('../components/Perfil.vue')
  },
  {
    path: '/registro',
    name: 'Registro',
    component: () => import('../components/Registro.vue')
  },
  {
    path: '/articulos',
    name: "Articulos",
    component: Articulo
  },
  {
    path: '/articulos/:id',
    name: 'DetalleArticulo',
    component: () => import('../components/DetalleArticulo.vue')
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import('../components/admin/Admin.vue'),
    beforeEnter(to,from,next){  // Comprobamos que es admin
      let loggedIn = JSON.parse(localStorage.getItem('user'));
      if(loggedIn && loggedIn.usuario && loggedIn.accessToken && loggedIn.usuario.rol=="admin"){
        next()
      }else{
        next({name: 'Home'})
      }
  }
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history', // Esto evita que se concatene un #/ en las rutas
  routes
})

export default router

