<template>
  <div>
    <h3 class="text-h3">Recetas</h3>
    <div class="q-pa-md q-gutter-sm">
      <q-editor v-model="editor"
        :definitions="{
          save: {
            tip: 'Guardar',
            icon: 'save',
            label: 'Guardar',
            handler: saveWork,
          },
        }"
        :toolbar="[
          ['bold', 'italic', 'strike', 'underline'],
          ['upload', 'save'],
        ]"
        min-height="10rem"
      />
    </div>
    <div class="row justify-between">
      <div class="col-md-5 q-mx-md">
        <p class="text-h6">Medicamentos Permanentes</p>
        <q-card
          class="my-card text-black"
          style="background: white(circle, #35a2ff 0%, #014a88 100%)"
        >
          <q-card-section>
            <div class="text-subtitle2">Fecha 03/05/2021</div>
            <div class="text-subtitle2">Acetaminofén cada 8 horas</div>
            <div class="text-subtitle2">Fecha 14/05/2021</div>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-md-5 q-mx-md">
        <p class="text-h6">Historicos</p>
        <q-card
          class="my-card text-black"
          style="background: white(circle, #35a2ff 0%, #014a88 100%)"
        >
          <q-card-section>
            <div class="text-subtitle2">Fecha 03/05/2021</div>
            <div class="text-subtitle2">Loratadina</div>
            <div class="text-subtitle2">Dosis:1 cada 8 horas</div>
          </q-card-section>
        </q-card>
      </div>
    </div>
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
      editor: "<br> Medicamentos Permanentes:<br/>Acetaminofén </br>Loratadina<br/>" //texto html
    };
  },
  components: {
    BannerPrincipal,
  },
  methods: {
    saveWork() {
      this.$q.notify({
        message: "Recetas guardadas en el local storage",
        color: "green-4",
        textColor: "white",
        icon: "cloud_done",
      });
    },
  },
};
</script>