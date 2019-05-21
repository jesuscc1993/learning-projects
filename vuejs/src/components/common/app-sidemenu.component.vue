<!-- script -->
<script lang="ts">
import 'firebase/auth';

import firebase from 'firebase/app';
import { tap } from 'rxjs/operators';
import Vue from 'vue';
import { RouteConfig } from 'vue-router';

import { sections } from '../../plugins/router';
import { authService } from '../../services/auth.service';
import store from '../../stores/central.store';

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
  methods: {
    signInWithPopup() {
      authService
        .signInWithPopup()
        .pipe(
          tap(user => {
            this.$emit('signIn', user);
          })
        )
        .subscribe();
    },
    signOut() {
      authService.signOut().subscribe();
    },
    navigateToRoute(route: RouteConfig) {
      this.$router.push(route);
    },
    dismiss() {
      this.isOpen = false;
    },
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
    user() {
      return this.$store.getters.user;
    },
  },
  store,
});
</script>

<!-- template -->
<template>
  <v-navigation-drawer v-model="isOpen" absolute temporary>
    <v-toolbar flat>
      <v-list class="full-width pa-0">
        <v-list-tile avatar>
          <template v-if="user">
            <v-list-tile-avatar>
              <img :src="user.photoURL">
            </v-list-tile-avatar>

            <v-list-tile-content>
              <v-list-tile-title v-html="user.providerData[0].displayName"></v-list-tile-title>
              <v-list-tile-sub-title v-html="user.email"></v-list-tile-sub-title>
            </v-list-tile-content>
          </template>

          <template v-if="!user">
            <v-list-tile-title class="title">{{$t('app.title')}}</v-list-tile-title>

            <v-list-tile-content></v-list-tile-content>
          </template>

          <v-list-tile-action>
            <v-btn icon class="mx-0" @click="dismiss()">
              <v-icon>close</v-icon>
            </v-btn>
          </v-list-tile-action>
        </v-list-tile>
      </v-list>
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

      <v-divider key="auth-spacer"/>

      <v-list-tile key="auth" @click="user ? signOut() : signInWithPopup()">
        <v-list-tile-action>
          <v-icon>{{ user ? 'logout' : 'account_circle' }}</v-icon>
        </v-list-tile-action>

        <v-list-tile-content>
          <v-list-tile-title>{{ $t(user ? 'sign.out' : 'sign.in') }}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>
</template>

<!-- style -->
<style lang="scss" scoped></style>