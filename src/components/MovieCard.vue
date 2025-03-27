<template>
  <div 
    class="card"
    :class="{ 'card--hoverable': isListPage }"
  >
    <template v-if="movie">
      <div class="card__img">
          <img 
            :src="movie.poster" 
            :alt="movie.title"
            @error="handleImageError"
          >
      </div>
      
      <div class="card__content">
        <h2 class="card__title">
          <router-link :to="{ name: 'movie', params: { id: movie.id } }">
            <h1>{{ movie.title }}</h1>
          </router-link>
        </h2>
        
        <div class="card__meta" v-if="movie.year || movie.duration || movie.genres">
          <p>{{ movie.year }}, {{ Array.isArray(movie.genres) ? movie.genres.join(', ') : '' }}</p> 
        </div>
        
        <div class="card__crew">
          <p v-if="movie.directors">
            <p>РЕЖИССЁР: {{ Array.isArray(movie.directors) ? movie.directors.join(', ') : '' }}</p> 
          </p>
          <p v-if="movie.actors">
            <p>АКТЁРЫ: <span>{{ Array.isArray(movie.actors) ? movie.actors.join(', ') : '' }}</span></p> 
          </p>
        </div>
        <p class="card__description" v-if="movie.description">
          {{ movie.description }}
        </p>
        <div class="card__lenght" v-if="movie.collapse.duration">
          <p>{{ movie.collapse.duration[0] }}</p>
          <img src="../assets/img/film.svg" alt="">
        </div>
      </div>
    </template>
    
    <div v-else class="error-card">
      К сожалению, по вашему запросу ничего не найдено...
    </div>
  </div>
</template>

<script>
export default {
  props: {
    movie: {
      type: Object,
      default: () => ({})
    },
    isListPage: Boolean
  },
  methods: {
    handleImageError(e) {
      e.target.src = 'https://via.placeholder.com/200x300?text=No+Poster'
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/styles/main.scss';

.card {
    position: relative;
    display: flex;
    align-items: center;
    background-color: $bgComponent;
    margin-bottom: 12px;

    &--hoverable:hover {
    transform: translateY(-8px);
    box-shadow: 0 10px 20px rgba(0,0,0,0.5);
  }

    &__img {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 168px;
        background-color: $bgImg;

        img {
          display: flex;
          max-width: 168px;
        }
    }

    &__content {
        display: flex;
        flex-direction: column;
        margin-left: 24px;

        h1 {
            color: $textColor;
            font-size: 36px;
            margin-bottom: 8px;
        }

        p {
            color: $textColorThi;
            font-size: 12px;
            margin-bottom: 8px;

            span {
                font-size: 12px;
            }
        }
    }
    
    .card__description {
            color: $textColor;
            font-size: 12px;
        }

    &__lenght {
            display: flex;
            gap: 10px;
            align-items: center;
            position: absolute;
            z-index: 1;
            top: 32px;
            right: 0;
            background-color: $bgImg;
            padding: 10px 20px;

            p {
              color: #000;
              margin: 0;
              font-weight: bold;
            }
            &::after {
              content: '';
              position: absolute;
              top: -5px;
              left: -60px;
              border-left: 40px solid transparent;
              border-right: 60px solid transparent;
              border-bottom: 40px solid $bgComponent;
              rotate: -75deg;
                        }
        }
}



</style>