<template>
  <div>
    <div class="q-pa-md q-gutter-sm">
      <q-editor
        v-model="editor"
        :definitions="{
          bold: { label: 'Style', icon: null, tip: 'style' },
        }"
      />
      <div class="row justify-between">
        <q-btn color="white" text-color="black" label="Guardar" />
      </div>
    </div>
    <div class="row justify-between">
      <div class="col-md-5 q-mx-md">
        <p class="text">Medicamentos Permanentes</p>
        <q-card
          class="my-card text-black"
          style="background: white(circle, #35a2ff 0%, #014a88 100%)"
        >
          <q-card-section>
            <div class="text-h6">Fecha 03/05/2021</div>
            <div class="text-subtitle2">Amoxicilina cada 8 horas</div>
            <div class="text-subtitle2">Fecha 03/05/2021</div>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-md-5 q-mx-md">
        <p class="text">Historicos</p>
        <q-card
          class="my-card text-black"
          style="background: white(circle, #35a2ff 0%, #014a88 100%)"
        >
          <q-card-section>
            <div class="text-h6">Fecha 03/05/2021</div>
            <div class="text-subtitle2">Paracetamol</div>
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
      editor: "",
    };
  },
  components: {
    BannerPrincipal,
  },
};
</script>