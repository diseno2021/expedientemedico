<template>
  <div>
    <div class="q-pa-md">
      <!-- <q-card flat> -->
      <q-card-section>
        <div class="row justify-center q-pb-xs">
          <q-avatar square rounded size="85px" class="q-mx-auto">
            <img :src="fotoPerfil" />
          </q-avatar>
        </div>
        <div class="text-h6 q-pb-xs">{{ paciente.nombre }}</div>
      </q-card-section>
      <!-- </q-card> -->
    </div>
    <div class="q-pa-md" style="max-width: 350px">
      <q-list>
        <q-expansion-item
          icon="book"
          expand-separator
          group="somegroup"
          label="Antecedentes"
          class="overflow-hidden"
        >
          <!-- <q-card class="bg-grey-3"> -->
          <q-card-section v-html="paciente.antecedentes"> </q-card-section>
          <!-- </q-card> -->
        </q-expansion-item>

        <q-expansion-item
          icon="medication"
          group="somegroup"
          expand-separator
          label="Medicamentos Permantentes"
          class=" overflow-hidden"
        >
          <!-- <q-card class="bg-grey-3"> -->
          <q-card-section v-html="paciente.medicamentosPermanentes">
          </q-card-section>
          <!-- </q-card> -->
        </q-expansion-item>

        <q-expansion-item
          icon="healing"
          group="somegroup"
          expand-separator
          label="Consultas"
          class=" overflow-hidden"
          header-class="claseheader"
        >
          <q-card-section>
            <div class="text-h6">05-23-2021</div>
            <div class="text-subtitle2">fecha de ultima consulta</div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            Este es el diagnostico de la ultima consulta con el paciente puede
            ser extenso como se desee
          </q-card-section>
        </q-expansion-item>

        <!-- <q-expansion-item
          icon="description"
          group="somegroup"
          label="Recetas"
          expand-separator
          class=" overflow-hidden"
          header-class="claseheader"
        >
          <q-card class="bg-grey-3">
            <q-card-section>
              <div class="text-h6">05-23-2021</div>
              <div class="text-subtitle2">Receta de la ultima consulta</div>
            </q-card-section>

            <q-card-section v-html="consultas.receta"> </q-card-section>
          </q-card>
        </q-expansion-item> -->

        <q-expansion-item
          icon="collections"
          group="somegroup"
          label="Archivos"
          expand-separator
          class=" overflow-hidden"
          header-class="claseheader"
        >
          <!-- Sugerimos eliminar las card para que funcione el modo oscuro y tenga menos padding los elementos -->
          <!-- Dejamos nuestro componente, nos deben pasar el id del paciente en la propiedad :idPaciente="" -->
          <testGaleriaComponent
            :idPaciente="this.$router.currentRoute.params.id"
          />
        </q-expansion-item>

        <q-expansion-item
          icon="monitor_weight"
          group="somegroup"
          label="Peso"
          expand-separator
          class=" overflow-hidden"
          header-class="claseheader"
          active="bg-teal text-white"
        >
          <!-- <q-card class="bg-grey-3"> -->
          <q-card-section>
            <Grafica
              :datosGrafica="datosGraficaPeso"
              :numerosGrafica="numerosGraficaPeso"
              :label="'Peso'"
              v-if="datosGraficaPeso"
            />
          </q-card-section>
          <!-- </q-card> -->
        </q-expansion-item>
        <br />
        <div class="column align-center ">
          <q-btn
            color="secondary"
            label="Cancelar consulta"
            class="full-width"
            :to="'/paciente/' + paciente.id"
          ></q-btn>
        </div>
      </q-list>
    </div>
  </div>
</template>

<script>
import TestGaleriaComponent from "src/pages/testGaleriaComponent.vue";
import { db, st } from "../../boot/firebase";
import Grafica from "../../components/ExpedientePaciente/Grafica";

export default {
  components: {
    TestGaleriaComponent,
    Grafica
  },

  data: () => ({
    paciente: null,
    consulta: null,
    fotoPerfil: "",
    datosGraficaPeso: null,
    numerosGraficaPeso: [],
    pacienteid: ""
  }),
  created() {
    this.obtenerDatosPaciente();
    this.obtenerConsultas();
  },
  methods: {
    obtenerDatosPaciente() {
      let id = this.$router.currentRoute.params.id;
      var docRef = db.collection("pacientes").doc(id);
      docRef
        .get()
        .then(doc => {
          if (doc.exists) {
            let datos = doc.data();
            this.paciente = {
              id: doc.id,
              ...datos
            };
            this.datosGraficaPeso =
              this.paciente.peso > 5
                ? this.paciente.peso.slice(-5)
                : this.paciente.peso;
            for (
              let index = 1;
              index <= this.datosGraficaPeso.length;
              index++
            ) {
              this.numerosGraficaPeso.push(index);
            }
            st.ref(doc.data().foto)
              .getDownloadURL()
              .then(url => {
                this.fotoPerfil = url;
              });
          } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
          }
        })
        .catch(error => {
          console.log("Error getting document:", error);
        });
    },
    obtenerConsultas() {
      db.collection("consultas")
        .where("idPaciente", "==", this.$router.currentRoute.params.id)
        .get()
        .then(qs => {
          qs.docs.forEach(doc => {
            let consulta = doc.data();
            Object.defineProperty(consulta, "id", {
              value: doc.id,
              writable: true,
              enumerable: true,
              configurable: true
            });
            // this.consultasPaciente.push(consulta);
          });
        });
    },
    obtenerPacienteId() {
      let id = this.$router.currentRoute.params.id;
      this.pacienteid = id;
    }
  }
};
</script>
