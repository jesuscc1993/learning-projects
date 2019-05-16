<!-- script -->
<script lang="ts">
import { RouteConfig } from 'vue-router';
import Vue from 'vue';
import { routes } from '../plugins/router';

export default Vue.extend({
  props: {
    value: Boolean,
  },
  data() {
    return {
      routes,
    };
  },
  computed: {
    isOpen: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('input', value);
      },
    },
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
  <v-navigation-drawer v-model="isOpen" absolute temporary>
    <v-toolbar flat>
      <v-list>
        <v-list-tile>
          <v-list-tile-title class="title">{{$t('app.title')}}</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-toolbar>

    <v-divider></v-divider>

    <v-list class="pa-0">
      <v-list-tile
        v-for="route in routes.filter(route => route.name)"
        :key="route.title"
        :disabled="route.name === $route.name"
        @click="navigateToRoute(route)"
      >
        <v-list-tile-action>
          <v-icon>{{ route.icon }}</v-icon>
        </v-list-tile-action>

        <v-list-tile-content>
          <v-list-tile-title>{{ $t(`sections.${route.name}`) }}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>
</template>

<!-- style -->
<style lang="scss" scoped>
.v-list__tile {
  padding: 32px;
}
</style>