<template>
  <div>
    <form>
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
                v-if="foto"
                v-bind:src="foto"
                contain
                spinner-color="white"
                :ratio="2"
                class="q-my-md rounded-borders q-mx-md q-mx-xs"
              >
                <q-tooltip
                  content-class="bg-accent text-white"
                  content-style="font-size: 12px"
                  anchor="top left"
                  self="bottom left"
                  :offset="[0, 8]"
                  >Si desea cambiar la imagen seleccione una nueva y de click en
                  el boton para subirla.</q-tooltip
                >
                <q-btn
                  dense
                  v-close-popup
                  round
                  icon="close"
                  class="float-right"
                  flat
                  @click="foto = ''"
                >
                  <q-tooltip
                    content-class="bg-accent text-white"
                    content-style="font-size: 12px"
                    anchor="bottom left"
                    self="top left"
                    :offset="[0, 8]"
                    >Borrar imagen</q-tooltip
                  >
                </q-btn>
              </q-img>
              <br />
              <div class="row" style="text-align: center">
                <q-file
                  filled
                  counter
                  class="q-mx-md col-md-11"
                  label="Seleccione la imagen"
                  v-model="imagen"
                  accept=".jpg, image/*"
                >
                  <template v-slot:before>
                    <q-icon name="attach_file" />
                  </template>
                  <template v-slot:after>
                    <q-btn
                      push
                      @click="cambiar_imagen()"
                      :disable="imagen == null"
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
                ref="nombre"
                class="q-mx-md"
                v-model="paciente.nombre"
                label="Nombres y apellidos"
                @keypress="soloLetras($event)"
                lazy-rules
                :rules="[
                  val =>
                    (val && val.length > 3) ||
                    'Requerido, por favor complete el campo'
                ]"
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
                  <span class="label q-mx-md q-my-md">Sexo:</span>
                  <br />
                  <q-radio
                    ref="sexo"
                    class="q-mx-md"
                    v-model="paciente.genero"
                    label="Masculino"
                    val="Masculino"
                  />
                  <br />
                  <q-radio
                    ref="sexo"
                    class="q-mx-md"
                    v-model="paciente.genero"
                    label="Femenino"
                    val="Femenino"
                  />
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
                  <span class="label q-mx-md q-my-md"
                    >Fecha de nacimiento:</span
                  >

                  <br />
                  <q-input
                    ref="fechaNacimiento"
                    class="q-mx-md"
                    v-model="paciente.fechaNacimiento"
                    type="date"
                    lazy-rules
                    :rules="[
                      val => !!val || 'Campo requerido',
                      val =>
                        edadPaciente() == false ||
                        'Fecha de nacimiento incorrecta, edad minima 1 año'
                    ]"
                  >
                    <q-tooltip
                      content-class="bg-accent text-white"
                      content-style="font-size: 12px"
                      anchor="top left"
                      self="bottom left"
                      :offset="[0, 8]"
                      >Agregar fecha de nacimiento del paciente</q-tooltip
                    >
               </q-input
                  >
                </div>
              </div>
              <div class="row">
                <div class="col-md-5 col-xs-6">
                  <q-input
                    ref="telefono"
                    class="q-mx-md q-my-md"
                    v-model="paciente.telefono"
                    label="Número telefónico"
                    mask="####-####"
                    :rules="[
                      val => !!val || 'Campo requerido',
                      val => val.length > 8 || 'Numero telefonico invalido'
                    ]"
                    lazy-rules
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
                     <q-icon name="smartphone" />
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
                    ref="email"
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
                    ref="dui"
                    class="q-mx-md"
                    v-model="paciente.dui"
                    label="DUI"
                    mask="########-#"
                    :disable="edad()"
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
                       <q-icon name="credit_card" />
                    </template>
                  </q-input>
                </div>
              </div>

              <br />

              <q-input
                ref="direccion"
                class="q-mx-md"
                v-model="paciente.direccion"
                label="Dirección de residencia"
                lazy-rules
                :rules="[
                  val =>
                    !!val ||
                    'Requerido, por favor digite la direccion de residencia'
                ]"
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
                ref="enCasoEmergencia"
                class="q-mx-md"
                v-model="paciente.enCasoEmergencia"
                label="En caso de emergencia"
                placeholder="Jose Hernandez  7744-7192"
                lazy-rules
                :rules="[
                  val => !!val || 'Requerido, por favor complete el campo'
                ]"
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
              <q-btn
              icon="do_disturb"
                class="q-mx-md"
                color="negative"
                @click="cancelar()"
                type="submit"
                label="Cancelar"
                >
                <q-tooltip
                  content-class="bg-accent text-white"
                  content-style="font-size: 12px"
                  anchor="top left"
                  self="bottom left"
                  :offset="[0, 8]"
                  >Cancelar y volver</q-tooltip
                ></q-btn
              >
              <q-btn icon="person_add_alt_1"
                class="q-mx-md"
                color="primary"
                @click="agregarPaciente()"
                type="submit"
                label="Registrar"
                >
                <q-tooltip
                  content-class="bg-accent text-white"
                  content-style="font-size: 12px"
                  anchor="top left"
                  self="bottom left"
                  :offset="[0, 8]"
                  >Registrar un nuevo paciente</q-tooltip
                >

              </q-btn>

              

              <br />
              <br />
              <br />
            </div>
          </div>
        </q-card>
      </q-dialog>
    </form>
  </div>
