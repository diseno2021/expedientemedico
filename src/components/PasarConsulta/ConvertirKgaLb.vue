<template>
  <div class="col-md-6" dense>
    <div class="row justify-center" dense>
      <q-input
        filled
        v-model="pesoKg"
        label="Peso Kg"
        dense
        style="max-width: 6rem; margin-right: 0.5rem"
        @change="convertirKgALb"
      >
        <q-tooltip>Presione enter para convertir Kg a Lb</q-tooltip>
      </q-input>

      <q-input
        filled
        v-model="pesoLb"
        label="Peso lb"
        style="max-width: 6rem; margin-left: 0.5rem"
        dense
        @change="convertirLbaKg"
      >
        <q-tooltip>Presione enter para convertir Lb a</q-tooltip>
      </q-input>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
export default {
  data() {
    return {
      pesoKg: 0,
      pesoLb: 0,
    };
  },
  methods: {
    convertirKgALb() {
      this.pesoLb = `${this.pesoKg * 2.2046}`.slice(0, 6);
    },
    convertirLbaKg() {
      this.pesoKg = `${this.pesoLb / 2.2046}`.slice(0, 6);
    },
  },
};
</script>