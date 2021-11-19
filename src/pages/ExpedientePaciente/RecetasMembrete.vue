<template>
  <div class="contenedor">
      <q-btn color="grey-8" label="Con membrete" 
      class="q-mx-xl" 
      @click="bar1=true"/>
      <!-- con membrete dialog -->
    <q-dialog
      v-model="bar1"
      persistent
      transition-show="flip-down"
      transition-hide="flip-up"
    >
      <q-card class="bg-primary text-white">
        <q-bar>
          <q-icon name="print" class="q-mx-sm" />
          La impresión será con membrete ¿Estás Seguro?

          <q-space />

          <q-btn dense flat icon="close" v-close-popup>
            <q-tooltip content-class="bg-white text-primary">Close</q-tooltip>
          </q-btn>
        </q-bar>

        <q-card-section class="bg-white">
          <q-btn
            unelevated
            color="dark"
            label="Seguir"
            class="q-mx-xl"
            @click="generarPdf"
          />
          <q-btn unelevated color="grey-8" label="Cancelar" class="q-mx-xl" @click="bar1=false" />
        </q-card-section>
      </q-card>
    </q-dialog>

    <div style="width: 1130px; height: 905px;display:none">

        <div id="target" ref="targetHtml" style="width: 1130px; height: 905px" >
          <div class="content">
            <img
              :src="encabezado"
              style="width: 100%; height: 250px; left: 100%; object-fit: contain"
            />
          </div>

          <hr />
                <div class="content" style="padding-left: 30px; height: 405px">
                    <h3><b>Receta</b></h3>
                    <h4> Fecha: {{fecha}} </h4>
                     <p>
                      {{recetas.receta}}
                    </p>
                      <h5 style="text-align: right; float: right; top: 100%;">
                      Proxima cita: {{recetas.proximaCita}}
                    </h5>
                </div>
                      <hr />
                <div class="content" style="bottom: 0px">
                      <img
                        :src="pieDePagina"
                        style="width: 100%; height: 250px; object-fit: contain"
                      />
                  </div>
          </div>
    </div>
   <br />
  </div>
</template>

<script>
import { db } from "../../boot/firebase";
import jsPDF from "jspdf";

export default {
  name: "RecetasMembrete",
   props: {
    id: String
  },
  data() {
    return {
      bar1: false,
      recetas: this.id,
      fecha: "",
      encabezado: "",
      firmaDigital: "",
      pieDePagina: "",
      consultasPagina: [],
      nConsultasPagina: 4,
      indexSelect: null,
    };
  },
   mounted() {
     this.mostrar();
     this.traerImg();
   },
  methods: {
    traerImg() {
    let that = this;
    db
      .collection("medicos")
      .doc(localStorage.getItem("id_doctor"))
      .get()
      .then((doc) => {
        if (doc.exists) {
          let docs = doc.data();
          that.encabezado = docs.fotoEncabezado;
          that.firmaDigital = docs.fotoFirmaDigital;
          that.pieDePagina = docs.fotoPieDePagina;
        }
      })
      .catch((error) => {
        //console.log("Error al tratar de obtener el documento", error);
      });
  },
    mostrar() {
     let query=db.collection("consultas").doc(this.id)
     this.recetas=query.get().then(query=>{
       if(query.exists){
         this.recetas=query.data();
         this.fecha = this.recetas.fecha.toDate()
         this.darFormatoFecha(this.fecha)
       }
     })
    },

    darFormatoFecha(fecha){
      const anio = fecha.getFullYear().toString()
      const mes = fecha.getMonth().toString()
      const dia = fecha.getDate().toString()

      this.fecha = dia + "-" + mes + "-" + anio
    },

    generarPdf() {
      console.log(document.querySelector("#target"));
      var doc = new jsPDF(
        {
          orientation: "l",
          unit: "px",
          format: [1130, 1000],
        }
        //  "p", "pt", "a4"
      );
      const ruta = document.querySelector("#target");
      // doc.setFontSize(18);
      // doc.text('Receta', 20, 30);
      doc.html(ruta, {
        callback: function (doc) {
          doc.save("Receta_Membrete.pdf");
        },
      });
      this.bar1 = false;
    },
  },
};
</script>
