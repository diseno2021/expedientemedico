<template>
  <div class="row justify-center">
    <div class="col-12">
      <div class="q-pa-md">
        <div class="q-gutter-md" style="max-width: 300px">
          <q-file
            filled
            bottom-slots
            v-model="model"
            label="Agregar imágenes"
            counter
            max-files="20"
            bg-color="primary"
            label-color="white"
            accept=".jpg, image/*"
            multiple
          >
            <template v-slot:before>
              <q-icon name="collections" />
            </template>

            <template v-slot:hint> Imágenes agregadas </template>
            <template v-slot:append>
              <q-btn
                color="grey-4"
                dense
                flat
                icon="upload"
                @click="updateImg"
              />
              <q-tooltip
                anchor="center right"
                self="center left"
                :offset="[50, 10]"
                v-model="showing"
                content-class="bg-green"
                content-style="font-size: 16px"
              >
                <bold>Agregar nueva imagen</bold>
              </q-tooltip>
            </template>
          </q-file>
        </div>
      </div>
    </div>
    <div class="col-12 q-pa-md">
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
              <bold>{{ fullscreen ? "Minimizar" : "Maximizar" }}</bold>
            </q-tooltip>
          </q-btn>
        </q-carousel-control>
      </template>
      </q-carousel>
    </div>
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
      model:null,
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

<style>
.my-card {
  width: 100%;
  max-width: 250px;
}
</style>
