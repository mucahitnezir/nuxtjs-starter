<template>
  <v-card>
    <v-card-title class="headline">
      {{ title }}
    </v-card-title>
    <v-divider />
    <v-list>
      <v-list-item
        v-for="post of posts"
        :key="post.id"
        :to="localePath({ name: 'blog-id', params: { id: post.id } })"
      >
        <v-list-item-title class="text-capitalize">
          {{ post.title }}
        </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script>
export default {
  name: 'BlogListCard',
  props: {
    posts: {
      type: Array,
      required: true
    },
    title: {
      type: String,
      required: true
    }
  }
}
</script>
