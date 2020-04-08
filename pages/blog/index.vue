<template>
  <div>
    <p v-if="$fetchState.pending">Fetching posts...</p>
    <p v-else-if="$fetchState.error">
      Error while fetching posts: {{ $fetchState.error.message }}
    </p>
    <v-list v-else>
      <v-subheader>Blog Posts</v-subheader>
      <v-list-item
        v-for="post of posts"
        :key="post.id"
        :to="{ name: 'blog-id', params: { id: post.id } }"
      >
        <v-list-item-title>
          {{ post.title }}
        </v-list-item-title>
      </v-list-item>
    </v-list>
  </div>
</template>

<script>
export default {
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
