<template>
  <v-app id="app">
    <v-navigation-drawer
      v-model="drawer"
      app
    >
      <v-list dense nav>
        <v-list-item
          v-for="(item, key) in menuItems"
          :key="key"
          link
          :to="item.link"
        >
          <v-list-item-content>
            <v-list-item-title>
              {{ item.name }}
              <v-icon> {{ item.icon }}</v-icon>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      app
      color="grey lighten-5"
    >
      <v-app-bar-nav-icon
        @click.stop="drawer = !drawer"
      >
      </v-app-bar-nav-icon>
      <v-toolbar-title>
        <div class="homepage-link" @click="$router.push('/')">
          Flight manager
        </div>
        </v-toolbar-title>
    </v-app-bar>

    <v-content>
      <router-view/>
    </v-content>
    <v-footer
      color="deep-purple darken-1"
      app
    >
      <span class="white--text">Yaroslav Hromovyi &copy; 2019</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  props: {
    source: String
  },
  data: () => ({
    drawer: false,
    menuItems: [{
      name: 'Tourists',
      icon: 'face',
      link: '/tourists'
    }, {
      name: 'Flights',
      icon: 'flight',
      link: '/flights'
    }]
  })
}
</script>

<style lang="scss">
  .homepage-link {
    &:hover {
      cursor: pointer;
    }
  }
</style>
