<template>
  <input type="text" v-model="searchTerm">
  <button @click="handleSearch">Search</button>
  <li v-for="item in result">{{ item }}</li>
</template>

<script setup lang="ts">
  import axios from 'axios';
  import { ref } from 'vue';

  let searchTerm: string = '';
  let result = ref([]);
  function handleSearch() {
    axios
        .get('http://localhost:3000/albums', { params: { searchTerm }})
        .then((res) => result.value = res.data);
  }
</script>

<style scoped>

</style>