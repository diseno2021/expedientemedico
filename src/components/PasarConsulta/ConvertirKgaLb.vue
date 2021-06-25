<template>
  <div class="col-md-6" dense>
    
    <div class="row justify-center" dense>
      <q-input filled mask="###.##" v-model="pesoKg" label="Peso Kg" dense style="max-width: 6rem; margin-right: 0.5rem"/>
      <q-btn        
        color="primary"
        type="submit"
        icon="keyboard_arrow_right"
        dense
        @click="convertirPeso()"
      >
      <q-tooltip
                  content-class="bg-accent text-white"
                  content-style="font-size: 12px"
                  anchor="top left"
                  self="bottom left"                  
                  >convertir</q-tooltip>
      </q-btn>
      <q-input
      filled        
        mask="###.##"
        v-model="pesoLb"        
        label="Peso lb"
        style="max-width: 6rem; margin-left: 0.5rem"
        dense
      />
    </div>
    <div class="row justify-center">
        Convertir peso de Kg a Lb
      
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
    convertirPeso() {
      this.pesoLb = this.pesoKg * 2.2046;
    },
  },
};
</script>