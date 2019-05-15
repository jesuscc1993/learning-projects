<!-- script -->
<script lang="ts">
import Vue from 'vue';

import AppPrompt from '../components/app-prompt.component.vue';
import { rowsService } from '../services/rows.service';
import { pipe } from 'rxjs';
import { tap } from 'rxjs/operators';
import store from '../stores/central.store';
import { Row } from '../domain/row.types';

type DataType = {
  headers: { text: string; value: string; align: string; sortable: boolean }[];
  isModalOpen: boolean;
  rowBeingUpdated?: Row;
};

export default Vue.extend({
  components: {
    AppPrompt,
  },
  data() {
    return <DataType>{
      headers: [
        { text: this.$t('product.name'), value: 'name', align: 'left' },
        { text: this.$t('product.quantity'), value: 'quantity', align: 'left' },
        { text: '', value: 'edit', align: 'right', sortable: false },
      ],
      isModalOpen: false,
      rowBeingUpdated: undefined,
    };
  },
  created() {
    rowsService.getRows().subscribe();
  },
  methods: {
    openEditionModal(row?: Row) {
      this.rowBeingUpdated = row;
      this.isModalOpen = true;
    },
    closeModal() {
      this.isModalOpen = false;
    },

    saveProduct(row: Partial<Row>) {
      if (this.rowBeingUpdated) {
        rowsService.updateRow({ ...this.rowBeingUpdated, ...row });
      } else {
        rowsService.addRow(<Row>row);
      }
    },
    deleteProduct(rowId: string) {
      rowsService.deleteRow(rowId).subscribe();
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
      :initialValue="rowBeingUpdated ? this.rowBeingUpdated.name : ''"
      v-model="isModalOpen"
      @dismiss="saveProduct(({ name: $event }))"
    ></app-prompt>

    <div class="d-block text-xs-right">
      <v-btn icon color="primary" class="mx-1 my-2" @click="openEditionModal()">
        <v-icon>add</v-icon>
      </v-btn>
    </div>

    <v-data-table :headers="headers" :items="$store.getters.rows" class="elevation-1">
      <template v-slot:items="props">
        <td class="text-xs-left">{{ props.item.product.name }}</td>
        <td class="text-xs-left">{{ props.item.quantity }}</td>
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
<style lang="scss" scoped></style>