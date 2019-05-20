<!-- script -->
<script lang="ts">
import Vue from 'vue';
import { pipe, forkJoin } from 'rxjs';
import { tap, flatMap } from 'rxjs/operators';

import AppConfirmationPrompt from '../../components/common/app-confirmation-prompt.component.vue';
import { formatDatetime } from '../../domain/dates';
import { List } from '../../domain/list.types';
import { listsService } from '../../services/lists.service';
import store from '../../stores/central.store';
import { rowsService } from '../../services/rows.service';

type Data = {
  headers: { text: string; value: string; align?: string; sortable?: boolean }[];
  pagination: { sortBy: string; descending: boolean };
  isPromptOpen: boolean;
  listBeingLoaded?: List;
};
type Methods = {
  loadList: (list: List) => void;
};

export default Vue.extend<Data, Methods, {}>({
  components: {
    AppConfirmationPrompt,
  },
  data() {
    return {
      headers: [
        { text: <string>this.$t('list.date'), value: 'isoDate', align: 'left' },
        { text: <string>this.$t('list.products'), value: 'rows', align: 'left' },
        { text: '', value: '', align: 'right', sortable: false },
      ],
      pagination: {
        sortBy: 'isoDate',
        descending: true,
      },
      isPromptOpen: false,
    };
  },
  methods: {
    showListLoadingPrompt(listBeingLoaded: List) {
      this.listBeingLoaded = listBeingLoaded;
      this.isPromptOpen = true;
    },
    loadList() {
      rowsService.setRows(this.listBeingLoaded.rows).subscribe();
    },
    formatDatetime(date: Date | string) {
      return formatDatetime(date);
    },
  },
  store,
});
</script>

<!-- template -->
<template>
  <div>
    <app-confirmation-prompt
      :title="$t('list.load')"
      :body="$t('list.load.confirmation')"
      confirmationColor="warning"
      v-model="isPromptOpen"
      @dismiss="$event ? loadList() : () => {}"
    ></app-confirmation-prompt>

    <v-data-table
      :headers="headers"
      :items="$store.getters.lists"
      :loading="!$store.getters.areListsReady"
      :pagination.sync="pagination"
      class="elevation-1"
    >
      <template v-slot:items="props">
        <td class="text-xs-left date">{{ formatDatetime(props.item.isoDate) }}</td>
        <td
          class="text-xs-left products"
        >({{ props.item.rows.length }}) {{ props.item.rows.map(row => row.product.name).join(', ') }}.</td>
        <td class="text-xs-right actions">
          <v-btn flat icon class="ma-0" @click.stop="showListLoadingPrompt(props.item)">
            <v-icon>folder_open</v-icon>
          </v-btn>
        </td>
      </template>
    </v-data-table>
  </div>
</template>

<!-- style -->
<style lang="scss" scoped>
td {
  &.products {
    width: 100%;
  }
  &.date,
  &.actions {
    white-space: nowrap;
  }
}
</style>