<!-- script -->
<script lang="ts">
import Vue from 'vue';
import { pipe } from 'rxjs';
import { tap } from 'rxjs/operators';

import AppModalProductForm from '../../components/products/app-modal-product-form.component.vue';
import { Product } from '../../domain/product.types';
import { productsService } from '../../services/products.service';
import store from '../../stores/central.store';

type Data = {
  headers: { text: string; value: string; align: string; sortable: boolean }[];
  isModalOpen: boolean;
  productBeingUpdated?: Product;
};
type Methods = {
  openEditionModal: (product?: Product) => void;
  closeModal: () => void;
  saveProduct: (product: Partial<Product>) => void;
  deleteProduct: (productId: string) => void;
};

export default Vue.extend<Data, Methods, undefined>({
  components: {
    AppModalProductForm,
  },
  data() {
    return <Data>{
      headers: [
        { text: this.$t('product.name'), value: 'name', align: 'left' },
        { text: '', value: 'edit', align: 'right', sortable: false },
      ],
      isModalOpen: false,
      productBeingUpdated: undefined,
    };
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
        productsService.updateProduct(<Product>{ ...this.productBeingUpdated, ...product }).subscribe();
      } else {
        productsService.addProduct(<Product>product).subscribe();
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
    <app-modal-product-form
      :initialValue="this.productBeingUpdated"
      v-model="isModalOpen"
      @dismiss="$event ? saveProduct($event) : () => {}"
    ></app-modal-product-form>

    <v-data-table
      :headers="headers"
      :items="$store.getters.products"
      :loading="!$store.getters.areProductsReady"
      class="elevation-1"
    >
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
          <v-btn flat icon class="ma-0" @click.stop="openEditionModal(props.item)">
            <v-icon>edit</v-icon>
          </v-btn>
          <v-btn flat icon class="ma-0" @click.stop="deleteProduct(props.item.id)">
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
  &.name {
    width: 100%;
  }
  &.actions {
    white-space: nowrap;
  }
}
</style>