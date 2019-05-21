<!-- script -->
<script lang="ts">
import Vue from 'vue';

import AppRowsTable from '../components/rows/app-rows-table.component.vue';
import AppListsTable from '../components/lists/app-lists-table.component.vue';

export default {
  components: { AppRowsTable, AppListsTable },
};
</script>

<!-- template -->
<template>
  <div>
    <app-lists-table @listLoad="$router.push('list')"/>
  </div>
</template>

<!-- style -->
<style lang="scss" scoped></style>