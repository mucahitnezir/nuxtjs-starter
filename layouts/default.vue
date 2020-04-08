<template>
  <v-app>
    <v-app-bar fixed app>
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <v-toolbar-items>
        <v-btn
          v-for="(item, index) in menuItems"
          :key="index"
          :to="item.to"
          exact
          text
        >
          {{ item.text }}
        </v-btn>
      </v-toolbar-items>
    </v-app-bar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <v-footer app fixed>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      title: 'Awesome Nuxt.js',
      menuItems: [
        {
          text: 'Home',
          to: '/'
        },
        {
          text: 'Authors',
          to: '/authors'
        },
        {
          text: 'Blog',
          to: '/blog'
        }
      ]
    }
  }
}
</script>
