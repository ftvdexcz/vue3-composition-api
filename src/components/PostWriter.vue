<script setup lang="ts">
import { TimelinePost } from '../posts';
import { ref, onMounted } from 'vue';

const props = defineProps<{
  post: TimelinePost;
}>();

const title = ref(props.post.title);
const contentEditable = ref();
const content = ref(props.post.markdown);

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
      {{ content }}
    </div>
  </div>
</template>
