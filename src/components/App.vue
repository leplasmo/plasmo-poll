// ./src/components/App.vue

<template>
  <v-app>
    <!-- Show the navbar component here -->
    <Navbar />
    <!-- Main section -->
    <v-main class="mx-4 mb-4">
      <!-- Render the components attached to the routes here -->
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import Navbar from './Navbar.vue';

export default {
  name: 'App',
  components: { Navbar },
};
</script>

<style></style>
