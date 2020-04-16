<template>
  <v-skeleton-loader
    v-if="!$fetchState.error"
    :loading="$fetchState.pending"
    type="card-heading,card-heading,list-item@10"
  >
    <v-card class="mb-4">
      <v-card-title class="text-capitalize headline">
        {{ author.name }}
      </v-card-title>
    </v-card>

    <PostListCard :posts="posts" :title="$t('author.posts')" />
  </v-skeleton-loader>
  <p v-else>{{ $fetchState.error.message }}</p>
</template>

<script>
import PostListCard from '~/components/PostListCard.vue'

export default {
  components: { PostListCard },
  async fetch() {
    const { id: authorId } = this.$route.params
    await this.$store.dispatch('author/fetchAuthor', authorId)
    this.posts = await this.$axios.$get(`/users/${authorId}/posts`)
  },
  data: () => ({
    posts: []
  }),
  computed: {
    author() {
      return this.$store.state.author.author
    },
    title() {
      return this.author === null || this.$fetchState.pending
        ? this.$t('loading')
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
