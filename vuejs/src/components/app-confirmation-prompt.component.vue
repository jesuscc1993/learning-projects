<!-- script -->
<script lang="ts">
import Vue from 'vue';

import { formRules } from '../domain/forms';

type Props = {
  value: boolean;
  title: string;
  body: string;
  confirmationColor?: string;
};
type Data = {};
type Computed = {
  isOpen: boolean;
};
type Methods = {
  confirm: () => void;
  dismiss: (confirmed?: boolean) => void;
};

export default Vue.extend<Data, Methods, Computed, Props>({
  props: {
    value: Boolean,
    title: String,
    body: String,
    confirmationColor: String,
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
    confirm() {
      this.dismiss(true);
    },
    dismiss(confirmed: boolean = false) {
      this.$emit('dismiss', confirmed);
      this.isOpen = false;
    },
  },
});
</script>

<!-- template -->
<template>
  <v-dialog v-model="isOpen" width="480">
    <v-card>
      <v-card-title class="headline primary" primary-title>{{ title }}</v-card-title>

      <v-card-text>{{ body }}</v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="dismiss()">{{ $t('generic.cancel') }}</v-btn>
        <v-btn
          :color="confirmationColor || 'primary'"
          @click="confirm()"
        >{{ $t('generic.confirm') }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<!-- style -->
<style lang="scss" scoped></style>
