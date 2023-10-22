<script setup lang="ts">
import TimeLineItem from './TimeLineItem.vue';
import { usePosts } from '../stores/posts';
import { periods } from '../constants';

const postsStore = usePosts();

await postsStore.fetchPosts();
</script>

<template>
  <nav class="is-primary panel">
    {{ postsStore.selectedPeriod }}
    <span class="panel-tabs">
      <a
        v-for="period in periods"
        :key="period"
        :class="{ 'is-active': period === postsStore.selectedPeriod }"
        @click="postsStore.setSelectedPeriod(period)"
        >{{ period }}</a
      >
    </span>

    <TimeLineItem
      v-for="post in postsStore.filteredPosts"
      :key="post.id"
      :post="post"
    />
  </nav>
</template>
