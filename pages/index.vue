<template>
  <v-card color="primary" dark>
    <v-card-title class="headline">
      {{ $t('welcome') }}
    </v-card-title>
  </v-card>
</template>

<script>
export default {
  head() {
    return {
      title: this.$t('menuItems.home')
    }
  }
}
</script>
