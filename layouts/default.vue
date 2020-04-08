<template>
  <v-app>
    <!--Navigation Drawer-->
    <v-navigation-drawer
      v-model="drawer"
      app
      absolute
      disable-resize-watcher
      temporary
    >
      <v-list dense nav>
        <v-list-item
          v-for="(item, index) in menuItems"
          :key="index"
          :to="item.to"
        >
          <v-list-item-title>{{ item.text }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <!--// Navigation Drawer-->

    <!--App Bar-->
    <v-app-bar fixed app>
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <v-btn icon @click="$vuetify.theme.dark = !$vuetify.theme.dark">
        <v-icon>
          {{ $vuetify.theme.dark ? 'mdi-brightness-4' : 'mdi-brightness-7' }}
        </v-icon>
      </v-btn>
      <v-toolbar-items class="hidden-sm-and-down ml-2">
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
      <v-app-bar-nav-icon class="hidden-md-and-up" @click="drawer = !drawer" />
    </v-app-bar>
    <!--// App Bar-->

    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>

    <!--Footer-->
    <v-footer app fixed>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
    <!--// Footer-->
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      drawer: false,
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
