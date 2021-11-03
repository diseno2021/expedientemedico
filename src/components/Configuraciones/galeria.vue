<template>
  <div class="q-pa-md">
    <div class="q-col-gutter-md row items-start">
      <div class="col-4">
        <q-img
          v-if="foto"
          :src="foto"
          contain
          :ratio="32 / 9"
          class="q-my-md rounded-borders q-mx-md q-mx-xs"
        >
          <q-tooltip
            content-class="bg-accent text-white"
            content-style="font-size: 12px"
            anchor="top left"
            self="bottom left"
            :offset="[0, 8]"
            >Si desea cambiar la imagen seleccione una nueva y de click en el
            boton para subirla.</q-tooltip
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
      </div>
    </div>
    <br />
    <div class="row" style="text-align: center">
      <q-file
        filled
        counter
        class="q-mx-md col-md-11"
        label="Seleccione la imagen"
        v-model="imagen"
        accept=".jpg, image/*"
        type="file"
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
</template>
<script>
import { db } from "../../boot/firebase";
export default {
  props: {
    //traer_pacientes: Function,
    numFoto: String,
    fotografia: String,
  },
  data() {
    return {
      foto: this.fotografia,
      imagen: null,
    };
  },
  methods: {
    cambiar_imagen() {
      //console.log("Upload image");
      let nombreFoto = this.numFoto;
      let foto1 = {};
      foto1[nombreFoto] = this.foto;
      //Este tiene que ser un método para subir a firebase
      //console.log(localStorage.getItem("id_doctor"));
      db.collection("medicos")
        .doc(localStorage.getItem("id_doctor"))
        .update(foto1)
        .then(() => {
          //console.log("done");
        })
        .catch(function (error) {
          //console.error("Error writing document: ", error);
        });
    },
  },
  watch: {
    imagen: {
      handler: function (newValue) {
        //console.log(newValue);
        var reader = new FileReader();
        reader.readAsDataURL(newValue);
        let that = this;
        reader.onload = function () {
          //console.log(reader.result); //base64encoded string
          that.foto = reader.result;
        };
      },
    },
    fotografia: function (newVal) {
      this.foto = newVal;
    },
  },
};
</script>
