import { defineStore } from 'pinia'
import axios from 'axios'

export const useMoviesStore = defineStore('movies', {
  state: () => ({
    movies: [],
    selectedMovie: null,
    sortBy: null,
    loading: false,
    error: null
  }),
  actions: {
    async fetchMovies() {
      try {
        this.loading = true;
        const response = await axios.get('/movies');
        
        const apiData = response.data.data; 
        
        if (!Array.isArray(apiData)) {
          throw new Error('Некорректная структура данных');
        }
    
        this.movies = apiData.filter(movie => movie.id && movie.title);
        this.error = null;
    
      } catch (e) {
        this.error = e.message;
        console.error('API Response:', response.data);
      } finally {
        this.loading = false;
      }
    },

    async fetchMovieById(id) {
      try {
        this.loading = true
        this.error = null

        const response = await axios.get(`/movie/${id}`)
        const movieData = response.data?.data || response.data

        if (!movieData.id || !movieData.title) {
          throw new Error('К сожалению, по вашему запросу ничего не найдено...')
        }

        this.selectedMovie = response.data.data
        this.error = null
      } catch (e) {
        this.error = e.message
        console.error(`Failed to fetch movie ${id}:`, e)
      } finally {
        this.loading = false
      }
    },

    setSort(sortType) {
      this.sortBy = sortType === this.sortBy ? null : sortType
    }
  },
  
  getters: {
    sortedMovies: (state) => {
      if (!state.sortBy) return state.movies
      
      return [...state.movies].sort((a, b) => {
        if (state.sortBy === 'title') return a.title.localeCompare(b.title)
        if (state.sortBy === 'year') return a.year - b.year
        return 0
      })
    }
  }
})