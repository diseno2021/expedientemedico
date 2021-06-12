<template>
  <!-- arrows
      transition-prev="slide-right"
      transition-next="slide-left" -->

  <div class="q-pa-md">
    <h4>Exámenes del paciente</h4>
    <q-carousel
      swipeable
      animated
      v-model="slide"
      thumbnails
      infinite
      :autoplay="autoplay"
      @mouseenter="autoplay = false"
      @mouseleave="autoplay = true"
      :fullscreen.sync="fullscreen"
      navigation-position="bottom"
      control-color="red"
      arrows
    >
      <q-carousel-slide
        v-for="(item, index) in imagenes"
        :key="index"
        :name="index + 1"
        :img-src="item"
      >
        <q-btn
          round
          color="red"
          size="md"
          icon="delete_forever"
          class="q-mx-sm"
          @click="confirmEli(item)"
        >
          <q-tooltip
            v-model="showing3"
            content-class="bg-negative"
            content-style="font-size: 16px"
          >
            <b>Eliminar imagen</b>
          </q-tooltip>
        </q-btn>
      </q-carousel-slide>

      <template v-slot:control>
        <q-carousel-control position="top-right" :offset="[18, 18]">
          <q-btn
            @click="triggerPositive"
            v-show="fullscreen ? false : true"
            round
            color="black"
            size="md"
            icon="add_circle"
            class="q-mx-sm"
          >
            <q-tooltip
              v-model="showing"
              content-class="bg-green"
              content-style="font-size: 16px"
            >
              <b>Agregar nueva imagen</b>
            </q-tooltip>
          </q-btn>

          <q-btn
            push
            round
            dense
            color="black"
            text-color="primary"
            :icon="fullscreen ? 'fullscreen_exit' : 'fullscreen'"
            @click="fullscreenmethod"
            @keypress.esc="fullscreen = false"
          >
            <q-tooltip
              v-model="showing2"
              content-class="bg-secondary"
              content-style="font-size: 16px"
            >
              <b>{{ fullscreen ? "Minimizar" : "Maximizar" }}</b>
            </q-tooltip>
          </q-btn>
        </q-carousel-control>
      </template>
    </q-carousel>
    <q-dialog v-model="confirm" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="warning" color="negative" text-color="white" />
          <span class="q-ml-sm">¿Está seguro si desea eliminar la imagen?</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="grey-7" v-close-popup />
          <q-btn flat label="Confirmar" color="red" @click="eliminarImg" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="confirm2" persistent>
      <q-card class="my-card">
        <q-card-section class="row items-center">
          <q-avatar icon="upload" color="green" text-color="white" />
          <span class="q-ml-sm">Subir Imagen</span>
          <q-file
            filled
            bottom-slots
            v-model="archivo"
            label="Agregar imágenes"
            counter
            max-files="20"
            bg-color="grey"
            label-color="white"
            accept=".jpg, image/*"
          >
            <template v-slot:before>
              <q-icon name="collections" />
            </template>
          </q-file>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="grey-7" @click="cancel" />
          <q-btn flat label="Confirmar" color="green" @click="updateImg" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { st } from "../boot/firebase";

export default {
  props: {
    idPaciente: String
  },
  data() {
    return {
      slide: 1,
      autoplay: true,
      fullscreen: false,
      showing: false,
      showing2: false,
      showing3: false,
      confirm: false,
      confirm2: false,
      archivo: null,
      imagenes: [],
      nameImg: [],
      nameSelect: "",
      imagenBorrar: ""
    };
  },
  methods: {
    fullscreenmethod() {
      this.fullscreen = !this.fullscreen;
    },
    triggerPositive() {
      this.confirm2 = true;
    },
    updateImg() {
      if (this.archivo) {
        const ref = st.ref();
        const carpeta = this.idPaciente;
        var nombre = this.archivo.name;
        var newnombre = nombre.replace(/ /g, "");
        const imgRef = ref.child(carpeta + "/" + newnombre);
        let this2 = this;        
        imgRef
          .put(this.archivo)
          .then(function(snapshot) {
            this2.archivo = null;
            this2.$q.notify({
              type: "positive",
              message: `Imagen agregada con exito!`
            });
            this2.traerImg();
            this2.confirm2 = false;
          })
          .catch(function(error) {});
      }
    },
    cancel() {
      this.archivo = null;
      this.confirm2 = false;
    },
    traerImg() {
      this.imagenes = [];
      const ref = st.ref();
      const carpeta = this.idPaciente;
      let this2 = this;

      ref
        .child(carpeta + "/")
        .listAll()
        .then(function(result) {
          result.items.forEach(function(imgRefe) {
            let nombre = imgRefe.name;
            if (nombre == "perfil.jpg") {
            } else {
              this2.nameImg.push(nombre);
              this2.nameSelect = "";
              imgRefe.getDownloadURL().then(function(url) {
                this2.imagenes.push(url);
              });
            }
          });
        });
    },
    eliminarImg() {
      let url = this.imagenBorrar;
      let this2 = this;
      const carpeta = this.idPaciente;
      const refer = st.ref();
      let urll = url;

      this.nameImg.forEach(function(element) {
        if (urll.includes(element)) {
          this2.nameSelect = element;         
        }
      });

      if (this.nameSelect != "") {
        let newRef = refer.child(carpeta + "/" + this.nameSelect);

        newRef.delete().then(() => {
          this.traerImg();
          this.confirm = false;         
          this2.$q.notify({
            type: "negative",
            message: `Imagen eliminada con exito!`
          });
        });
      }
    },
    confirmEli(url) {
      this.confirm = true;
      this.imagenBorrar = url;
    }
  },
  created() {
    this.traerImg();
  }
};
</script>

<style></style>
