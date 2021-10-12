<template>
  <q-page-container> 
    <Imagen id="examenes"/>
  </q-page-container>
</template>

<script>
import Imagen from "components/Configuraciones/galeria.vue";

import { db } from "../../boot/firebase";
export default {
  components: {
    Imagen
  },
  data() {
    return {};
  },
  created() {},

  methods: {
    
  }  
};
</script>