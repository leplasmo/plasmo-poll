<!-- ./src/components/Navbar.vue -->

<template>
  <nav>
    <!-- The navbar on the top of the screen -->
    <v-app-bar app flat>
      <v-app-bar-nav-icon
        class="grey--text"
        @click.stop="drawer = !drawer"
      ></v-app-bar-nav-icon>
      <v-toolbar-title class="text-uppercase grey--text">
        <span class="font-weight-light">Plasmo</span>
        <span class="ml--5">Poll</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn depressed color="grey--text">
        <span>Sign Out</span>
        <v-icon>mdi-exit-to-app</v-icon>
      </v-btn>
    </v-app-bar>

    <!-- The side drawer on the left -->
    <v-navigation-drawer v-model="drawer" app class="primary">
      <v-list>
        <!-- Get the links from an array -->
        <v-list-item
          v-for="link in links"
          :key="link.text"
          router
          :to="link.route"
        >
          <v-list-item-action>
            <v-icon class="white--text">{{ link.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title class="white--text">{{
              link.text
            }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>

<script>
import { computed } from '@vue/composition-api';
import { useGetters } from '@u3u/vue-hooks';

export default {
  setup() {
    const { getSiteLinks } = useGetters('navigation', ['getSiteLinks']);
    let drawer = false;

    const links = computed(() => {
      return getSiteLinks.value;
    });

    return {
      links,
      drawer,
    };
  },
};
</script>

<style>
.ml--5 {
  margin-left: -5px;
}
</style>
