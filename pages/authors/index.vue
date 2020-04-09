<template>
  <v-skeleton-loader
    v-if="!$fetchState.error"
    :loading="$fetchState.pending"
    type="card-heading,list-item@10"
  >
    <v-card>
      <v-card-title class="headline">
        Authors
      </v-card-title>
      <v-divider />
      <v-list>
        <v-list-item
          v-for="author of authors"
          :key="author.id"
          :to="{ name: 'authors-id', params: { id: author.id } }"
        >
          <v-list-item-title class="text-capitalize">
            {{ author.name }}
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-card>
  </v-skeleton-loader>
  <p v-else>Error while fetching authors: {{ $fetchState.error.message }}</p>
</template>

<script>
import { mapState } from 'vuex'

export default {
  async fetch() {
    await this.$store.dispatch('author/fetchAuthors')
  },
  data: () => ({
    loading: false
  }),
  computed: {
    ...mapState('author', ['authors'])
  },
  head() {
    return {
      title: 'Authors'
    }
  }
}
</script>
