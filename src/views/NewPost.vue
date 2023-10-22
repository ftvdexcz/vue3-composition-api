<script setup lang="ts">
import PostWriter from '../components/PostWriter.vue';
import { TimelinePost } from '../posts';
import { DateTime } from 'luxon';

const post: TimelinePost = {
  id: '-1',
  title: 'title',
  created: DateTime.now(),
  markdown: '## Title',
};
</script>

<template>New Post <post-writer :post="post"></post-writer></template>
