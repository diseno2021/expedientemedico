<template>
  <div>
    <div class="row">
      <div class="col-12">
        <InformacionPersonal id="informacion-personal" />
      </div>
    </div>
    <q-separator></q-separator>
    <div class="row">
      <div class="col-12 col-md-6">
        <Antecedentes id="antecedentes" />
      </div>
      <div class="col-12 col-md-6">
        <Alergias id="alergias" />
      </div>
    </div>
    <q-separator></q-separator>
    <div class="row">
      <div class="col-12 col-md-6">
        <MedicamentosPermanentes id="medicamentos-permanentes" />
      </div>
      <div class="col-12 col-md-6">
        <EnfermedadesCronicas id="enfermedades-cronicas" />
      </div>
    </div>
    <q-separator></q-separator>
    <Consultas id="consultas" />
    <q-separator></q-separator>
    <Recetas id="recetas" />
    <q-separator></q-separator>
    <Examenes id="examenes" />
    <q-separator></q-separator>
    <div class="row  justify-end q-mt-md">
      <div class="col-12 col-sm-5">
        <q-btn
          outline
          color="primary"
          icon="home"
          label="Inicio"
          to="/"
          class="q-mx-sm"
        ></q-btn>
        <q-btn
          outline
          color="secondary"
          icon="save"
          label="Guardar"
          @click="guardarInformacion"
          class="q-mx-sm"
        ></q-btn>
      </div>
    </div>
  </div>
</template>

<script>
import InformacionPersonal from "./InformacionPersonal";
import Antecedentes from "./Antecedentes";
import Alergias from "./Alergias";
import MedicamentosPermanentes from "./MedicamentosPermanentes";
import Consultas from "./Consultas";
import Recetas from "./Recetas";
import EnfermedadesCronicas from "./EnfermedadesCronicas";
import Examenes from "../testGaleria.vue";
export default {
  components: {
    InformacionPersonal,
    Antecedentes,
    Alergias,
    MedicamentosPermanentes,
    Consultas,
    Recetas,
    EnfermedadesCronicas,
    Examenes
  },
   methods: {
    guardarInformacion() {
      this.$q.notify({
        message: "Información personal guardada en local storage",
        color: "green-4",
        textColor: "white",
        icon: "cloud_done"
      });
    }

  },
};
</script>

<style></style>
