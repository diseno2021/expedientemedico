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
        <q-header reveal elevated>
        <q-toolbar>
          <q-toolbar-title style="position: center;">Agregar nuevo paciente</q-toolbar-title>
          <q-btn
            icon="close"
            class="float-right"
            flat
            round
            dense
            v-close-popup
            style="font-size: 1.5em"
          >
            <q-tooltip>Cerrar el modal</q-tooltip>
          </q-btn>
        </q-toolbar>
        </q-header>
        <br>
        <br>
        <div class="row">
          <br>
          <div style="text-align: center" class="col-md-3 col-xs-12">
            <q-img
              v-if="filesImages"
              v-model="filesImages"
              v-bind:src="filesImages"
              contain
              spinner-color="white"
              style="height: 170px; max-width: 300px"
              class="q-my-md rounded-borders q-mx-md q-mx-xs"
            >
              <!-- <q-btn class="float-right" flat @click="filesImages=null">x</q-btn> -->
            </q-img>
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
                content-class="bg-grey-8"
                anchor="top left"
                self="bottom left"
                :offset="[0, 8]"
                >Nombres y apellidos del paciente:</q-tooltip
              >
            </q-input>
            <br />

            <div class="row">
              <div class="col-5">
                <q-label class="q-mx-md">Sexo:</q-label><br />
                <q-radio
                  class="q-mx-md"
                  v-model="paciente.sexo"
                  label="Masculino"
                  val="masculino"
                >
                </q-radio>
                <br />
                <q-radio
                  class="q-mx-md"
                  v-model="paciente.sexo"
                  label="Femenino"
                  val="femenino"
                >
                </q-radio>
                <q-tooltip
                  content-class="bg-grey-8"
                  anchor="top left"
                  self="bottom left"
                  :offset="[0, 8]"
                  >Seleccionar sexo del paciente</q-tooltip
                >
              </div>
              <div class="col-5">
                <q-label class="q-mx-md">Fecha de nacimiento:</q-label><br />
                <q-input
                  class="q-mx-md"
                  v-model="paciente.fecha_nacimiento"
                  type="date"
                >
                  <q-tooltip
                    content-class="bg-grey-8"
                    anchor="top left"
                    self="bottom left"
                    :offset="[0, 8]"
                    >Agregar fecha de nacimiento</q-tooltip
                  ></q-input
                >
              </div>
            </div>
            <div class="row">
              <div class="col-5">
                <q-input
                  class="q-mx-md"
                  v-model="paciente.telefono"
                  label="Numero telefonico"
                  mask="####-####"
                >
                  <template v-slot:before>
                    <q-icon name="phone" />
                  </template>
                  <q-tooltip
                    content-class="bg-grey-8"
                    anchor="top left"
                    self="bottom left"
                    :offset="[0, 8]"
                    >Numero de contacto personal:</q-tooltip
                  >
                </q-input>
              </div>
              <div class="col-5">
                <q-input
                  class="q-mx-md"
                  v-model="paciente.whatsapp"
                  label="Numero whatsapp"
                  mask="####-####"
                >
                  <template v-slot:before>
                    <q-icon name="phone" />
                  </template>
                  <q-tooltip
                    content-class="bg-grey-8"
                    anchor="top left"
                    self="bottom left"
                    :offset="[0, 8]"
                    >Numero de contacto de whatsapp:</q-tooltip
                  >
                </q-input>
              </div>
            </div>
            <br />
            <div class="row">
              <div class="col-5">
                <q-input
                  label="ejemplo@gmail.com"
                  class="q-mx-md"
                  v-model="paciente.email"
                  type="email"
                  prefix="Correo electrónico:"
                >
                  <template v-slot:before>
                    <q-icon name="mail" />
                  </template>
                  <q-tooltip
                    content-class="bg-grey-8"
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
                    content-class="bg-grey-8"
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
                content-class="bg-grey-8"
                anchor="top left"
                self="bottom left"
                :offset="[0, 8]"
                >Direccion de actual residencia</q-tooltip
              >
              <template v-slot:before>
                <q-icon name="assistant_direction" />
              </template>
            </q-input>
            <q-input
              class="q-mx-md"
              v-model="paciente.caso_emergencia"
              label="Caso de emergencia:"
            >
              <q-tooltip
                content-class="bg-grey-8"
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
                content-class="bg-grey-8"
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
            <q-btn class="q-mx-md" color="primary" @click="formulario = false"
              >Registrar
              <q-tooltip
                content-class="bg-grey-8"
                anchor="top left"
                self="bottom left"
                :offset="[0, 8]"
                >Registrar un nuevo paciente</q-tooltip
              >
            </q-btn>

            <q-btn class="q-mx-md" color="negative" @click="formulario = false"
              >Cancelar
              <q-tooltip
                content-class="bg-grey-8"
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
      filesImages:
        "https://images.vexels.com/media/users/3/153835/isolated/preview/172ddc045ae1707a415adeae0543a5f0-icono-de-trazo-de-color-del-paciente-by-vexels.png",
      filesMaxSize: null,
      filesMaxTotalSize: null,
      filesMaxNumber: null,
      paciente: {
        nombre: "",
        apellido: "",
        sexo: "",
        fecha_nacimiento: "",
        telefono: "",
        whatsapp: "",
        direccion: "",
        email: "",
        dui: "",
        caso_emergencia: "",
        observaciones: "",
      },

      /*  opciones: [
        "Esposa/o",
        "Hermano/a",
        "Tia/o",
        "Hija/o",
        "Padre",
        "Madre",
        "Primo/a",
      ], */
      formulario: false,
    };
  },
};
</script>
