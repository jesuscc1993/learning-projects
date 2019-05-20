<!-- script -->
<script lang="ts">
import Vue from 'vue';

import { formRules } from '../domain/forms';
import { Product } from '../domain/product.types';
import { Row } from '../domain/row.types';
import store from '../stores/central.store';

const emptyFormData = {};

type Props = {
  initialValue: Product;
  value: boolean;
  products: Product[];
};
type Data = {
  formData: Partial<Product>;
  isFormValid: boolean;
  formRules: typeof formRules;
};
type Computed = {
  isOpen: boolean;
};
type Methods = {
  save: () => void;
  dismiss: (payload?: Product) => void;
};

export default Vue.extend<Data, Methods, Computed, Props>({
  props: {
    initialValue: Object,
    value: Boolean,
    products: Array,
  },
  data() {
    return {
      formData: { ...emptyFormData },
      isFormValid: false,
      formRules,
    };
  },
  watch: {
    initialValue(value) {
      this.formData = { ...this.initialValue };
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
  },
  methods: {
    save() {
      this.dismiss(<Product>this.formData);
      this.formData = { ...emptyFormData };
    },
    dismiss(payload?: Product) {
      this.$emit('dismiss', payload);
      this.isOpen = false;
    },
  },
  store,
});
</script>

<!-- template -->
<template>
  <v-dialog v-model="isOpen" persistent width="480">
    <v-card>
      <v-card-title class="headline primary" primary-title>{{ $t('product') }}</v-card-title>

      <v-card-text v-if="isOpen">
        <v-form v-model="isFormValid">
          <v-text-field
            :label="`${$t('product.name')}*`"
            :rules="[formRules.required]"
            v-model="formData.name"
          ></v-text-field>
        </v-form>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="dismiss()">{{ $t('generic.cancel') }}</v-btn>
        <v-btn color="primary" :disabled="!isFormValid" @click="save()">{{ $t('generic.save') }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<!-- style -->
<style lang="scss" scoped></style>
