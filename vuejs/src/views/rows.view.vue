<!-- script -->
<script lang="ts">
import Vue from 'vue';

import AppModalRowForm from '../components/app-modal-row-form.component.vue';
import { rowsService } from '../services/rows.service';
import { pipe } from 'rxjs';
import { tap } from 'rxjs/operators';
import store from '../stores/central.store';
import { Row } from '../domain/row.types';
import { productsService } from '../services/products.service';
import { Product } from '../domain/product.types';

type DataType = {
  headers: { text: string; value: string; align: string; sortable: boolean }[];
  isModalOpen: boolean;
  rowBeingUpdated: Partial<Row>;
};

export default Vue.extend({
  components: {
    AppModalRowForm,
  },
  data() {
    return <DataType>{
      headers: [
        { text: '', value: 'checked', sortable: false },
        { text: this.$t('row.product'), value: 'product.name', align: 'left' },
        { text: this.$t('row.note'), value: 'note', align: 'left' },
        { text: this.$t('row.quantity'), value: 'quantity', align: 'left' },
        { text: '', value: '', align: 'right', sortable: false },
      ],
      isModalOpen: false,
      rowBeingUpdated: { product: {} },
    };
  },
  created() {
    rowsService.getRows().subscribe();
    productsService.getProducts().subscribe();
  },
  methods: {
    openEditionModal(row?: Row) {
      this.rowBeingUpdated = <Row>{
        ...row,
        product: row
          ? this.$store.getters.products.find((product: Product) => product.id === row.product.id) || {}
          : {},
      };
      this.isModalOpen = true;
    },
    closeModal() {
      this.rowBeingUpdated = { product: {} };
      this.isModalOpen = false;
    },

    saveRow(row: Partial<Row>) {
      if (this.rowBeingUpdated.id) {
        rowsService.updateRow(<Row>{ ...this.rowBeingUpdated, ...row });
      } else {
        rowsService.addRow(<Row>row);
      }
    },
    updateRow(row: Row) {
      rowsService.updateRow(row);
    },
    deleteRow(rowId: string) {
      rowsService.deleteRow(rowId).subscribe();
    },
    checkRow() {},
  },
  store,
});
</script>

<!-- template -->
<template>
  <div>
    <app-modal-row-form
      :initialValue="this.rowBeingUpdated"
      v-model="isModalOpen"
      @dismiss="$event ? saveRow($event) : () => {}"
    ></app-modal-row-form>

    <v-data-table :headers="headers" :items="$store.getters.rows" class="elevation-1">
      <template v-slot:headerCell="props">
        <span v-if="props.header.value.length">{{ props.header.text }}</span>

        <span v-else>
          <v-btn icon class="ma-0" @click="openEditionModal()">
            <v-icon>add</v-icon>
          </v-btn>
        </span>
      </template>

      <template v-slot:items="props">
        <td class="text-xs-left check">
          <v-checkbox
            :input-value="props.item.checked"
            hide-details
            @change="checked => updateRow({ ...props.item, checked })"
          ></v-checkbox>
        </td>
        <td class="text-xs-left name">{{ props.item.product.name }}</td>
        <td class="text-xs-left note">{{ props.item.note || '-' }}</td>
        <td class="text-xs-left quantity">{{ props.item.quantity || '-' }}</td>
        <td class="text-xs-right actions">
          <v-btn flat icon class="ma-0" @click="openEditionModal(props.item)">
            <v-icon>edit</v-icon>
          </v-btn>
          <v-btn flat icon class="ma-0" @click="deleteRow(props.item.id)">
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
  &:first-child,
  &.quantity {
    width: 1px;
  }
  &:last-child {
    width: 104px;
  }
}

@media (max-width: 480px) {
  td {
    &:last-child {
      width: 80px;
    }
  }
}
</style>