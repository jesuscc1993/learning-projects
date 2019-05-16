<!-- script -->
<script>
import store from '../stores/central.store';

const emptyFormData = { product: {} };

export default {
  props: {
    initialValue: Object,
    value: Boolean,

    title: String,
    placeholder: String,
  },
  data() {
    return {
      formData: { ...emptyFormData },
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
};
</script>

<!-- template -->
<template>
  <v-dialog v-model="isOpen" width="480">
    <v-card>
      <v-card-title class="headline primary" primary-title>{{ $t('row') }}</v-card-title>

      <v-card-text>
        <v-select
          :label="$t('row.product')"
          :items="$store.getters.products"
          v-model="formData.product"
        >
          <template slot="selection" slot-scope="data">{{ data.item.name }}</template>
          <template slot="item" slot-scope="data">{{ data.item.name }}</template>
        </v-select>

        <v-text-field :label="$t('row.quantity')" v-model="formData.quantity"></v-text-field>

        <v-text-field :label="$t('row.note')" v-model="formData.note"></v-text-field>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="primary"
          :disabled="!formData.product"
          @click="dismiss()"
        >{{ $t('generic.save') }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<!-- style -->
<style lang="scss" scoped></style>
