<template>
  <v-skeleton-loader
    v-if="!$fetchState.error"
    :loading="$fetchState.loading"
    type="article,actions,card-heading,list-item-two-line@5"
  >
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
        <v-btn
          class="text-lowercase"
          :to="localePath({ name: 'blog' })"
          text
          exact
          small
        >
          {{ $t('blog.backToList') }}
        </v-btn>
      </v-card-actions>
    </v-card>

    <v-card>
      <v-list>
        <v-subheader>{{ $t('blog.comments') }}</v-subheader>
        <v-list-item v-for="comment in comments" :key="comment.id">
          <v-list-item-content>
            <v-list-item-title>{{ comment.name }}</v-list-item-title>
            <v-list-item-subtitle>{{ comment.body }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card>
  </v-skeleton-loader>
  <p v-else>{{ $fetchState.error.message }}</p>
</template>

<script>
export default {
  async fetch() {
    const { id: postId } = this.$route.params
    await this.$store.dispatch('blog/fetchPost', postId)
    this.comments = await this.$axios.$get(`/posts/${postId}/comments`)
  },
  data: () => ({
    comments: []
  }),
  computed: {
    post() {
      return this.$store.state.blog.post
    },
    title() {
      return this.post === null || this.$fetchState.pending
        ? this.$t('loading')
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
