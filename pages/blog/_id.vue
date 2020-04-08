<template>
  <div v-if="$fetchState.pending">Fetching post #{{ $route.params.id }}...</div>
  <div v-else-if="$fetchState.error">{{ $fetchState.error.message }}...</div>
  <div v-else>
    <v-card class="mb-4">
      <v-card-title class="text-capitalize headline">
        {{ post.title }}
      </v-card-title>
      <v-divider />
      <v-card-text>
        {{ post.body }}
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn class="text-lowercase" :to="{ name: 'blog' }" text exact small>
          back to blog posts
        </v-btn>
      </v-card-actions>
    </v-card>

    <v-card>
      <v-list>
        <v-subheader>Comments</v-subheader>
        <v-list-item v-for="comment in comments" :key="comment.id">
          <v-list-item-content>
            <v-list-item-title>{{ comment.name }}</v-list-item-title>
            <v-list-item-subtitle>{{ comment.body }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card>
  </div>
</template>

<script>
export default {
  async fetch() {
    this.post = await this.$axios.$get(`/posts/${this.$route.params.id}`)
    this.comments = await this.$axios.$get(
      `/posts/${this.$route.params.id}/comments`
    )
  },
  data: () => ({
    post: null,
    comments: []
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
