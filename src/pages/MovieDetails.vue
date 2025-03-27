<template>
    <div class="movie-details">
      <a @click="$router.push('/')">
        <img src="../assets/img/arrow.svg" alt="">
        Назад к списку</a>
      
      <div v-if="store.loading">
        <img src="../assets/img/Loader.png" alt="Загрузка...">
      </div>
      <div v-else-if="store.error" class="error">{{ store.error }}</div>
      <div v-else-if="!movie">К сожалению, по вашему запросу ничего не найдено...</div>
      
      <MovieCard 
        v-else 
        :movie="movie"
        :is-list-page="false"
      />
    </div>
  </template>
  
  <script setup>
  import { computed, onMounted } from 'vue'
  import { useRoute } from 'vue-router'
  import { useMoviesStore } from '../store/index'
  import MovieCard from '../components/MovieCard.vue'
  
  const route = useRoute()
  const store = useMoviesStore()
  
  const movie = computed(() => 
    store.selectedMovie || store.movies.find(m => m.id === route.params.id)
  )
  
  onMounted(async () => {
    if (!movie.value) {
      await store.fetchMovieById(route.params.id)
    }
  })
  </script>

  <style lang="scss" scoped>
  @import '../assets/styles/main.scss';  
  
  .movie-details {
    position: relative;
    display: flex;
    flex-direction: column;
    max-width: 1400px;
    margin: 0 auto;
    margin-top: 40px;

    &::after {
        content: '';
        position: absolute;
        top: 45px;
        left: 0px;
        width: 100%;
        border-bottom: 1px solid $textColorThi;
      }

    a {
      display: flex;
      align-items: center;
      gap: 10px;
      width: 150px;
      height: 40px;
      margin-bottom: 20px;
      cursor: pointer;
      color: rgba(255, 82, 82, 0.98);
      text-decoration: underline;
    }


    img {
      width: 11px;
      height: 20px;
    }
  }
  </style>