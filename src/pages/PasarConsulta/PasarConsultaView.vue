<template>

  <div>
    Hello
    esto es para pasar consulta

  </div>
  
  <!-- <div class="q-pa-md">
    <q-layout view="lHh Lpr lff">
      <q-drawer v-model="drawer" show-if-above :width="200" :breakpoint="400">
        <div>
          <div class="absolute-top">
            <perfil />
          </div>
          <div class="absolute-bottom">
            <navegacionConsulta />
          </div>
        </div>
      </q-drawer>
    </q-layout>
  </div> -->
</template>

<script>
import perfil from "components/PasarConsulta/Perfil.vue";
import navegacionConsulta from "components/PasarConsulta/NavegacionConsulta.vue";

export default {
  components: {
    perfil,
    navegacionConsulta,
  },
  data() {
    return {
      drawer: false,
    };
  },
};
</script>