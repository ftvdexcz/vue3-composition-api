<script setup lang="ts">
import TimeLine from '../components/TimeLine.vue';
</script>

<template>
  <suspense>
    <template #default>
      <time-line />
    </template>
    <template #fallback>
      <progress class="progress is-primary is-small" />
    </template>
  </suspense>
</template>
