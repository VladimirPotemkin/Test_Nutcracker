import { createRouter, createWebHistory } from 'vue-router'
import MovieList from '../pages/MovieList.vue'
import MovieDetails from '../pages/MovieDetails.vue'

const routes = [
  { path: '/', component: MovieList },
  { path: '/movie/:id', component: MovieDetails, name: 'movie' }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router