<template>
  <div class="contenedor">
    <q-btn
    style="min-width:25vh"
      color="dark"
      label="Con membrete"
      class="q-mx-xl"
      @click="bar2 = true; bar1=false"
    />
    <!-- con membrete dialog -->
    <q-dialog
      v-model="bar2"
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
          <q-btn
            unelevated
            color="grey-8"
            label="Cancelar"
            class="q-mx-xl"
            @click="bar2 = false"
          />
        </q-card-section>
      </q-card>
    </q-dialog>

    <div style="width: 1130px; height: 980px; display: none">
      <div id="target" ref="targetHtml" style="width: 1130px; height: 980px">
        <div class="content">
          <img
            :src="encabezado"
            style="width: 100%; height: 250px; left: 100%; object-fit: contain"
          />
        </div>

        <hr />
        <div class="content" style="padding-left: 30px; height: 480px; width: 1130px;">
          <div class="row" style="font-size: 25px; width: 100%;">
            <div class="col">
              <center><label> <strong>{{ medico.nombre }} </strong> </label><br></center>
            </div>
          </div>
          <div class="row" style="font-size: 20px">
            <div class="col">
              <label><b>Nombre: </b> {{ paciente.nombre }} </label><br>
              <label><b>direccion: </b> {{ paciente.direccion }} </label>
              <label><b>Fecha: </b> {{ fecha }}</label>
            </div>
            <div class="col">
              <label><b>DUI: </b> {{ paciente.dui }} </label><br>
              <label><b>Telefono: </b> {{ paciente.telefono }} </label><br>
            </div>
          </div>
          <h3><b>Receta</b></h3>
          <div style="font-size: 15px; height=50%; max-height=75%">
            <p v-html="consul.receta"></p>
          </div>
          <h5 style="text-align: right; float: right; top: 100%">
            Proxima cita: {{ consul.proximaCita }}
          </h5>
        </div>
        <hr />
        <div class="content" style="height: 80%" >
          <img
            :src="pieDePagina"
            style="width: 100%; height: 220px; object-fit: contain"
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
    consul: {
      type: Object,
      required: true,
    },
    id: {
      type: Number,
      default: null,
    },
  },
  data() {
    return {
      paciente: "",
      medico: "",
      bar2: false,
      bar1: false,
      recetas: "",
      fecha: "",
      encabezado: "",
      firmaDigital: "",
      pieDePagina: "",
      consultasPagina: [],
      nConsultasPagina: 4,
      indexSelect: null,
    };
  },
  created() {
    this.traerDatosPaciente()
    console.log("el id es: " + this.id);
    this.traerImg();
    this.fecha = this.consul.fecha.toDate();
    this.darFormatoFecha(this.fecha);
  },
  methods: {
    traerImg() {
      let that = this;
      db.collection("medicos")
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
        .catch((error) => {});
    },
    mostrar() {
      let query = db.collection("consultas").doc(this.id);

      this.recetas = query.get().then((query) => {
        if (query.exists) {
          console.log("datos: " + query);
          this.recetas = query.data();
          console.log("la receta dentro de mostrar:" + this.recetas);
          this.fecha = this.recetas.fecha.toDate();
          this.darFormatoFecha(this.fecha);
        }
      });
    },

    darFormatoFecha(fecha) {
      const anio = fecha.getFullYear().toString();
      const mes = fecha.getMonth().toString();
      const dia = fecha.getDate().toString();

      this.fecha = dia + "-" + mes + "-" + anio;
    },
    mostrarid() {
      console.log(this.id);
    },
    generarPdf() {
      var doc = new jsPDF(
        {
          orientation: "l",
          unit: "px",
          format: [1130, 1000],
        }
        //  "p", "pt", "a4"
      );
      let ruta = document.querySelectorAll("#target");
      // doc.setFontSize(18);
      // doc.text('Receta', 20, 30);
      console.log("el id es a inmprimir: " + this.id);
      doc.html(ruta[this.id], {
        callback: function (doc) {
          doc.save("Receta_Membrete.pdf");
        },
      });
      this.bar2 = false;
    },
    async traerDatosPaciente(){
      const dataPaciente = await db.collection('pacientes').doc(this.consul.idPaciente).get()
      this.paciente = dataPaciente.data()
      const dataMedico = await db.collection('medicos').doc(dataPaciente.data().idMedico).get()
      this.medico = dataMedico.data()

    }
  },
};
</script>
