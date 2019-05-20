<!-- script -->
<script lang="ts">
import Vue from 'vue';
import { RouteConfig } from 'vue-router';

import { sections } from '../../plugins/router';

type Props = {
  value: boolean;
};
type Data = {
  sections: typeof sections;
};
type Computed = {
  isOpen: boolean;
};
type Methods = {
  navigateToRoute: (route: RouteConfig) => void;
  dismiss: () => void;
};

export default Vue.extend<Data, Methods, Computed, Props>({
  props: {
    value: Boolean,
  },
  data() {
    return {
      sections,
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
    dismiss() {
      this.isOpen = false;
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

      <v-toolbar-side-icon>
        <v-icon @click="dismiss()">close</v-icon>
      </v-toolbar-side-icon>
    </v-toolbar>

    <v-divider></v-divider>

    <v-list class="pa-0">
      <v-list-tile
        v-for="section in sections.filter(section => section.name)"
        :key="section.title"
        :disabled="section.name === $route.name"
        @click="navigateToRoute(section)"
      >
        <v-list-tile-action>
          <v-icon>{{ section.icon }}</v-icon>
        </v-list-tile-action>

        <v-list-tile-content>
          <v-list-tile-title>{{ $t(`sections.${section.name}`) }}</v-list-tile-title>
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