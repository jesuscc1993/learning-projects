<!-- script -->
<script lang="ts">
import { routes } from './../plugins/router';
import Vue from 'vue';

export default Vue.extend({
  methods: {
    navigateBack() {
      this.$router.back();
    },
  },
  computed: {
    canNavigateBack() {
      return !!history.length;
    },
  },
});
</script>

<!-- template -->
<template>
  <header>
    <v-toolbar color="primary">
      <v-toolbar-side-icon>
        <v-icon v-if="canNavigateBack" @click="navigateBack()">arrow_back</v-icon>
      </v-toolbar-side-icon>
      <v-toolbar-title>{{ $t(`sections.${$route.name}`) }}</v-toolbar-title>
      <v-toolbar-side-icon>
        <span></span>
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
