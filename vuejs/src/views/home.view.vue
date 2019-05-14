<!-- script -->
<script lang="ts">
import { RouteConfig } from 'vue-router';
import Vue from 'vue';
import { routes } from '@/plugins/router';

export default Vue.extend({
  data() {
    return {
      routes,
    };
  },
  methods: {
    navigateToRoute(route: RouteConfig) {
      this.$router.push(route);
    },
  },
});
</script>

<!-- template -->
<template>
  <v-card>
    <v-list>
      <v-subheader>{{ $t('sections') }}</v-subheader>

      <template v-for="(route, index) in routes.filter(route => route.name !== $route.name)">
        <div :key="route.name">
          <v-list-tile @click="navigateToRoute(route)">{{ $t(`sections.${route.name}`) }}</v-list-tile>
          <v-divider v-if="index < routes.length - 2"></v-divider>
        </div>
      </template>
    </v-list>
  </v-card>
</template>

<!-- style -->
<style lang="scss" scoped></style>