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
            v-close-popup
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
                  />
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
                  v-model="paciente.sexo"
                  label="Masculino"
                  val="masculino"
                >
                </q-radio>
                <br />
                <q-radio
                  class="q-mx-md "
                  v-model="paciente.sexo"
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
                  v-model="paciente.fecha_nacimiento"
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
                  label="Numero telefonico"
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
                    >Numero de contacto personal</q-tooltip
                  >
                </q-input>
              </div>
              <div class="col-md-5 col-xs-6">
                <q-input
                  class="q-mx-md q-my-md"
                  v-model="paciente.whatsapp"
                  label="Numero whatsapp"
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
                    >Numero de contacto de whatsapp</q-tooltip
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
                    Direcccion de correo electrónico</q-tooltip
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
              label="Direccion de residencia"
            >
              <q-tooltip
                content-class="bg-accent text-white"
                content-style="font-size: 12px"
                anchor="top left"
                self="bottom left"
                :offset="[0, 8]"
                >Direccion de actual residencia del paciente</q-tooltip
              >
              <template v-slot:before>
                <q-icon name="assistant_direction" />
              </template>
            </q-input>
            <q-input
              class="q-mx-md"
              v-model="paciente.caso_emergencia"
              label="Persona encargada"
            >
              <q-tooltip
                content-class="bg-accent text-white"
                content-style="font-size: 12px"
                anchor="top left"
                self="bottom left"
                :offset="[0, 8]"
                >En caso de emergecia llamar a:</q-tooltip
              >
              <template v-slot:before>
                <q-icon name="report_problem" />
              </template>
            </q-input>
            <q-input
              class="q-mx-md"
              v-model="paciente.observaciones"
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
            <q-btn class="q-mx-md" color="primary" @click="limpiar"
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

            <q-btn class="q-mx-md" color="negative" @click="formulario = false"
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
export default {
  name: "agregar_paciente",
  data() {
    return {
      mostrar_imagen:false,
      imagen: null,
      foto:
        "https://isanidad.com/wp-content/uploads/2017/03/dolencias-cancerigenas_paliativos.jpg",

      paciente: {
        nombre: "",
        sexo: "",
        fecha_nacimiento: "",
        telefono: "",
        whatsapp: "",
        direccion: "",
        email: "",
        dui: "",
        caso_emergencia: "",
        observaciones: ""
      },
      formulario: false
    };
  },
  methods: {
    limpiar(){
      this.paciente.nombre='',
      this.formulario=false;
      this.paciente.fecha_nacimiento='';
      this.paciente.sexo='';
      this.paciente.telefono='';
      this.paciente.whatsapp='';
      this.paciente.direccion='';
      this.paciente.email='';
      this.paciente.dui='';
      this.paciente.caso_emergencia='';
      this.paciente.observaciones='';
      this.imagen=null;
      this.mostrar_imagen=false;
      this.showNotif();
    },
    showNotif () {
      this.$q.notify({
        message: 'Nuevo paciente guardado.',
        color: 'accent',
        timeout: 1000
      })
    }
  }
 

};
</script>
