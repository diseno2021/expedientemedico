<template>
  <div class="q-pa-md">

    <q-btn
      @click="triggerPositive"
      color="primary"
      size="md"
      icon="add_circle"
      label="Agregar"
      class=" q-my-sm q-mx-xl"
      style="width:60%"
    >
      <q-tooltip
        v-model="showing"
        content-class="bg-green"
        content-style="font-size: 16px"
      >
        <bold>Agregar nueva imagen</bold>
      </q-tooltip>
    </q-btn>
    <q-carousel
      swipeable
      animated
      v-model="slide"
      infinite
      :autoplay="autoplay"
      @mouseenter="autoplay = false"
      @mouseleave="autoplay = true"
      :fullscreen.sync="fullscreen"
      control-color="red"
      arrows
      max-width="70px"
      height="250px"
    >
      <q-carousel-slide
        v-for="(item, index) in imagenes"
        :key="index"
        :name="index + 1"
        :img-src="item"
      >
      </q-carousel-slide>

      <template v-slot:control>
        <q-carousel-control position="bottom-right" :offset="[18, 18]">
          <q-btn
            push
            round
            dense
            size="md"
            color="primary"
            text-color="white"
            :icon="fullscreen ? 'fullscreen_exit' : 'fullscreen'"
            @click="fullscreenmethod"
            @keypress.esc="fullscreen = false"
          >
            <q-tooltip
              v-model="showing2"
              content-class="bg-secondary"
              content-style="font-size: 16px"
            >
              <bold>{{ fullscreen ? "Minimizar" : "Maximizar" }}</bold>
            </q-tooltip>
          </q-btn>
        </q-carousel-control>
      </template>
    </q-carousel>
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
      confirm: false,
      confirm2: false,
      archivo: null,
      imagenes: [],
      nameImg: [],
      nameSelect: ""
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
        const imgRef = ref.child(carpeta + "/" + this.archivo.name);
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
    }
  },
  created() {
    this.traerImg();
  }
};
</script>

<style></style>
