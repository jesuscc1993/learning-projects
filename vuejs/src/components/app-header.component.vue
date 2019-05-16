<!-- script -->
<script lang="ts">
import { routes } from './../plugins/router';
import AppSidemenu from './app-sidemenu.component.vue';
import Vue from 'vue';

export default Vue.extend({
  data() {
    return {
      isSidemenuOpen: false,
    };
  },
  methods: {
    navigateBackwards() {
      this.$router.go(-1);
    },
    navigateForwards() {
      this.$router.go(+1);
    },
    openSidemenu() {
      this.isSidemenuOpen = true;
    },
  },
  computed: {
    isNavigationAvailable() {
      return location.pathname !== '/';
    },
  },
  components: {
    AppSidemenu,
  },
});
</script>

<!-- template -->
<template>
  <div>
    <header>
      <v-toolbar color="primary">
        <v-toolbar-side-icon>
          <!-- <v-icon v-if="isNavigationAvailable" @click="navigateBackwards()">arrow_back</v-icon> -->
          <!-- <v-icon v-if="!isNavigationAvailable" @click="openSidemenu()">menu</v-icon> -->
          <v-icon @click="openSidemenu()">menu</v-icon>
        </v-toolbar-side-icon>

        <v-toolbar-title>{{ $t(`sections.${$route.name}`) }}</v-toolbar-title>
      </v-toolbar>
    </header>
    <app-sidemenu v-model="isSidemenuOpen"/>
  </div>
</template>

<!-- style -->
<style lang="scss" scoped>
.v-toolbar__title {
  flex: 1;
}
</style>
