<template>
  
   <div class="q-pa-md">
     <div class="q-pa-md">
     Encabezado
     <Imagen id="examenes"/>
     
     </div>
     <q-separator/>
     <div class="q-pa-md">
     Pie de pagina
     <Imagen id="examenes"/>
     
     </div>
     <q-separator/>
     <div class="q-pa-md">
     Firma digital
     <Imagen id="examenes"/>
     
     </div>
   </div>
    
      
  
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