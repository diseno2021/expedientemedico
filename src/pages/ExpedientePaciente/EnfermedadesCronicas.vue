<template>
  <div class="q-ma-md">
    <div class="row">
      <h3 class="text-h3">Enfermedades Crónicas</h3>
    </div>
    <q-card flat bordered class="my-card">
      <q-card-section>
        <div class="text-h6">Datos</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
       Discapacidad: Ninguna
      </q-card-section>

      <q-separator inset />

      <q-card-section>
       Enfermedad de Taquicardia
      </q-card-section>
    </q-card>
  </div>
</template>
<script>
import BannerPrincipal from "./../../components/ExpedientePaciente/BannerPrincipal.vue";
export default {
  data() {
    return {
      date: "2020/02/01",
      edad: "",
      genero: "",
      editor: "",
      lorem: ""
    };
  },
  components: {
    BannerPrincipal,
  },
};
</script>