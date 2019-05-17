<!-- script -->
<script lang="ts">
import Vue from 'vue';

import { formRules } from '../domain/forms';

type Props = {
  initialValue: string;
  value: boolean;
  title: string;
  placeholder: string;
};
type Data = {
  model: String;
  isFormValid: boolean;
  formRules: typeof formRules;
};
type Computed = {
  isOpen: boolean;
};
type Methods = {
  dismiss: () => void;
};

export default Vue.extend<Data, Methods, Computed, Props>({
  props: {
    initialValue: String,
    value: Boolean,
    title: String,
    placeholder: String,
  },
  watch: {
    initialValue(value) {
      this.model = this.initialValue;
    },
  },
  data() {
    return {
      model: this.initialValue,
      isFormValid: false,
      formRules,
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
    dismiss() {
      this.$emit('dismiss', this.model);
      this.model = '';
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

      <v-card-text v-if="isOpen">
        <v-form v-model="isFormValid">
          <v-text-field
            :label="`${placeholder}*`"
            :rules="[formRules.required]"
            v-model="model"
            autofocus
          ></v-text-field>
        </v-form>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" :disabled="!isFormValid" @click="dismiss()">{{ $t('generic.save') }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<!-- style -->
<style lang="scss" scoped></style>
