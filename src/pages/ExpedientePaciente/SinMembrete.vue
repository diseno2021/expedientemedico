<template>
  <div>
    <div class="col-1 ">
      <q-btn
        round
        color="light-blue-3"
        icon="print"
        @click="bar2 = true"
        class="absolute-bottom-right q-mb-xl q-mx-md"
      >
      </q-btn>
    </div>
    <!-- impresion -->

    <q-dialog
      v-model="bar2"
      persistent
      transition-show="flip-down"
      transition-hide="flip-up"
    >
      <q-card class="bg-primary text-white">
        <q-bar>
          <q-icon name="print" class="q-mx-sm" />
          Elija tipo impresión de Receta

          <q-space />

          <q-btn dense flat icon="close" v-close-popup>
            <q-tooltip content-class="bg-white text-primary">Close</q-tooltip>
          </q-btn>
        </q-bar>

        <q-card-section class="bg-cyan-2 ">
          <q-btn
            unelevated
            rounded
            color="secondary"
            label="Con Membrete"
            class="q-ma-sm"
          />
          <q-btn
            unelevated
            rounded
            color="secondary"
            label="Sin Membrete"
            class="q-ma-sm"
            @click="sinMembrete()"
          />
        </q-card-section>
      </q-card>
    </q-dialog>
    <!-- fin impresion -->
  </div>
</template>

<script>
import { jsPDF } from "jspdf";
import { db } from "../../boot/firebase";

export default {
  props: {
    idConsulta: String
  },
  data: () => ({
    consultasPaciente: [],
    algo: "",
    bar2: false
  }),
  methods: {
    sinMembrete() {
      let this2 = this;

      console.log(this.idConsulta);

      this.consultasPaciente = [];
      db.collection("consultas")
        .doc(this.idConsulta)
        .get()
        .then(doc => {
          this.consultasPaciente = doc.data();
        })
        .catch(err => {
          console.log(err);
        });

      console.log("consultP", this.consultasPaciente);

      // const doc = new jsPDF({
      //   orientation: "l",
      //   unit: "px",
      //   // format: "dl"
      //   format: [450, 300]
      //   // format: [8.5, 5.5]
      // });
      // console.log(text);
      // console.log(indexx);
      // doc.html(text[0], {
      //   callback: function(doc) {
      //     doc.save(` ${indexx} `);
      //   }
      // });
    }
  }
};
</script>

