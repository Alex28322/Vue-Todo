import { createRouter, createWebHistory } from 'vue-router'

import Home from '../pages/Home.vue'
import HelloWorld from '../pages/HelloWorld.vue'

const routes = [

{
  path: '/',
  component: Home
},

{
  path: '/hello',
  component: HelloWorld
}

]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router