<template>
  <div id="app">
    <div class="logo">
<svg height="150" width="150" fill="#2c3e50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <path style="text-indent:0;text-transform:none;block-progression:tb" d="M41.813 28.002a2 2 0 0 0-1.813 2v5H26a2 2 0 0 0-1.781 1.094c-2.06 4.119-3.813 8.53-9.344 12.218A2 2 0 0 0 14 50v14a2 2 0 0 0 2 2h5.25C22.15 69.436 25.297 72 29 72c3.703 0 6.85-2.563 7.75-6h25.5c.9 3.437 4.047 6 7.75 6 3.703 0 6.85-2.563 7.75-6H84a2 2 0 0 0 2-2V53a2 2 0 0 0-.188-.874l-11-22.999A2 2 0 0 0 73 28.002H42a2 2 0 0 0-.188 0zm2.187 4h27.75L82 53.438v8.563h-4.25c-.9-3.437-4.047-6-7.75-6-3.703 0-6.85 2.563-7.75 6H44V37.158a2 2 0 0 0 0-.156v-1a2 2 0 0 0 0-.188v-3.812zm-16.813 7H40V62h-3.25c-.9-3.437-4.047-6-7.75-6-3.703 0-6.85 2.563-7.75 6H18V50.939c5.216-3.834 7.44-8.358 9.188-11.937zM29 60c2.233 0 4 1.767 4 4 0 2.232-1.767 4-4 4a3.97 3.97 0 0 1-4-4c0-2.233 1.767-4 4-4zm41 0c2.233 0 4 1.767 4 4 0 2.232-1.767 4-4 4a3.97 3.97 0 0 1-4-4c0-2.233 1.767-4 4-4zm-41 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm41 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" fill="#2c3e50" overflow="visible" color="#2c3e50"/>
</svg>
    </div>
    <Tømmedager />
  </div>
</template>

<script>
import Tømmedager from './components/Tommedager.vue'

export default {
  name: 'app',
  components: {
    Tømmedager
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 15px auto;
}
</style>
