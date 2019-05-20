<!-- script -->
<script lang="ts">
import Vue from 'vue';
import { pipe } from 'rxjs';
import { tap, flatMap } from 'rxjs/operators';

import AppConfirmationPrompt from '../../components/common/app-confirmation-prompt.component.vue';
import AppModalRowForm from '../../components/rows/app-modal-row-form.component.vue';
import { Product } from '../../domain/product.types';
import { Row } from '../../domain/row.types';
import { listsService } from '../../services/lists.service';
import { rowsService } from '../../services/rows.service';
import store from '../../stores/central.store';

type Data = {
  headers: { text: string; value: string; align?: string; sortable?: boolean }[];
  isModalOpen: boolean;
  isPromptOpen: boolean;
  rowBeingUpdated: Partial<Row>;
};
type Methods = {
  openEditionModal: (row?: Row) => void;
  showRowsClearingPrompt: () => void;
  closeModal: () => void;
  saveRow: (row: Partial<Row>) => void;
  toggleRowChecked: ({ checked, ...row }: Row) => void;
  addRow: (row: Row) => void;
  updateRow: (row: Row) => void;
  deleteRow: (rowId: string) => void;
  clearRows: () => void;
};
type Computed = {
  eligibleProducts: () => void;
};

export default Vue.extend<Data, Methods, Computed>({
  components: {
    AppConfirmationPrompt,
    AppModalRowForm,
  },
  data() {
    return {
      headers: [
        { text: '', value: 'checked', sortable: false },
        { text: <string>this.$t('row.product'), value: 'product.name', align: 'left' },
        { text: <string>this.$t('row.note'), value: 'note', align: 'left' },
        { text: <string>this.$t('row.quantity'), value: 'quantity', align: 'left' },
        { text: '', value: '', align: 'right', sortable: false },
      ],
      isModalOpen: false,
      isPromptOpen: false,
      rowBeingUpdated: {},
    };
  },
  methods: {
    openEditionModal(row?: Row) {
      this.rowBeingUpdated = <Row>{
        ...row,
        product: row
          ? this.$store.getters.products.find((product: Product) => product.id === row.product.id) || {}
          : undefined,
      };
      this.isModalOpen = true;
    },
    showRowsClearingPrompt() {
      this.isPromptOpen = true;
    },
    closeModal() {
      this.rowBeingUpdated = {};
      this.isModalOpen = false;
    },

    saveRow(row: Partial<Row>) {
      if (this.rowBeingUpdated.id) {
        this.updateRow(<Row>{ ...this.rowBeingUpdated, ...row });
      } else {
        this.addRow(<Row>row);
      }
    },
    toggleRowChecked({ checked, ...row }: Row) {
      this.updateRow({ ...row, checked: !checked });
    },

    addRow(row: Row) {
      rowsService.addRow(row).subscribe();
    },
    updateRow(row: Row) {
      rowsService.updateRow(row).subscribe();
    },
    deleteRow(rowId: string) {
      rowsService.deleteRow(rowId).subscribe();
    },
    clearRows() {
      listsService
        .addList({ rows: this.$store.getters.rows })
        .pipe(flatMap(() => rowsService.deleteAllRows()))
        .subscribe();
    },
  },
  computed: {
    eligibleProducts() {
      return this.$store.getters.products.filter(
        (product: Product) =>
          !this.$store.getters.rows.find((row: Row) => row.product.id === product.id) ||
          (this.rowBeingUpdated.product && product.id === this.rowBeingUpdated.product.id)
      );
    },
  },
  store,
});
</script>

<!-- template -->
<template>
  <div>
    <app-modal-row-form
      :initialValue="this.rowBeingUpdated"
      :products="eligibleProducts"
      v-model="isModalOpen"
      @dismiss="$event ? saveRow($event) : () => {}"
    ></app-modal-row-form>

    <v-data-table
      :headers="headers"
      :items="$store.getters.rows"
      :loading="!$store.getters.areRowsReady"
      class="elevation-1"
    >
      <template v-slot:headerCell="props">
        <span v-if="props.header.value.length">{{ props.header.text }}</span>

        <span v-else>
          <v-btn icon class="ma-0" @click="openEditionModal()">
            <v-icon>add</v-icon>
          </v-btn>
        </span>
      </template>

      <template v-slot:items="props">
        <tr @click="toggleRowChecked(props.item)" class="clickable">
          <td class="text-xs-left check">
            <v-checkbox :input-value="props.item.checked" hide-details @click="() => {}"></v-checkbox>
          </td>
          <td class="text-xs-left name">{{ props.item.product.name }}</td>
          <td class="text-xs-left note">{{ props.item.note || '-' }}</td>
          <td class="text-xs-left quantity">{{ props.item.quantity || '-' }}</td>
          <td class="text-xs-right actions">
            <v-btn flat icon class="ma-0" @click.stop="openEditionModal(props.item)">
              <v-icon>edit</v-icon>
            </v-btn>
            <v-btn flat icon class="ma-0" @click.stop="deleteRow(props.item.id)">
              <v-icon>delete</v-icon>
            </v-btn>
          </td>
        </tr>
      </template>
    </v-data-table>

    <div class="text-xs-right">
      <app-confirmation-prompt
        :title="$t('list.clear')"
        :body="$t('list.clear.confirmation')"
        confirmationColor="warning"
        v-model="isPromptOpen"
        @dismiss="$event ? clearRows() : () => {}"
      ></app-confirmation-prompt>

      <v-btn
        class="primary my-2 mx-0"
        @click="showRowsClearingPrompt()"
        :disabled="!$store.getters.rows.length"
      >
        {{$t('list.clear')}}
        <v-icon>delete</v-icon>
      </v-btn>
    </div>
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