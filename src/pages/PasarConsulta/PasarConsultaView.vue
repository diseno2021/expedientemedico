<template>
  <q-layout view="lHh LpR lFf" @scroll="onScroll">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="$refs.menu.openCloseDrawer()"
        />

        <q-toolbar-title> Nueva Consulta </q-toolbar-title>
        <q-btn class="lt-md" flat @click="test" round dense icon="menu" />
      </q-toolbar>
    </q-header>
    <Menu ref="menu" />
    <q-drawer v-model="drawerRight" show-if-above bordered side="right">
      <NavegacionConsulta ref="nav" />
    </q-drawer>
    <q-page-container>
      <q-page padding class="q-pt-none">
        <div id="pasar-consulta">
          <div class="row items-center">
            <div class="col-12 col-sm-7 justify-between">
              <h2 class="text-h2">Pasar Consulta</h2>
            </div>
            <div class="col-12 col-sm-5 justify-between">
              <q-btn
                outline
                color="primary"
                icon="keyboard_arrow_left"
                label="Regresar al expediente"
                :to="'/paciente/' + this.$router.currentRoute.params.id"
                class="q-mx-sm"
              ></q-btn>
              <q-btn
                outline
                color="secondary"
                icon="save"
                label="Guardar"
                class="q-mx-sm"
              ></q-btn>
            </div>
          </div>
          <div class="row justify-center">
            <q-input
              class="q-mx-md q-my-md"
              type="number"
              min="0"
              outlined
              suffix="lb"
              v-model="form_data.peso"
              label="peso"
              style="max-width: 7rem; min-width: 5rem"
              required
            ></q-input>

            <q-input
              class="q-mx-md q-my-md"
              type="number"
              min="0"
              outlined
              suffix="cm"
              v-model="form_data.estatura"
              label="estatura"
              style="max-width: 7rem; min-width: 5rem"
              required
            ></q-input>

            <q-input
              class="q-mx-md q-my-md"
              type="number"
              min="0"
              outlined
              suffix="°C"
              v-model="form_data.temperatura"
              label="temperatura"
              style="max-width: 7rem; min-width: 5rem"
              required
            ></q-input>

            <q-input
              class="q-mx-md q-my-md"
              type="number"
              min="0"
              outlined
              suffix="kg/m2"
              v-model="form_data.imc"
              label="imc"
              style="max-width: 7rem; min-width: 5rem"
              required
            ></q-input>

            <q-input
              class="q-mx-md q-my-md"
              type="number"
              min="0"
              outlined
              suffix="mmHg"
              v-model="form_data.presionArterial"
              label="presión"
              style="width: 7rem; min-width: 5rem"
              required
            ></q-input>
          </div>
          <div class="row justify-center">
            <div class="col-md-6">
              <div class="q-pa-md q-gutter-sm">
                <p>Motivo de Consulta</p>
                <q-input
                  filled
                  v-model="form_data.motivoConsulta"
                  label="Motivo de consulta"
                  type="textarea"
                  required
                />

                <p>Sintomas subjetivos</p>
                <q-editor
                  :toolbar="toolbar"
                  v-model="form_data.sintomasSubjetivos"
                  min-height="7rem"
                  required
                ></q-editor>
                <p>Diagnostico</p>
                <q-editor
                  :toolbar="toolbar"
                  v-model="form_data.diagnostico"
                  min-height="7rem"
                  required
                ></q-editor>
              </div>
            </div>
            <div class="col-md-6">
              <div class="q-pa-md q-gutter-sm">
                <p>Exploracion fisica</p>
                <q-editor
                  :toolbar="toolbar"
                  v-model="form_data.exploracionFisica"
                  min-height="7rem"
                  required
                ></q-editor>
                <p>Examenes</p>
                <q-editor
                  :toolbar="toolbar"
                  v-model="form_data.examenes"
                  min-height="7rem"
                  required
                ></q-editor>

                <p>Recetas</p>
                <q-editor
                  :toolbar="toolbar"
                  v-model="form_data.receta"
                  min-height="7rem"
                  required
                ></q-editor>
              </div>
            </div>
          </div>

          <hr class="lt-md" />

          <div class="row justify-center items-baseline lt-md">
            <q-input
              outlined
              class="q-mb-lg"
              v-model="form_data.proximaCita"
              filled
              type="date"
              label="Próxima Cita"
              stack-label
              required
            />
            <div class="q-pa-md q-gutter-sm">
              <q-btn color="primary" label="Guardar" to="paciente"></q-btn>
            </div>
          </div>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import perfil from "components/PasarConsulta/Perfil.vue";
import navegacionConsulta from "components/PasarConsulta/NavegacionConsulta.vue";
import Examenes from "pages/testGaleriaComponent.vue";
import Menu from "components/Menu";
import NavegacionConsulta from "components/PasarConsulta/NavegacionConsulta.vue";

export default {
  components: {
    perfil,
    navegacionConsulta,
    Examenes,
    Menu,
    NavegacionConsulta,
  },
  data() {
    return {
      error: false,
      drawerRight: false,
      scrollInfo: {},
      spyMovil: false,
      form_data: {
        id: "",
        idPaciente: "",
        peso: 0,
        estatura: 0,
        temperatura: 0,
        imc: 0,
        presionArterial: 0,
        exploracionFisica: "",
        motivoConsulta: "",
        sintomas: "",
        diagnostico: "",
        receta: "",
        examenes: "",
        diagnostico: "",

        proximaCita: undefined,
      },
      toolbar: [
        ["bold", "italic", "strike", "underline"],
        ["unordered", "ordered", "outdent", "indent"],
      ],
    };
  },

  methods: {
    limpiarFormulario(){
       this.form_data.peso = 0,
       this.form_data.estatura = 0,
       this.form_data.temperatura = 0,
       this.form_data.presionArterial = 0,
       this.form_data.imc = 0,
       this.form_data.motivoConsulta = "",
       this.form_data.sintomas = "",
       this.form_data.exploracionFisica = "",
       this.form_data.examenes = "",
       this.form_data.receta = "",
       this.form_data.diagnostico = ""
    },

    validarDatos(){
     this.$refs.motivoConsulta.validate();
     this.$refs.sintomas.validate();
     this.$refs.exploracionFisica.validate();
     this.$refs.examenes.validate();
     this.$refs.receta.validate();
     this.$refs.diagnostico.validate();
     if (
         this.$refs.motivoConsulta.hasError ||
         this.$refs.sintomas.hasError ||
         this.$refs.exploracionFisica.hasError ||
         this.$refs.examenes.hasError ||
         this.$refs.receta.hasError ||
         this.$refs.diagnostico.hasError 
     ) {
       this.error = true;
     } else {
       this.error = false;
     }
    },

      showNotif(mensaje, color, icono) {
      this.$q.notify({
        message: mensaje,
        color: color,
        timeout: 1000,
        icon: icono,
        position: "top"
      });
    },

    onScroll(info) {
      if (this.spyMovil == false) {
        this.scrollInfo = info;
        this.$refs.nav.scrollspy(info.position);
      }
    },
    test() {
      this.spyMovil = true;
      this.$refs.nav.scrollspy(this.scrollInfo.position);
      this.drawerRight = !this.drawerRight;
    },
  },
  watch: {
    drawerRight: function (val) {
      if (this.drawerRight == false && this.spyMovil) {
        this.spyMovil = false;
      }
    },
  },
};
</script>

<style scoped></style>
