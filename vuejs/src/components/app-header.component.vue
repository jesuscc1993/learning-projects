<!-- script -->
<script lang="ts">
import { routes } from './../plugins/router';
import Vue from 'vue';

export default Vue.extend({
  methods: {
    navigateBackwards() {
      this.$router.go(-1);
    },
    navigateForwards() {
      this.$router.go(+1);
    },
  },
  computed: {
    isNavigationAvailable() {
      return /*history.length > 1*/ true;
    },
  },
});
</script>

<!-- template -->
<template>
  <header>
    <v-toolbar color="primary">
      <v-toolbar-side-icon v-if="isNavigationAvailable">
        <v-icon @click="navigateBackwards()">arrow_back</v-icon>
      </v-toolbar-side-icon>

      <v-toolbar-title>{{ $t(`sections.${$route.name}`) }}</v-toolbar-title>

      <v-toolbar-side-icon v-if="isNavigationAvailable">
        <v-icon @click="navigateForwards()">arrow_forward</v-icon>
      </v-toolbar-side-icon>
    </v-toolbar>
  </header>
</template>

<!-- style -->
<style lang="scss" scoped>
.v-toolbar__title {
  flex: 1;
  text-align: center;
  margin: 0;
}
</style>
