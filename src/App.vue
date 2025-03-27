<script setup>
import Header from './components/Header.vue'
import MovieList from './pages/MovieList.vue';
</script>

<template>
    <div class="wrapper">
    <Header />
    <router-view />
    </div>
</template>

<style lang="scss" scoped>
@import './assets/styles/main.scss';

.wrapper {
    max-width: 1920px;
    margin: 0 auto;
}


</style>
