<template>
  <div>
    <p v-if="$fetchState.pending">Fetching posts...</p>
    <p v-else-if="$fetchState.error">
      Error while fetching posts: {{ $fetchState.error.message }}
    </p>
    <v-card v-else>
      <v-card-title class="headline">
        Blog Posts
      </v-card-title>
      <v-divider />
      <v-list>
        <v-list-item
          v-for="post of posts"
          :key="post.id"
          :to="{ name: 'blog-id', params: { id: post.id } }"
        >
          <v-list-item-title class="text-capitalize">
            {{ post.title }}
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-card>
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
