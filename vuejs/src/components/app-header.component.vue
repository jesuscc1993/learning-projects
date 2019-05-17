<!-- script -->
<script lang="ts">
import AppSidemenu from './app-sidemenu.component.vue';
import Vue from 'vue';

type Data = {
  isSidemenuOpen: boolean;
};
type Computed = {
  isNavigationAvailable: boolean;
};
type Methods = {
  navigateBackwards: () => void;
  navigateForwards: () => void;
  openSidemenu: () => void;
};

export default Vue.extend<Data, Methods, Computed>({
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
