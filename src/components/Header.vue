<script setup>
</script>

<template>
  <header class="header">
    <div class="header__top">
      <h1 class="header__title">#movienow</h1>
    </div>
  </header>
</template>

<style lang="scss" scoped>
@import '../assets/styles/main.scss';

.wrapper {
    max-width: 1920px;
    margin: 0 auto;
}


.header {
    background-color: $textColorSec;

    h1 {
        padding-top: 36px;
        padding-bottom: 16px;
        color: #000;
        text-transform: uppercase;
        font-size: 36px;
        letter-spacing: 10px;
        text-align: center;
    }
}


</style>