</template>

<script>
import { db, st } from "../boot/firebase";
export default {
  name: "agregar_paciente",
  props: {
    //traer_pacientes: Function,
    id_doctor: String
  },
  data() {
    return {
      id_paciente: "",
      carpeta: "imagenes",
      imagen_defecto: "https://s5.postimg.cc/537jajaxj/default.png",
      imagen: null,
      foto: "https://s5.postimg.cc/537jajaxj/default.png",
      paciente: {
        idMedico: this.id_doctor,
        nombre: null,
        genero: "Masculino",
        fechaNacimiento: "",
        telefono: "",
        whatsapp: "",
        direccion: "",
        email: "",
        dui: "",
        enCasoEmergencia: "",
        comentario: "",
        //datos complementarios del documento
        alergias: "",
        antecedentes: "",
        archivos: [],
        enfermedadesCronicas: "",
        estatura: [],
        foto: "",
        medicamentosPermanentes: "",
        peso: [],
        tipoSangre: ""
      },
      error: true,
      formulario: false,
      activar: true
    };
  },
  //limpia los campos del formulario para dejarlo listo para el siguiente paciente igualmente
  //para si desea cancelar el registro del paciente.
  methods: {
    limpiar() {
      this.foto = this.imagen_defecto;
      this.carpeta = "imagenes";
      this.paciente.nombre = "";
      this.formulario = false;
      this.paciente.fechaNacimiento = "";
      this.paciente.genero = "Masculino";
      this.paciente.telefono = "";
      this.paciente.whatsapp = "";
      this.paciente.direccion = "";
      this.paciente.email = "";
      this.paciente.dui = "";
      this.paciente.enCasoEmergencia = "";
      this.paciente.comentario = "";
      this.imagen = null;
      this.mostrar_imagen = false;
    },
    //  Muestra una notificacion con color e icono y un mensaje dependiendo de que accion sera ejecutada.
    showNotif(mensaje, color, icono) {
      this.$q.notify({
        message: mensaje,
        color: color,
        timeout: 1000,
        icon: icono,
        position: "top"
      });
    },
    //permite ejecutar ciertas acciones como cerrar y limpiar el formulario aparte de mostrar
    //una notificacion con informacion de la accion.
    cancelar() {
      this.formulario = false;
      this.limpiar();
      this.showNotif(
        "Registro de nuevo paciente cancelado.",
        "negative",
        "close"
      );
    },
    //Se ejecutan acciones que llevaran a guardar el nuevo paciente en nuestra base de datos.
    async agregarPaciente() {
      this.validaciones();
      if (this.error === true) {
        this.showNotif(
          "Necesita rellenar los campos requeridos.",
          "negative",
          "close"
        );
      } else {
        try {
          this.$q.loading.show();
          const query = await db.collection("pacientes").add(this.paciente);

          this.id_paciente = query.id;
          this.actualizar_paciente();
        } catch (error) {
          console.log(error);
        } finally {
          //this.traer_pacientes();
           this.$q.loading.hide();
          this.showNotif("Nuevo paciente guardado.", "accent", "cloud_done");
        //  location.reload();
        }
      }
    },
    // Varifica que los campos requeridos no esten vacios y
    //en caso de estarlo devuelve la variable como true
    validaciones() {
      this.$refs.nombre.validate();
      this.$refs.fechaNacimiento.validate();
      this.$refs.telefono.validate();
      this.$refs.direccion.validate();
      this.$refs.enCasoEmergencia.validate();
      this.$refs.dui.validate();
      if (
        this.$refs.nombre.hasError ||
        this.$refs.fechaNacimiento.hasError ||
        this.$refs.telefono.hasError ||
        this.$refs.dui.hasError ||
        this.$refs.direccion.hasError ||
        this.$refs.enCasoEmergencia.hasError
      ) {
        this.error = true;
      } else {
        this.error = false;
      }
    },
    // Metodo que valida el campo nombre para permitir solo letras incluida la ñ,
    //palabras con tilde y espacios.
    soloLetras(e) {
      let nombre = String.fromCharCode(e.keyCode);
      if (/^[a-zA-ZÀ-ÿ\u00f1\u00d1 ]+$/.test(nombre)) return true;
      else e.preventDefault();
    },

    // Si la fecha de nacimiento del paciente es mayor a 0 devolvera false
    //caso contrario sera verdadero y no permitira una fecha de nacimiento incorrecta
    edadPaciente() {
      const hoy = new Date();
      const fechaN = new Date(this.paciente.fechaNacimiento);
      const anio = hoy.getFullYear() - fechaN.getFullYear();
      if (anio > 0 && anio <= 100) {
        this.error = false;
      } else {
        this.error == true;
      }
      return this.error;
    },
    //   retorna un booleano, si la edad es mayor o igual a 18 años retornara false
    //  caso contrario retornara true
    edad() {
      const hoy = new Date();
      const fechaN = new Date(this.paciente.fechaNacimiento);
      const anio = hoy.getFullYear() - fechaN.getFullYear();
      if (anio >= 18 && anio <= 100) {
        this.error = false;
      } else {
        this.error = true;
      }
      return this.error;
    },
    //permite darle al usuario una vista de la imagen que ha elegido de perfil.
    async traer_imagen() {
      const refs = st.ref();
      let this2 = this;

      const imgref = refs.child(this.carpeta).child("perfil.jpg");
      await refs
        .child(this.carpeta + "/")
        .listAll()
        .then(function(result) {
          result.items.forEach(function(imgRefe) {
            let nombre = imgRefe.name;
            if (nombre == "perfil.jpg") {
              imgRefe.getDownloadURL().then(function(url) {
                this2.foto = url;
              });
            }
          });
        });
    },
    //Cambia la imagen en la base de datos permitiendonos mostrar la imagen
    cambiar_imagen() {
      try {
        const refs = st.ref();
        let this2 = this;
        const imgref = refs.child(this.carpeta).child("perfil.jpg");
        imgref.put(this.imagen).then(function(snapshot) {
          this2.traer_imagen();
        });
      } catch (error) {
        console.log(error);
      }
    },
    //sube la imagen a la carpeta de el usuario creando la carpeta y asignandola con nombre
    async subir_imagen(tipo) {
      var subir = 1;
      var actualizar = 2;
      if (!this.foto || this.foto === this.imagen_defecto) {
        try {
          const response = await fetch(this.imagen_defecto);
          const blob = await response.blob();
          var metadata = {
            contentType: "image/png"
          };

          const refs = st.ref();
          let this2 = this;
          const imgref = refs.child(this.id_paciente).child("perfil.jpg");

          imgref.put(blob, metadata).then(function(snapshot) {
           // this2.limpiar();
            location.reload();
          });
        } catch (error) {
          console.log(error);
        }
      } else {
        try {
          const refs = st.ref();
          let this2 = this;
          const imgref = refs.child(this.id_paciente).child("perfil.jpg");

          imgref.put(this.imagen).then(function(snapshot) {
         //   this2.limpiar();
            location.reload();
          });
        } catch (error) {
          console.log(error);
        }
      }
    },
    async actualizar_paciente() {
      try {
        const query = db.collection("pacientes").doc(this.id_paciente);
        let this2 = this;
        query
          .update({
            foto: "/" + this.id_paciente + "/perfil.jpg"
          })
          .then(function() {
            this2.subir_imagen();
          });
      } catch (error) {
        console.log(error);
      } finally {
      }
    }
  }
};
</script>
