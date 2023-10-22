<script setup lang="ts">
import { TimelinePost } from '../posts';
import { ref, onMounted, watch } from 'vue';
import { marked } from 'marked';
import highlightjs from 'highlight.js';
import debounce from 'lodash/debounce';
import { usePosts } from '../stores/posts';

const postsStore = usePosts();

const props = defineProps<{
  post: TimelinePost;
}>();

const title = ref(props.post.title);
const contentEditable = ref<HTMLDivElement>();
const content = ref(props.post.markdown);
const html = ref('');

const parseHtml = (markdown: string) => {
  html.value = marked.parse(markdown, {
    gfm: true,
    breaks: true,
    highlight: (code) => {
      return highlightjs.highlightAuto(code).value;
    },
  });
};

watch(
  content,
  debounce((newContent) => {
    parseHtml(newContent);
  }, 250),
  {
    immediate: true,
  }
);

onMounted(() => {
  if (!contentEditable.value) {
    throw Error('contentEditable DOM was not found');
  }
  contentEditable.value.innerText = content.value;
});

const handleInput = () => {
  if (!contentEditable.value) {
    throw Error('contentEditable DOM was not found');
  }

  content.value = contentEditable.value.innerText;
};

const handleClick = () => {
  const newPost: TimelinePost = {
    ...props.post,
    title: title.value,
    markdown: content.value,
    html: html.value,
  };

  postsStore.createPost(newPost);
};
</script>

<template>
  <div class="columns">
    <div class="column">
      <div class="column">
        <div class="field">
          <div class="label">Post title</div>
          <input v-model="title" type="text" class="input" />
        </div>
      </div>
    </div>
  </div>

  <div class="columns">
    <div class="column">
      <div contenteditable ref="contentEditable" @input="handleInput" />
    </div>
    <div class="column">
      <div v-html="html"></div>
    </div>
  </div>

  <div class="columns">
    <div class="column">
      <button @click="handleClick" class="button is-primary is-pulled-right">
        Save post
      </button>
    </div>
  </div>
</template>
