<template>
  <div class="relative-position" :style="visible ? 'height: 92Vh' : ''">
    <div class="row q-pa-lg" v-if="!visible && clinicas.length > 0">
      <div
        class="col-12 col-md-6 q-pa-md"
        v-for="(clinica, i) in clinicas"
        :key="clinica.id"
      >
        <q-card class="my-card" flat bordered>
          <q-card-section class="row items-center">
            <q-icon name="apartment" style="font-size: 3rem;" />
            <div>
              <div class="text-h6">{{ clinica.nombre }}</div>
              <div class="text-subtitle2">
                <q-icon name="phone" />
                {{ clinica.telefono }}
              </div>
              <div class="text-caption text-blue-grey">
                <q-icon name="people" />
                {{ clinica.pacientesNum }} pacientes
              </div>
            </div>
            <q-space />
            <div>
              <q-btn
                flat
                round
                color="primary"
                icon="edit"
                :to="'/clinica/editar/' + clinica.id"
              >
                <q-tooltip>
                  Editar Clinica
                </q-tooltip>
              </q-btn>
              <q-btn
                flat
                round
                color="red"
                icon="delete"
                @click="preguntaClinica(clinica, i)"
              >
                <q-tooltip>
                  Borrar Clinica
                </q-tooltip>
              </q-btn>
            </div>
          </q-card-section>
          <q-separator inset />
          <q-expansion-item>
            <template v-slot:header>
              <q-tooltip>
                Ver direccion
              </q-tooltip>
              <q-item-section avatar>
                <q-avatar icon="place" />
              </q-item-section>
              <q-item-section>
                Dirección
              </q-item-section>
            </template>
            <q-card :class="$q.dark.isActive ? 'text-white' : 'text-black'">
              <q-card-section>
                <div>
                  {{ clinica.direccion.pais }},
                  {{ clinica.direccion.departamento }},
                  {{ clinica.direccion.municipio }},
                  {{ clinica.direccion.colonia }},
                  {{ clinica.direccion.calle }}
                </div>
                <div class="text-caption text-blue-grey q-mt-sm">
                  Punto de referencia: {{ clinica.direccion.referencia }}
                </div>
              </q-card-section>
            </q-card>
          </q-expansion-item>
        </q-card>
      </div>
      <div class="col-12">
        <q-btn
          to="/clinica/nueva"
          class="q-ml-md"
          color="blue-10"
          label="Nueva Clinica"
          icon-right="add"
        >
          <q-tooltip>
            Crear Clinica
          </q-tooltip>
        </q-btn>
      </div>
    </div>
    <!-- mensaje si no hay clinicas-->
    <div
      class="row  items-center justify-center items-center"
      v-if="!visible && clinicas.length == 0"
      style="height: 85Vh"
    >
      <div class="col-12 text-center text-primary">
        <q-icon name="local_hospital" style="font-size: 8rem" />

        <div class=" text-h4  text-weight-bolder">
          No hay clinicas registradas
        </div>
        <q-btn
          to="/clinica/nueva"
          class="q-mt-md"
          color="blue-10"
          label="Nueva Clinica"
          icon-right="add"
        >
          <q-tooltip>
            Crear Clinica
          </q-tooltip>
        </q-btn>
      </div>
    </div>
    <q-inner-loading :showing="visible">
      <q-spinner-cube size="3rem" color="primary" />
      <span
        class=" text-primary
        text-uppercase
        text-overline
        text-weight-bold"
        >Cargando Clinicas</span
      >
    </q-inner-loading>
    <q-dialog v-model="confirm" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-icon name="warning" class="text-red" style="font-size: 2rem;" />
          <span class="q-ml-sm">
            Esta seguro que desea borrar la clinica
            <strong>"{{ clinicaBorrar.nombre }}"</strong>
          </span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancelar" color="primary" v-close-popup />
          <q-btn flat label="Borrar" color="red" @click="eliminarClinica" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { auth, db } from "../../boot/firebase";
export default {
  data() {
    return {
      visible: true,
      confirm: false,
      clinicaBorrar: {},
      clinicas: []
    };
  },
  async created() {
    await this.traerClinicas();
    this.visible = false;
  },
  methods: {
    async traerClinicas() {
      this.clinicas = [];
      try {
        const clinicaSnap = await db
          .collection("clinicas")
          .where("idMedico", "==", auth.currentUser.uid)
          .get();
        clinicaSnap.forEach(async e => {
          var clinica = e.data();
          clinica.id = e.id;
          const pacienteSnap = await db
            .collection("pacientes")
            .where("clinica.id", "==", e.id)
            .get();
          clinica.pacientesNum = pacienteSnap.size;
          this.clinicas.push(clinica);
        });
      } catch (error) {
        console.error(error);
      }
    },
    preguntaClinica(clinica, i) {
      if (clinica.pacientesNum == 0) {
        this.clinicaBorrar = clinica;
        this.clinicaBorrar.index = i;
        this.confirm = true;
      } else {
        this.$q.notify({
          message:
            "No se puede eliminar clinicas con pacientes! Cambie a los pacientes de clinica primero",
          color: "red",
          icon: "error"
        });
      }
    },
    async eliminarClinica() {
      try {
        const snapClinica = await db
          .collection("clinicas")
          .doc(this.clinicaBorrar.id)
          .delete();
        this.clinicas.splice(this.clinicaBorrar.index, 1);
        this.clinicaBorrar = {};
        this.$q.notify({
          message: "Se elimino la clinica satisfactoriamente",
          color: "green",
          icon: "check_circle"
        });
        this.confirm = false;
      } catch (error) {
        console.error(error);
        this.$q.notify({
          message: "Se produjo un error al eliminar la clinica",
          color: "red",
          icon: "error"
        });
      }
    }
  }
};
</script>

<style>
.q-expansion-item--expanded {
  color: blue !important;
}
</style>
