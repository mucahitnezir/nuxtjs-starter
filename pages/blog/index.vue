<template>
  <div>
    <p v-if="$fetchState.pending">Fetching posts...</p>
    <p v-else-if="$fetchState.error">
      Error while fetching posts: {{ $fetchState.error.message }}
    </p>
    <PostListCard v-else :posts="posts" />
  </div>
</template>

<script>
import { mapState } from 'vuex'

import PostListCard from '~/components/PostListCard.vue'

export default {
  components: { PostListCard },
  async fetch() {
    await this.$store.dispatch('blog/fetchPosts')
  },
  computed: {
    ...mapState('blog', ['posts'])
  },
  head() {
    return {
      title: 'Blog posts'
    }
  }
}
</script>
