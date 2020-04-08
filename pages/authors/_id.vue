<template>
  <div v-if="$fetchState.pending">
    Fetching author #{{ $route.params.id }}...
  </div>
  <div v-else-if="$fetchState.error">{{ $fetchState.error.message }}...</div>
  <div v-else>
    <v-card class="mb-4">
      <v-card-title class="text-capitalize headline">
        {{ author.name }}
      </v-card-title>
    </v-card>

    <PostListCard :posts="posts" />
  </div>
</template>

<script>
import PostListCard from '../../components/PostListCard'

export default {
  components: { PostListCard },
  async fetch() {
    this.author = await this.$axios.$get(`/users/${this.$route.params.id}`)
    this.posts = await this.$axios.$get(
      `/posts?userId=${this.$route.params.id}`
    )
  },
  data: () => ({
    author: null,
    posts: []
  }),
  computed: {
    title() {
      return this.author === null || this.$fetchState.pending
        ? 'Loading..'
        : this.author.name
    }
  },
  head() {
    return {
      title: this.title
    }
  }
}
</script>
