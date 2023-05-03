<template>
  <input type="text" v-model="searchTerm">
  <button @click="handleSearch">Search</button>
  <li v-for="item in result">{{ item }}</li>
</template>

<script setup lang="ts">
  import { ref } from 'vue';

  const emit = defineEmits(['searchTerm']);
  let searchTerm: string = '';
  let result = ref([]);
  function handleSearch() {
    emit('searchTerm', searchTerm);
  }
</script>

<style scoped>

</style>