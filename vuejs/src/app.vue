<!-- script -->
<script lang="ts">
import AppFooter from './components/common/app-footer.component.vue';
import AppHeader from './components/common/app-header.component.vue';
import AppSnackbar from './components/common/app-snackbar.component.vue';

export default {
  name: 'App',
  components: {
    AppFooter,
    AppHeader,
    AppSnackbar,
  },
};
</script>

<!-- template -->
<template>
  <div id="app">
    <v-app dark>
      <app-header/>
      <div id="content">
        <router-view/>
      </div>
      <app-footer/>
      <app-snackbar/>
    </v-app>
  </div>
</template>

<!-- style -->
<style lang="scss">
$header-h: 64px;
$footer-h: 48px;

$c-primary: #00897b;

.theme--dark {
  &.v-table {
    thead {
      tr {
        &:first-child {
          background: $c-primary;
          border: none;
        }
      }
    }
  }
  &.v-toolbar {
    background: $c-primary;
  }
  &.v-list .v-list--disabled {
    .v-icon {
      color: #fff8;
    }
  }
}

#content {
  min-height: calc(100vh - #{$header-h + $footer-h});
  max-width: 1152px;
  width: 100%;
  margin: 0 auto;
  padding: 32px 24px;
  box-sizing: border-box;
}

table.v-table {
  thead,
  tbody {
    th,
    td {
      $v-padding: 8px;
      $h-padding: 20px;

      &:first-child {
        padding: $v-padding #{$h-padding / 2} $v-padding $h-padding;
      }

      &:not(:nth-child(1)) {
        padding: $v-padding #{$h-padding / 2};
      }

      &:last-child {
        padding: $v-padding $h-padding $v-padding #{$h-padding / 2};
      }
    }
  }
}

@media (max-width: 480px) {
  $header-h: 56px;
  $footer-h: 48px;

  #content {
    padding: 16px 12px;
    min-height: calc(100vh - #{$header-h + $footer-h});
  }

  table.v-table {
    thead,
    tbody {
      $row-height: 40px;

      tr {
        height: $row-height;
      }
      th {
        height: $row-height * 1.15;
      }
      td {
        height: 100%;
      }

      th,
      td {
        $v-padding: 4px;
        $h-padding: 10px;

        &:first-child {
          padding: $v-padding #{$h-padding / 2} $v-padding $h-padding;
        }

        &:not(:nth-child(1)) {
          padding: $v-padding #{$h-padding / 2};
        }

        &:last-child {
          padding: $v-padding $h-padding $v-padding #{$h-padding / 2};
        }
      }

      .v-btn--icon {
        $size: 32px;
        width: $size;
        height: $size;

        .v-icon {
          font-size: 20px;
        }
      }
    }
  }
}
</style>
