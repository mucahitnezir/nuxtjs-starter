<template>
  <p v-if="loading">Fetching authors...</p>
  <v-card v-else>
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
</template>

<script>
export default {
  data: () => ({
    loading: false,
    authors: []
  }),
  async created() {
    this.loading = true
    this.authors = await this.$axios.$get('/users')
    this.loading = false
  },
  head() {
    return {
      title: 'Authors'
    }
  }
}
</script>
