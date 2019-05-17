<!-- script -->
<script lang="ts">
import Vue from 'vue';

import { formRules } from '../domain/forms';
import { Product } from '../domain/product.types';
import { Row } from '../domain/row.types';
import store from '../stores/central.store';

const emptyFormData = {};

type Props = {
  initialValue: Row;
  value: boolean;
  products: Product[];
};
type Data = {
  formData: Partial<Row>;
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
    dismiss() {
      this.$emit('dismiss', this.formData);
      this.formData = { ...emptyFormData };
      this.isOpen = false;
    },
  },
  store,
});
</script>

<!-- template -->
<template>
  <v-dialog v-model="isOpen" width="480">
    <v-card>
      <v-card-title class="headline primary" primary-title>{{ $t('row') }}</v-card-title>

      <v-card-text v-if="isOpen">
        <v-form v-model="isFormValid">
          <v-select
            :label="`${$t('row.product')}*`"
            :rules="[formRules.required]"
            :items="products"
            v-model="formData.product"
          >
            <template slot="selection" slot-scope="data">{{ data.item.name }}</template>
            <template slot="item" slot-scope="data">{{ data.item.name }}</template>
          </v-select>

          <v-text-field
            :label="$t('row.quantity')"
            :rules="[formRules.integer]"
            v-model="formData.quantity"
          ></v-text-field>

          <v-text-field :label="$t('row.note')" v-model="formData.note"></v-text-field>
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
