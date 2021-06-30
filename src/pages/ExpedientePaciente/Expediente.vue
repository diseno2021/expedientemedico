<template>
  <div>
    <q-inner-loading :showing="cargando">
      <q-spinner-cube size="3rem" color="primary" />
      <span
        class=" text-primary
        text-uppercase
        text-overline
        text-weight-bold"
        >Cargando informacion del paciente</span
      >
    </q-inner-loading>
    <!--Si no existe el paciente-->
    <div class="row justify-center" v-if="cargando == false && paciente == null">
      <div class="col-12 text-h5 q-my-xl text-center">
        No existe el paciente con id: {{ $router.currentRoute.params.id }}
      </div>
      <div class="col-auto">
        <q-btn icon="people" color="secondary" to="/">Ver Pacientes</q-btn>
      </div>
    </div>
    <!--Si el paciente no pertenece al medico-->
    <div class="row justify-center" v-else-if="cargando == false && paciente == 'No pertece al medico'">
      <div class="col-12 text-h5 q-my-xl text-center">
        El paciente con id: {{ $router.currentRoute.params.id }} , no pertece a su lista de pacientes
      </div>
      <div class="col-auto">
        <q-btn icon="people" color="secondary" to="/">Ver Pacientes</q-btn>
      </div>
    </div>
    <div v-else-if="cargando == false">
      <div class="row">
        <div class="col-12">
          <InformacionPersonal
            id="informacion-personal"
            :paciente="paciente"
            v-if="paciente !== null"
            @guardarInformacion="guardarInformacion"
            ref="refInformacionPersonal"
          />
        </div>
      </div>
      <q-separator></q-separator>
      <div class="row">
        <div class="col-12 col-md-6">
          <Antecedentes
            id="antecedentes"
            :paciente="paciente"
            v-if="paciente !== null"
            ref="refAntecedentes"
          />
        </div>
        <div class="col-12 col-md-6">
          <Alergias
            id="alergias"
            :paciente="paciente"
            v-if="paciente !== null"
            ref="refAlergias"
          />
        </div>
      </div>
      <q-separator></q-separator>
      <div class="row">
        <div class="col-12 col-md-6">
          <MedicamentosPermanentes
            id="medicamentos-permanentes"
            :paciente="paciente"
            v-if="paciente !== null"
            ref="refMedicamentosPermanentes"
          />
        </div>
        <div class="col-12 col-md-6">
          <EnfermedadesCronicas
            id="enfermedades-cronicas"
            :paciente="paciente"
            v-if="paciente !== null"
            ref="refEnfermedadesCronicas"
          />
        </div>
      </div>
      <q-separator></q-separator>
      <Consultas id="consultas" :consultas="consultasPaciente" />
      <q-separator></q-separator>
      <Recetas id="recetas" :consultas="consultasPaciente" />

      <q-separator></q-separator>
      <!-- idPaciente sera donde nos envien el id del paciente del que se esta visualizando expediente -->

      <Examenes id="examenes" :idPaciente="this.$router.currentRoute.params.id" />
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
import { auth, db } from "../../boot/firebase";
import { date } from "quasar";

export default {
  data: () => ({
    cargando: true,
    paciente: null,
    validacionPaciente: '',
    consultasPaciente: []
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
      let actualizarPaciente = {
        antecedentes: this.$refs.refAntecedentes.paciente.antecedentes,
        alergias: this.$refs.refAlergias.paciente.alergias,
        medicamentosPermanentes: this.$refs.refMedicamentosPermanentes.paciente.medicamentosPermanentes,
        EnfermedadesCronicas: this.$refs.refEnfermedadesCronicas.paciente.enfermedadesCronicas,
        direccion: this.$refs.refInformacionPersonal.paciente.direccion,
        dui: this.$refs.refInformacionPersonal.paciente.dui,
        email: this.$refs.refInformacionPersonal.paciente.email,
        enCasoEmergencia: this.$refs.refInformacionPersonal.paciente
          .enCasoEmergencia,
        estatura: this.$refs.refInformacionPersonal.paciente.estatura,
        fechaNacimiento: this.$refs.refInformacionPersonal.paciente
          .fechaNacimiento,
        genero: this.$refs.refInformacionPersonal.paciente.genero,
        nombre: this.$refs.refInformacionPersonal.paciente.nombre,
        peso: this.$refs.refInformacionPersonal.paciente.peso,
        telefono: this.$refs.refInformacionPersonal.paciente.telefono,
        tipoSangre: this.$refs.refInformacionPersonal.paciente.tipoSangre,
        whatsapp: this.$refs.refInformacionPersonal.paciente.whatsapp
      };
      let id = this.$router.currentRoute.params.id;
      var usuarioRef = db.collection("pacientes").doc(id);
      return usuarioRef
        .update(actualizarPaciente)
        .then(() => {
          this.$q.notify({
            message: "Información actualizada",
            color: "green-4",
            textColor: "white",
            icon: "cloud_done"
          });
        })
        .catch(error => {
          this.$q.notify({
            type: 'negative',
            message: 'Error al actualizar información'
          });
        });
      //console.log(actualizarPaciente);
    },
    obtenerDatosPaciente() {
      let id = this.$router.currentRoute.params.id;
      var docRef = db.collection("pacientes").doc(id);
      docRef
        .get()
        .then(doc => {
          if (doc.exists) {
            if (doc.data().idMedico == auth.currentUser.uid) {
              this.paciente = doc.data();
              this.paciente.fechaNacimiento = date.formatDate(this.paciente.fechaNacimiento, 'DD/MM/YYYY');
            } else {
              this.paciente = 'No pertece al medico';
            }
          } else {
            this.paciente = null;
          }
        })
        .catch(error => {
          console.log("Error getting document:", error);
        })
        .finally( () => {
          this.cargando = false;
        });
    },
    obtenerConsultas() {
      db.collection("consultas")
        .where("idPaciente", "==", this.$router.currentRoute.params.id)
        .get()
        .then(qs => {
          qs.docs.forEach(doc => {
            let consulta = doc.data();
            Object.defineProperty(consulta, "id", {
              value: doc.id,
              writable: true,
              enumerable: true,
              configurable: true
            });
            this.consultasPaciente.push(consulta);
            this.consultasPaciente.reverse();
          });
        });
    }
  },
  created() {
    this.obtenerDatosPaciente();
    this.obtenerConsultas();
  }
};
</script>

<style></style>
