<!-- script -->
<script>
export default {
  props: {
    model: String,
    value: Boolean,

    title: String,
    placeholder: String,
  },
  computed: {
    isOpen: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('input', value);
      },
    },
  },
  methods: {
    dismiss() {
      this.$emit('dismiss', this.model);
      this.model = '';
      this.isOpen = false;
    },
  },
};
</script>

<!-- template -->
<template>
  <v-dialog v-model="isOpen" width="500">
    <v-card>
      <v-card-title class="headline primary" primary-title>{{ title }}</v-card-title>

      <v-card-text>
        <v-text-field v-if="isOpen" :label="placeholder" v-model="model" autofocus></v-text-field>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" :disabled="!model.length" @click="dismiss()">{{ $t('generic.save') }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<!-- style -->
<style lang="scss" scoped></style>
