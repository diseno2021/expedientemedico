<template>
  <div>
    <q-item @click="formulario = true" clickable v-ripple>
      <q-item-section avatar>
        <q-icon name="person_add" />
      </q-item-section>
      <q-item-section @click="formulario = true">
        Nuevo Paciente
      </q-item-section>
    </q-item>

    <q-dialog v-model="formulario" :maximized="true">
      <q-card>
        <q-toolbar style="text-align: center" class="bg-primary text-white">
          <q-toolbar-title>Nuevo Paciente</q-toolbar-title>
          <q-btn
            icon="close"
            class="float-right"
            flat
            round
            dense
            @click="cancelar()"
            style="font-size: 1.5em"
          >
            <q-tooltip
              content-class="bg-accent text-white"
              content-style="font-size: 12px"
              anchor="top left"
              self="bottom left"
              :offset="[0, 8]"
              >Cancelar registro</q-tooltip
            >
          </q-btn>
        </q-toolbar>

        <div class="row">
          <br />
          <div style="text-align: center" class="col-md-3 col-xs-12">
            <q-img
              v-if="mostrar_imagen && imagen"
              v-model="foto"
              v-bind:src="foto"
              contain
              spinner-color="white"
              style="height: 170px; max-width: 300px"
              class="q-my-md rounded-borders q-mx-md q-mx-xs"
            >
             
             <q-btn dense v-close-popup round icon="close" class="float-right" flat @click="mostrar_imagen=false">
              <q-tooltip
                  content-class="bg-accent text-white"
                  content-style="font-size: 12px"
                  anchor="top left"
                  self="bottom left"
                  :offset="[0, 8]"
                  >Borrar imagen</q-tooltip
                >
            </q-btn> 
            </q-img>
            <br />
            <div class="row" style="text-align: center">
              <q-file
              @change="mostrar_imagen=false"
                filled
                counter
                class="q-mx-md col-md-11"
                label="Seleccione la imagen"
                v-model="imagen"
                clearable
                accept=".jpg, image/*"
              >
                <template v-slot:before>
                  <q-icon name="attach_file" />
                </template>
                <template v-slot:after>
                  <q-btn
                  push
                  @click="mostrar_imagen=false; mostrar_imagen=true"
                    :disable="!imagen"
                    color="secondary"
                    text-color="white"
                    round
                    icon="cloud_upload"
                  ></q-btn>
                  <q-tooltip
                  content-class="bg-accent text-white"
                  content-style="font-size: 12px"
                  anchor="top left"
                  self="bottom left"
                  :offset="[0, 8]"
                  >Cargar imagen</q-tooltip
                >
                </template>
                <q-tooltip
                  content-class="bg-accent text-white"
                  content-style="font-size: 12px"
                  anchor="top left"
                  self="bottom left"
                  :offset="[0, 8]"
                  >Seleccione una imagen para el paciente</q-tooltip
                >
              </q-file>
            </div>
          </div>

          <div class="col-md-8 col-xs-11 justify-around">
            
            <br />
            <q-input
              class="q-mx-md"
              v-model="paciente.nombre"
              label="Nombres y apellidos"
            >
              <template v-slot:before>
                <q-icon name="person" />
              </template>
              <q-tooltip
                content-class="bg-accent text-white"
                content-style="font-size: 12px"
                anchor="top left"
                self="bottom left"
                :offset="[0, 8]"
                >Nombres y apellidos del paciente</q-tooltip
              >
            </q-input>
            <br />

            <div class="row">
              <div class="col-md-5 col-xs-6">
                <q-label class="q-mx-md q-my-md">Sexo:</q-label><br />
                <q-radio
                  class="q-mx-md"
                  v-model="paciente.genero"
                  label="Masculino"
                  val="masculino"
                >
                </q-radio>
                <br />
                <q-radio
                  class="q-mx-md "
                  v-model="paciente.genero"
                  label="Femenino"
                  val="femenino"
                >
                </q-radio>
                <q-tooltip
                  content-class="bg-accent text-white"
                  content-style="font-size: 12px"
                  anchor="top left"
                  self="bottom left"
                  :offset="[0, 8]"
                  >Seleccionar sexo del paciente</q-tooltip
                >
              </div>
              <div class="col-md-5 col-xs-6">
                <q-label class="q-mx-md q-my-md">Fecha de nacimiento:</q-label><br />
                <q-input
                  class="q-mx-md"
                  v-model="paciente.fechaNacimiento"
                  type="date"
                >
                  <q-tooltip
                    content-class="bg-accent text-white"
                    content-style="font-size: 12px"
                    anchor="top left"
                    self="bottom left"
                    :offset="[0, 8]"
                    >Agregar fecha de nacimiento del paciente</q-tooltip
                  ></q-input
                >
              </div>
            </div>
            <div class="row">
              <div class="col-md-5 col-xs-6">
                <q-input
                  class="q-mx-md q-my-md"
                  v-model="paciente.telefono"
                  label="Número telefónico"
                  mask="####-####"
                >
                  <template v-slot:before>
                    <q-icon name="phone" />
                  </template>
                  <q-tooltip
                    content-class="bg-accent text-white"
                    content-style="font-size: 12px"
                    anchor="top left"
                    self="bottom left"
                    :offset="[0, 8]"
                    >Número de contacto personal</q-tooltip
                  >
                </q-input>
              </div>
              <div class="col-md-5 col-xs-6">
                <q-input
                  class="q-mx-md q-my-md"
                  v-model="paciente.whatsapp"
                  label="Número whatsapp"
                  mask="####-####"
                >
                  <template v-slot:before>
                    <q-icon name="phone" />
                  </template>
                  <q-tooltip
                    content-class="bg-accent text-white"
                    content-style="font-size: 12px"
                    anchor="top left"
                    self="bottom left"
                    :offset="[0, 8]"
                    >Número de contacto de whatsapp</q-tooltip
                  >
                </q-input>
              </div>
            </div>
            <br />
            <div class="row">
              <div class="col-md-5 col-xs-7">
                <q-input
                  label="Correo electronico"
                  class="q-mx-md"
                  v-model="paciente.email"
                  type="email"
                  placeholder="ejemplo@gmail.com"
                >
                  <template v-slot:before>
                    <q-icon name="mail" />
                  </template>
                  <q-tooltip
                    content-class="bg-accent text-white"
                    content-style="font-size: 12px"
                    anchor="top left"
                    self="bottom left"
                    :offset="[0, 8]"
                  >
                    Direccción de correo electrónico</q-tooltip
                  >
                </q-input>
              </div>
              <div class="col-5">
                <q-input
                  class="q-mx-md"
                  v-model="paciente.dui"
                  label="DUI"
                  mask="########-#"
                >
                  <q-tooltip
                    content-class="bg-accent text-white"
                    content-style="font-size: 12px"
                    anchor="top left"
                    self="bottom left"
                    :offset="[0, 8]"
                    >Dui(Documento de identidad personal)</q-tooltip
                  >
                  <template v-slot:before>
                    <q-icon name="people" />
                  </template>
                </q-input>
              </div>
            </div>

            <br />

            <q-input
              class="q-mx-md"
              v-model="paciente.direccion"
              label="Dirección de residencia"
            >
              <q-tooltip
                content-class="bg-accent text-white"
                content-style="font-size: 12px"
                anchor="top left"
                self="bottom left"
                :offset="[0, 8]"
                >Dirección de actual residencia del paciente</q-tooltip
              >
              <template v-slot:before>
                <q-icon name="assistant_direction" />
              </template>
            </q-input>
            <q-input
              class="q-mx-md"
              v-model="paciente.enCasoEmergencia"
              label="En caso de emergencia"
              placeholder="Jose Hernandez  7744-7192"
            >
              <q-tooltip
                content-class="bg-accent text-white"
                content-style="font-size: 12px"
                anchor="top left"
                self="bottom left"
                :offset="[0, 8]"
                >A quien llamar en caso de emergencia:</q-tooltip
              >
              <template v-slot:before>
                <q-icon name="report_problem" />
              </template>
            </q-input>
            <q-input
              class="q-mx-md"
              v-model="paciente.comentario"
              label="Observaciones"
              type="textarea"
            >
              <q-tooltip
                content-class="bg-accent text-white"
                content-style="font-size: 12px"
                anchor="top left"
                self="bottom left"
                :offset="[0, 8]"
                >Observaciones del paciente</q-tooltip
              >
              <template v-slot:before>
                <q-icon name="description" />
              </template>
            </q-input>
            <br />
            <q-btn class="q-mx-md" color="primary" @click="limpiar()"
              >Registrar
              <q-tooltip
                content-class="bg-accent text-white"
                content-style="font-size: 12px"
                anchor="top left"
                self="bottom left"
                :offset="[0, 8]"
                >Registrar un nuevo paciente</q-tooltip
              >
            </q-btn>

            <q-btn class="q-mx-md" color="negative" @click="cancelar()"
              >Cancelar
              <q-tooltip
                content-class="bg-accent text-white"
                content-style="font-size: 12px"
                anchor="top left"
                self="bottom left"
                :offset="[0, 8]"
                >Cancelar y volver</q-tooltip
              ></q-btn
            >
             <br />
            <br />
            <br />
          </div>
        </div>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { db } from "../boot/firebase";

