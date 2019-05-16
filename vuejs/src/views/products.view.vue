<!-- script -->
<script lang="ts">
import Vue from 'vue';

import AppPrompt from '../components/app-prompt.component.vue';
import { productsService } from '../services/products.service';
import { pipe } from 'rxjs';
import { tap } from 'rxjs/operators';
import store from '../stores/central.store';
import { Product } from '../domain/product.types';

type DataType = {
  headers: { text: string; value: string; align: string; sortable: boolean }[];
  isModalOpen: boolean;
  productBeingUpdated?: Product;
};

export default Vue.extend({
  components: {
    AppPrompt,
  },
  data() {
    return <DataType>{
      headers: [
        { text: this.$t('product.name'), value: 'name', align: 'left' },
        { text: '', value: 'edit', align: 'right', sortable: false },
      ],
      isModalOpen: false,
      productBeingUpdated: undefined,
    };
  },
  created() {
    productsService.getProducts().subscribe();
  },
  methods: {
    openEditionModal(product?: Product) {
      this.productBeingUpdated = product ? { ...product } : undefined;
      this.isModalOpen = true;
    },
    closeModal() {
      this.isModalOpen = false;
    },

    saveProduct(product: Partial<Product>) {
      if (this.productBeingUpdated) {
        productsService.updateProduct(<Product>{ ...this.productBeingUpdated, ...product });
      } else {
        productsService.addProduct(<Product>product);
      }
    },
    deleteProduct(productId: string) {
      productsService.deleteProduct(productId).subscribe();
    },
  },
  store,
});
</script>

<!-- template -->
<template>
  <div>
    <app-prompt
      :title="$t('product')"
      :placeholder="$t('product.name')"
      :initialValue="productBeingUpdated ? this.productBeingUpdated.name : ''"
      v-model="isModalOpen"
      @dismiss="saveProduct(({ name: $event }))"
    ></app-prompt>

    <v-data-table :headers="headers" :items="$store.getters.products" class="elevation-1">
      <template v-slot:headerCell="props">
        <span v-if="props.header.text">{{ props.header.text }}</span>

        <span v-else>
          <v-btn icon class="ma-0" @click="openEditionModal()">
            <v-icon>add</v-icon>
          </v-btn>
        </span>
      </template>

      <template v-slot:items="props">
        <td class="text-xs-left">{{ props.item.name }}</td>
        <td class="text-xs-right">
          <v-btn flat icon class="ma-0" @click="openEditionModal(props.item)">
            <v-icon>edit</v-icon>
          </v-btn>
          <v-btn flat icon class="ma-0" @click="deleteProduct(props.item.id)">
            <v-icon>delete</v-icon>
          </v-btn>
        </td>
      </template>
    </v-data-table>
  </div>
</template>

<!-- style -->
<style lang="scss" scoped>
td {
  &:last-child {
    width: 120px;
  }
}
</style>