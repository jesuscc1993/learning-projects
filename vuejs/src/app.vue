<!-- script -->
<script>
import AppFooter from './components/app-footer.component';
import AppHeader from './components/app-header.component';

export default {
  name: 'App',
  components: {
    AppFooter,
    AppHeader,
  },
};
</script>

<!-- template -->
<template>
  <div id="app">
    <v-app dark>
      <app-header/>
      <div id="content">
        <router-view/>
      </div>
      <app-footer/>
    </v-app>
  </div>
</template>

<!-- style -->
<style lang="scss">
.theme--dark {
  &.v-table {
    thead {
      tr {
        &:first-child {
          background: #00897b;
          border: none;
        }
      }
    }
  }
}
</style>
