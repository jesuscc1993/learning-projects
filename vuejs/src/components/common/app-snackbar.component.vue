<!-- script -->
<script lang="ts">
import Vue from 'vue';

import { Snackbar } from '../../domain/snackbar.types';
import store from '../../stores/central.store';

type Data = {};
type Methods = {};
type Computed = {
  snackbar: Snackbar;
};

export default Vue.extend<Data, Methods, Computed>({
  computed: {
    snackbar() {
      return this.$store.getters.snackbar;
    },
  },
  store,
});
</script>

<!-- template -->
<template>
  <v-snackbar
    v-model="snackbar.isVisible"
    :color="snackbar.color"
    :multi-line="snackbar.multiLine"
    :timeout="snackbar.timeout"
  >{{ snackbar.text }}</v-snackbar>
</template>

<!-- style -->
<style lang="scss" scoped>
.v-snack--bottom {
  margin: 8px 0;
}
</style>