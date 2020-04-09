<template>
  <v-skeleton-loader
    v-if="!$fetchState.error"
    :loading="$fetchState.pending"
    type="card-heading,list-item@100"
  >
    <PostListCard :posts="posts" />
  </v-skeleton-loader>
  <p v-else>Error while fetching posts: {{ $fetchState.error.message }}</p>
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
