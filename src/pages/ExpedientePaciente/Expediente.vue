<template>
  <div>
    <div class="row">
      <div class="col-12">
        <InformacionPersonal id="informacion-personal" :paciente="paciente" v-if="paciente !== null"/>
      </div>
    </div>
    <q-separator></q-separator>
    <div class="row">
      <div class="col-12 col-md-6">
        <Antecedentes id="antecedentes" :paciente="paciente" v-if="paciente !== null"/>
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
    <!-- idPaciente sera donde nos envien el id del paciente del que se esta visualizando expediente -->
    <Examenes id="examenes" idPaciente="asdfasdfasdfa987asdfasdf76aq" />
    <q-separator></q-separator>
    <div class="row  justify-end q-mt-md">
      <div class="col-12 col-sm-6 col-lg-4">
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
import { db, st } from "../../boot/firebase";

export default {
  data: () => ({
    paciente: null,
  }),
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
    },
    obtenerDatosPaciente() {
      let id = this.$router.currentRoute.params.id
      var docRef = db.collection("pacientes").doc(id);
      docRef
        .get()
        .then(doc => {
          if (doc.exists) {
            this.paciente = doc.data();
          } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
          }
        })
        .catch(error => {
          console.log("Error getting document:", error);
        });
    }
  },
  created(){
    this.obtenerDatosPaciente();
  }
};
</script>

<style></style>
