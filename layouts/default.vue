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
      <v-toolbar-title>
        <NuxtLink :to="localePath('/')" tag="span" style="cursor: pointer;">
          {{ title }}
        </NuxtLink>
      </v-toolbar-title>
      <v-spacer />
      <v-btn icon @click="$vuetify.theme.dark = !$vuetify.theme.dark">
        <v-icon>
          {{
            $vuetify.theme.dark ? icons.mdiBrightness4 : icons.mdiBrightness7
          }}
        </v-icon>
      </v-btn>
      <v-toolbar-items class="hidden-sm-and-down">
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
      <v-container class="py-0">
        <v-layout>
          <v-spacer />
          <v-col cols="12" md="3" class="pa-0">
            <v-select
              :items="locales"
              :label="localeLabel"
              hide-details
              item-text="name"
              item-value="code"
              solo
              @change="onLocaleChange"
            />
          </v-col>
        </v-layout>
      </v-container>
    </v-footer>
    <!--// Footer-->
  </v-app>
</template>

<script>
import { mdiBrightness4, mdiBrightness7 } from '@mdi/js'

export default {
  data() {
    return {
      drawer: false,
      title: 'Awesome Nuxt.js',
      icons: { mdiBrightness4, mdiBrightness7 }
    }
  },
  computed: {
    locale() {
      return this.$i18n.locale
    },
    localeLabel() {
      return this.$i18n.locales.find((i) => i.code === this.locale).name
    },
    locales() {
      return this.$i18n.locales.filter((i) => i.code !== this.locale)
    },
    menuItems() {
      return [
        {
          text: this.$t('menuItems.authors'),
          to: this.localePath('/authors')
        },
        {
          text: this.$t('menuItems.blog'),
          to: this.localePath('/blog')
        }
      ]
    }
  },
  methods: {
    onLocaleChange(code) {
      this.$router.push(this.switchLocalePath(code))
    }
  }
}
</script>
