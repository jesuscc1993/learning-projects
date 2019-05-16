<!-- script -->
<script>
import AppFooter from './components/app-footer.component';
import AppHeader from './components/app-header.component';

export default {
  name: 'App',
  components: {
    AppFooter,
    AppHeader,
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
    </v-app>
  </div>
</template>

<!-- style -->
<style lang="scss">
$header-h: 64px;
$footer-h: 48px;

.theme--dark {
  &.v-table {
    thead {
      tr {
        &:first-child {
          background: #00897b;
          border: none;
        }
      }
    }
  }
}

#content {
  min-height: calc(100vh - #{$header-h + $footer-h});
  max-width: 1280px;
  width: 100%;
  margin: 0 auto;
  padding: 32px 24px;
  box-sizing: border-box;
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
        $v-padding: 10px;
        $h-padding: 4px;

        &:first-child {
          padding: $h-padding $v-padding / 2 $h-padding $v-padding;
        }

        &:not(:nth-child(1)) {
          padding: $h-padding $v-padding / 2;
        }

        &:last-child {
          padding: $h-padding $v-padding $h-padding $v-padding / 2;
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
