<template>
  <div class="q-pa-md">
    <div class="text-bold text-primary titles" align="center">
      Configura tus plantillas
    </div>
    <q-card class="my-card cards">
      <q-card-section>
        <div class="q-pa-md">
          <div class="text-bold text-secondary" style="font-size:x-large" align="center">
            Encabezado de documentos
          </div>
          <Imagen
            id="examenes"
            :numFoto="'fotoEncabezado'"
            :fotografia="fotoEncabezado"
          />
        </div>
      </q-card-section>
    </q-card>
    <q-card class="my-card cards">
      <q-card-section>
        <div class="q-pa-md">
          <div class="text-bold text-secondary" style="font-size:x-large" align="center">
            Pie de pagina de documentos
          </div>
          <Imagen
            id="examenes"
            :numFoto="'fotoPieDePagina'"
            :fotografia="fotoPieDePagina"
          />
        </div>
      </q-card-section>
    </q-card>
    <q-card class="my-card cards">
      <q-card-section>
        <div class="q-pa-md">
          <div class="text-bold text-secondary" style="font-size:x-large" align="center">
            Firma para documentos
          </div>
          <Imagen
            id="examenes"
            :numFoto="'fotoFirmaDigital'"
            :fotografia="fotoFirmaDigital"
          />
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import Imagen from "components/Configuraciones/galeria.vue";

import { db } from "../../boot/firebase";
export default {
  components: {
    Imagen,
  },
  props: {
    //traer_pacientes: Function,
    id_doctor: String,
  },
  data() {
    return {
      fotoEncabezado: null,
      fotoFirmaDigital: null,
      fotoPieDePagina: null,
    };
  },
  async created() {
    //console.log(this);

    let that = this;
    await db
      .collection("medicos")
      .doc(localStorage.getItem("id_doctor"))
      .get()
      .then((doc) => {
        if (doc.exists) {
          let docs = doc.data();
          that.fotoEncabezado = docs.fotoEncabezado;
          that.fotoFirmaDigital = docs.fotoFirmaDigital;
          that.fotoPieDePagina = docs.fotoPieDePagina;
        } else {
          //console.log("No existe Doc");
        }
      })
      .catch((error) => {
        //console.log("Error al tratar de obtener el documento", error);
      });
  },
  methods: {},
};
</script>
