<template>
  <div v-if="$fetchState.pending">Fetching post #{{ $route.params.id }}...</div>
  <div v-else-if="$fetchState.error">{{ $fetchState.error.message }}...</div>
  <v-card v-else>
    <v-card-title class="headline">
      {{ post.title }}
    </v-card-title>
    <v-card-text>
      {{ post.body }}
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <v-btn class="text-lowercase" :to="{ name: 'blog' }" text exact>
        back to blog posts
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  async fetch() {
    this.post = await this.$axios.$get(`/posts/${this.$route.params.id}`)
  },
  data: () => ({
    post: null
  }),
  computed: {
    title() {
      return this.post === null || this.$fetchState.pending
        ? 'Loading..'
        : this.post.title
    }
  },
  head() {
    return {
      title: this.title
    }
  }
}
</script>
