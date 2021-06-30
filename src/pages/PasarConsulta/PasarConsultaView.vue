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
            <div class="col-12 col-sm-5 column justify-center">
              <q-btn
                class="q-my-sm"
                
                color="primary"
                icon="keyboard_arrow_left"
                :to="'/paciente/' + this.$router.currentRoute.params.id"
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
                @click="agregarConsulta()"
                type="submit"
              >
                Registrar Consulta
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
                ref="proximaCita"
                class="q-my-sm"
                dense
                outlined
                v-model="form_data.proximaCita"
                filled
                type="date"
                label="Próxima Cita"
                stack-label
                lazy-rules
                :rules="[val => !!val || 'Campo requerido']"
              /> -->
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
              lazy-rules
              
            ></q-input>

            <q-input
              class="q-mx-md q-my-md"
              type="number"
              min="1"
              outlined
              suffix="cm"
              v-model="form_data.estatura"
              label="estatura"
              style="max-width: 7rem; min-width: 5rem"
              required
              lazy-rules
              
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
              lazy-rules
              
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
              lazy-rules
              
            ></q-input>

            <q-input
              class="q-mx-md q-my-md"
              mask="###/##"
              min="0/0"
              outlined
              suffix="mmHg"
              v-model="form_data.presionArterial"
              label="presión"
              style="width: 8rem; min-width: 7rem"
              required
              lazy-rules
              
            ></q-input>
          </div>
          <div class="row justify-center">
            <div class="col-md-6">
              <div class="q-pa-md q-gutter-sm">
                <p>Motivo de Consulta</p>
                <q-input
                  ref="motivo"
                  filled
                  v-model="form_data.motivoConsulta"
                  label="Motivo de consulta"
                  type="textarea"
                  required
                  lazy-rules
                  :rules="[val => !!val || 'Campo requerido']"
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
                <br/>
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
                  ref="receta"
                  v-model="form_data.receta"
                  min-height="7rem"
                  required
                  lazy-rules
                  :rules="[val => !!val || 'Campo requerido']"
                ></q-editor>
              </div>
            </div>
          </div>
          

          <hr class="lt-md" />

          <div class="row justify-center items-baseline">
            <q-btn
                class="q-my-sm"
                style="margin-left: auto; margin-right: auto"
                color="primary"
                icon="keyboard_arrow_left"
                :to="'/paciente/' + this.$router.currentRoute.params.id"
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
            <q-input
                ref="proximaCita"
                class="q-my-sm"
                dense
                style="margin-left: auto; margin-right: auto"
                v-model="form_data.proximaCita"
                filled
                type="date"
                label="Próxima Cita"
                stack-label
                lazy-rules
                
              />
              
          

              <q-btn
                class="q-my-sm"
                style="margin-left: auto; margin-right: auto"
                color="secondary"
                icon="save"
                @click="agregarConsulta()"
                type="submit"
              >
                Registrar Consulta
                <q-tooltip
                  content-class="bg-accent text-white"
                  content-style="font-size: 12px"
                  anchor="top left"
                  self="bottom left"
                  :offset="[0, 8]"
                  >Registrar una nueva consulta</q-tooltip
                ></q-btn>
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

import { db } from "../../boot/firebase";
export default {
  components: {
    perfil,
    navegacionConsulta,
    Examenes,    
    Menu,
    NavegacionConsulta
  },
  data() {
    return {
      error: false,
      drawerRight: false,
      scrollInfo: {},
      spyMovil: false,
      paciente: {},  
      pesos: [],
      estaturas: [],
      form_data: {
        id: "",
        idPaciente: this.$router.currentRoute.params.id,
        peso: 0,
        estatura: 0,
        temperatura: 0,
        imc: 0,
        presionArterial: "",
        exploracionFisica: "",
        motivoConsulta: "",
        sintomas: "",
        diagnostico: "",
        receta: "",
        examenes: "",
        diagnostico: "",
        fecha: "",
        proximaCita: ""
      },
      toolbar: [
        ["bold", "italic", "strike", "underline"],
        ["unordered", "ordered", "outdent", "indent"]
      ]
    };
  },
  created() {
    var usuarioUpdate = db.collection("pacientes").doc(this.$router.currentRoute.params.id).get().then(
            doc => {
              if (doc.exists){
                  let datos = doc.data();
                  this.paciente = {
                      id: doc.id,
                      ...datos
                  };
              }
              this.pesos = this.paciente.peso;
              this.estaturas = this.paciente.estatura;
              console.log(this.paciente);
            }
          );
          
  },

  methods: {
    limpiarFormulario() {
      (this.form_data.peso = 0),
        (this.form_data.estatura = 0),
        (this.form_data.temperatura = 0),
        (this.form_data.presionArterial = 0),
        (this.form_data.imc = 0),
        (this.form_data.motivoConsulta = ""),
        (this.form_data.sintomas = ""),
        (this.form_data.exploracionFisica = ""),
        (this.form_data.examenes = ""),
        (this.form_data.receta = ""),
        (this.form_data.proximaCita = ""),
        (this.form_data.diagnostico = "");
    },
    cancelar() {
      this.showNotif("Consulta cancelada.", "negative", "close");
    },
    validar() {
      this.$refs.proximaCita.validate();
      this.$refs.motivo.validate();
      if (
        this.$refs.proximaCita.hasError ||
        this.form_data.peso < 0 ||
        this.form_data.estatura < 0 ||
        this.$refs.motivo.hasError
      ) {
        this.error = true;
      } else {
        this.error = false;
      }
    },
    async agregarConsulta() {
      console.info(this.form_data);
      this.validar();
      if (this.error === true) {
        this.showNotif(
          "Necesita rellenar los campos requeridos (Motivo Consulta).",
          "negative",
          "close"
        );
      } else {
        try {
          console.log("HOla");
          this.$q.loading.show();
          

          this.pesos.push(this.form_data.peso);
          this.estaturas.push(this.form_data.estatura);
          var d = new Date();
          var c = new Date(d.toString());
          console.log(c);
          this.form_data.fecha = d;
          // this.form_data.fecha = today.getFullYear()+'-'
          // +(today.getMonth()+1)+'-'
          // +today.getDate()+' '
          // +today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
          console.log("esta es la fecha" + this.form_data.fecha);

          const query = await db.collection("consultas").add(this.form_data);          

          this.actualizarPesos();
          
          this.limpiarFormulario();
          console.log(this.$router.currentRoute.path);
          this.showNotif("Se ha guardado la consulta", "positive", "check");
          this.$router.push("/paciente/" + this.$router.currentRoute.params.id);
        } catch (error) {
          console.log(error);
        } finally {
          this.$q.loading.hide();
        }
      }
    },
    actualizarPesos(){
          
          console.log("Estos son los pesos "+this.paciente);
          
          return db.collection("pacientes").doc(this.$router.currentRoute.params.id).update({
                peso: this.pesos,
                estatura: this.estaturas
          }).then(function(){
              console.log("peso actualizado");
          }).catch(function(error) {
              console.log("no se pudo actualizar peso", error);
          }); 
           
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
      }
    },
    test() {
      this.spyMovil = true;

      this.drawerRight = !this.drawerRight;
    }
  },
  watch: {
    drawerRight: function(val) {
      if (this.drawerRight == false && this.spyMovil) {
        this.spyMovil = false;
      }
    }
  }
};
</script>

<style scoped></style>
