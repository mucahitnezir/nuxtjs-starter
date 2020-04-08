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
import PostListCard from '../../components/PostListCard'

export default {
  components: { PostListCard },
  async fetch() {
    this.posts = await this.$axios.$get('/posts')
  },
  data() {
    return {
      posts: []
    }
  },
  head() {
    return {
      title: 'Blog posts'
    }
  }
}
</script>