export default {
  name: "agregar_paciente",
  data() {
    return {
      mostrar_imagen:false,
      imagen: null,
      foto:
        "https://isanidad.com/wp-content/uploads/2017/03/dolencias-cancerigenas_paliativos.jpg",

      paciente: {
        idMedico:"Lnw22pwDcUQtWuTdSqcLmuwrrS12",
        nombre: "",
        genero: "",
        fechaNacimiento: "",
        telefono: "",
        whatsapp: "",
        direccion: "",
        email: "",
        dui: "",
        enCasoEmergencia: "",
        comentario: "",
        //datos complementarios del documento
        alergias:"",
        antecedentes:"",
        archivos:[],
        enfermedadesCronicas:"",
        estatura:[],
        foto:"",
        medicamentosPermanentes:"",
        peso:[],
        tipoSangre:""

      },
      formulario: false
    };
  },
  methods: {
    limpiar(){
      this.paciente.nombre='',
      this.formulario=false;
      this.paciente.fechaNacimiento='';
      this.paciente.genero='';
      this.paciente.telefono='';
      this.paciente.whatsapp='';
      this.paciente.direccion='';
      this.paciente.email='';
      this.paciente.dui='';
      this.paciente.enCasoEmergencia='';
      this.paciente.comentario='';
      this.imagen=null;
      this.mostrar_imagen=false;
      this.showNotif("Nuevo paciente guardado.", "accent", "cloud_done");
    },
    showNotif (mensaje, color, icono) {
      this.$q.notify({
        message: mensaje,
        color: color,
        timeout: 1000,
      icon: icono
      })
    },
    cancelar(){
      this.formulario=false;
      this.showNotif("Registro de nuevo paciente cancelado.", "negative","close")
    },
    async agregarPaciente(){
     try {
         this.$q.loading.show();
     
       const query =await db.collection('pacientes').add(this.paciente);
       this.limpiar();
      } catch (error) {
        console.log(error);
      } finally {
        this.$q.loading.hide();

      }

    }
  }
 

};
</script>
