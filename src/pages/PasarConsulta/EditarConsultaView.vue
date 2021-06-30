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

        <q-toolbar-title> Editar Consulta</q-toolbar-title>
        
      </q-toolbar>
    </q-header>
    <Menu ref="menu" />
    <!-- <q-drawer v-model="drawerRight" show-if-above bordered side="right">
      <NavegacionConsulta ref="nav" />
    </q-drawer> -->
    <q-page-container>
      <q-page padding class="q-pt-none">
        <div id="pasar-consulta" >
          <div class="row items-center">
            <div class="col-12 col-sm-7 justify-between">
              <h2 class="text-h2">Editar Consulta</h2>
            </div>
            <div class="col-12 col-sm-5 column justify-center">
              <q-btn
                class="q-my-sm"
                
                color="primary"
                icon="keyboard_arrow_left"
                @click="obtenerIdPaciente()"
              >
                Regresar al expediente
                <q-tooltip
                  content-class="bg-accent text-white"
                  content-style="font-size: 12px"
                  anchor="top left"
                  self="bottom left"
                  :offset="[0, 8]"
                  >Regresar al expediente</q-tooltip
                ></q-btn
              >

              <q-btn
                class="q-my-sm"
                
                color="secondary"
                icon="save"
                @click="guardarConsulta()"
                type="submit"
              >
                Editar Consulta
                <q-tooltip
                  content-class="bg-accent text-white"
                  content-style="font-size: 12px"
                  anchor="top left"
                  self="bottom left"
                  :offset="[0, 8]"
                  >Registrar una nueva consulta</q-tooltip
                ></q-btn
              >
              <!-- <q-input
                class="q-my-sm"
                dense
                outlined
                v-model="form_data.proximaCita"
                filled
                type="date"
                label="Próxima Cita"
                stack-label
                required
              /> -->
            </div>
          </div>
          <q-form ref="consultaForm">
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
                mask="###/##"
                min="0"
                outlined
                suffix="mmHg"
                v-model="form_data.presionArterial"
                label="presión"
                style="width: 8rem; min-width: 7rem"
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

                  <p>Sintomas</p>
                  <q-editor
                    :toolbar="toolbar"
                    v-model="form_data.sintomas"
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
             
              

            
          </q-form>
          <hr class="lt-md" />

          <div class="row justify-center items-baseline">
            
            <q-input
                class="q-my-sm"
                dense
                style="margin-left: auto; margin-right: auto"
                v-model="form_data.proximaCita"
                filled
                type="date"
                label="Próxima Cita"
                stack-label
                required
              />
            
              <q-btn
                class="q-my-sm"
                style="margin-left: auto; margin-right: auto"
                color="primary"
                icon="keyboard_arrow_left"
                @click="obtenerIdPaciente()"
              >
                Regresar al expediente
                <q-tooltip
                  content-class="bg-accent text-white"
                  content-style="font-size: 12px"
                  anchor="top left"
                  self="bottom left"
                  :offset="[0, 8]"
                  >Regresar al expediente</q-tooltip
                ></q-btn
              >

              <q-btn
                class="q-my-sm"
                style="margin-left: auto; margin-right: auto"
                color="secondary"
                icon="save"
                @click="guardarConsulta()"
                type="submit"
              >
                Editar Consulta
                <q-tooltip
                  content-class="bg-accent text-white"
                  content-style="font-size: 12px"
                  anchor="top left"
                  self="bottom left"
                  :offset="[0, 8]"
                  >Registrar una nueva consulta</q-tooltip
                ></q-btn
              >
          </div>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import perfil from "components/PasarConsulta/Perfil.vue";
//import navegacionConsulta from "components/PasarConsulta/NavegacionConsulta.vue";
import Examenes from "pages/testGaleriaComponent.vue";
import Menu from "components/Menu";
//import NavegacionConsulta from "components/PasarConsulta/NavegacionConsulta.vue";
import { db } from "../../boot/firebase";
export default {
  components: {
    perfil,
    //navegacionConsulta,
    Examenes,
    Menu
    //NavegacionConsulta
  },
  data() {
    return {
      error: false,
      drawerRight: false,
      scrollInfo: {},
      spyMovil: false,
      form_data: {},
      toolbar: [
        ["bold", "italic", "strike", "underline"],
        ["unordered", "ordered", "outdent", "indent"]
      ]
    };
  },
  async created() {
    const consulta = await this.obtenerConsulta();
    this.form_data = consulta;
    console.info(this.form_data);
  },
  methods: {
    async obtenerConsulta() {
      let idConsulta = this.$router.currentRoute.params.id;
      const doc = await db
        .collection("consultas")
        .doc(idConsulta)
        .get();

      if (doc.exists) {
        return doc.data();
      } else {
        this.$router.push(
          `consulta-no-encontrada/${this.$router.currentRoute.params.id}`
        );
      }
    },

    obtenerIdPaciente(){
      this.$router.push("/paciente/" + this.form_data.idPaciente);
    },

    validar() {
      if (this.form_data.proximaCita === undefined) {
        this.error = true;
      } else {
        this.form_data.proximaCita = this.form_data.proximaCita.toString();
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

    guardarConsulta() {
      this.validar;
      this.$refs.consultaForm.validate().then(success => {
        if (this.error === true) {
          this.showNotif(
            "Necesita rellenar los campos requeridos.",
            "negative",
            "close"
          );
        } else {
          try {
            this.$q.loading.show();
            const query = db
              .collection("consultas")
              .doc(this.$router.currentRoute.params.id)
              .set(this.form_data);
            this.showNotif("Se ha guardado la consulta", "positive", "check");
            this.$router.push("/paciente/" + this.form_data.idPaciente);
          } catch (error) {
            console.error(error);
          } finally {
            this.$q.loading.hide();
          }
        }
      });
    },

    onScroll(info) {
      if (this.spyMovil == false) {
        this.scrollInfo = info;
        
      }
    },
    test() {
      this.spyMovil = true;
      
      this.drawerRight = !this.drawerRight;
    }
  }
};
</script>

<style scoped></style>
