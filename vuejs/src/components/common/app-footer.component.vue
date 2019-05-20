<!-- script -->
<script lang="ts">
export default {};
</script>

<!-- template -->
<template>
  <footer>
    <v-card color="primary">{{ $t('app.title') }}</v-card>
  </footer>
</template>

<!-- style -->
<style lang="scss" scoped>
.v-card {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 48px;
  padding: 8px;
  border-radius: 0;
}
</style>