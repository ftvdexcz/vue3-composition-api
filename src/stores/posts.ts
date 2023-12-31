import { defineStore } from 'pinia';
import { Post, TimelinePost } from '../posts';
import { Period } from '../constants';
import { DateTime } from 'luxon';

interface PostsState {
  ids: string[];
  all: Map<string, Post>;
  selectedPeriod: Period;
}

function delay() {
  return new Promise<void>((res) => setTimeout(res, 1500));
}

export const usePosts = defineStore('posts', {
  state: (): PostsState => ({
    ids: [],
    all: new Map(),
    selectedPeriod: 'Today',
  }),

  actions: {
    setSelectedPeriod(period: Period) {
      this.selectedPeriod = period;
    },

    async fetchPosts() {
      const res = await fetch('http://localhost:8000/posts');
      const posts = (await res.json()) as Post[];
      await delay();

      let ids: string[] = [];
      let all = new Map<string, Post>();
      for (const post of posts) {
        ids.push(post.id);
        all.set(post.id, post);
      }

      this.ids = ids;
      this.all = all;
    },
    createPost(post: TimelinePost) {
      console.log(post);
    },
  },
  getters: {
    filteredPosts: (state): TimelinePost[] => {
      return state.ids
        .map((id) => {
          const post = state.all.get(id);
          if (!post) {
            throw Error(`Post with id ${id} not found`);
          }
          return {
            ...post,
            created: DateTime.fromISO(post.created),
          };
        })
        .filter((post) => {
          if (state.selectedPeriod === 'Today') {
            return post.created >= DateTime.now().minus({ day: 1 });
          }

          if (state.selectedPeriod === 'This Week') {
            return post.created >= DateTime.now().minus({ week: 1 });
          }

          if (state.selectedPeriod === 'This Month') {
            return post.created >= DateTime.now().minus({ month: 1 });
          }

          return post;
        });
    },
  },
});
