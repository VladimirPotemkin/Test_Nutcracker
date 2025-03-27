<template>
  <div class="movie-list">
    <nav class="nav">
        <h1>Фильмы</h1>
        <div class="nav__controls">
          <label class="nav__control">
            <input
              type="checkbox"
              name="sort"
              :checked="store.sortBy === 'title'"
              @change="store.setSort('title')"
            >
            <span class="nav__control--label">Отсортировать по названию</span>
          </label>

          <label class="nav__control">
            <input
              type="checkbox"
              name="sort"
              :checked="store.sortBy === 'year'"
              @change="store.setSort('year')"
            >
            <span class="nav__control--label">Отсортировать по году</span>
          </label>
        </div>
    </nav>
    <div v-if="store.loading" class="loading">
      <img src="../assets/img/Loader.png" alt="Загрузка...">
    </div>
    <div v-else-if="store.error" class="error">{{ store.error }}</div>
    
    <div v-else class="movies-grid">
      <MovieCard 
        v-for="movie in store.sortedMovies" 
        :key="movie.id"
        :movie="movie"
        :is-list-page="true"
      />
    </div>
  </div>
</template>

<script setup>
import { useMoviesStore } from '../store/index'
import MovieCard from '../components/MovieCard.vue'
import { onMounted } from 'vue'

const store = useMoviesStore()

onMounted(() => {
  store.fetchMovies()
})
</script>

<style lang="scss">
@import '../assets/styles/main.scss';

.movies-grid {
  display: flex;
  flex-direction: column;
  max-width: 1400px;
  margin: 0 auto;
}

.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;

  @keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

  img {
    animation: spin 1.5s linear infinite; 
    
  }
}


.nav {
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    margin-top: 40px;
    padding-bottom: 16px;
    max-width: 1400px;
    border-bottom: 1px solid $bgComponent;
    
    h1 {
        color: $textColor;
        font-size: 36px;
        margin-bottom: 20px;
        font-weight: normal;
    }

    &__controls {
        display: flex;
        gap: 20px;
    }
    &__control {
      cursor: pointer;
          input[type="checkbox"] {
              accent-color: rgba($textColorSec, 0.98);
              margin-right: 10px;
              cursor: pointer;
          }
}
}
</style>