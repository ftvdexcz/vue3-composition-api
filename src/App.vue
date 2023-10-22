<script setup lang="ts">
import NavBar from './components/NavBar.vue';
</script>

<template>
  <div class="section"></div>
  <div class="container">
    <nav-bar></nav-bar>
    <router-view></router-view>
  </div>
</template>

<style>
@import 'https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css';
</style>
