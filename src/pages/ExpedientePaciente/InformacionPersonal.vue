<template>
  <div class="q-ma-md">
    <div class="row items-center">
      <div class="col-12 col-sm-7 justify-between">
        <h4 class="text-h4">Información Personal</h4>
      </div>
      <div class="col-12 col-sm-5 justify-between">
        <q-btn
          outline
          color="primary"
          icon="home"
          label="Inicio"
          to="/"
          class="q-mx-sm"
        ></q-btn>
        <q-btn
          outline
          color="secondary"
          icon="save"
          label="Guardar"
          @click="guardarInformacion"
          class="q-mx-sm"
        ></q-btn>
      </div>
    </div>
    <div class="row q-mt-md">
      <div class="col-12 q-mt-md q-px-md">
        <q-input v-model="paciente.nombre" label="Nombre completo">
          <template v-slot:prepend>
            <q-icon name="person" />
          </template>
        </q-input>
      </div>
    </div>
    <div class="row justify-between q-mt-md">
      <div class="col-12  col-sm-6 q-px-md ">
        <q-input  v-model="paciente.fechaNacimiento">
          <template v-slot:prepend>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy transition-show="scale" transition-hide="scale">
                <q-date
                  v-model="paciente.fechaNacimiento"
                  mask="DD/MM/YYYY"
                  :locale="myLocale"
                >
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Cerrar" color="primary" flat />
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
      </div>
      <div class="col-12 col-sm-6 q-px-md ">
        <q-input v-model="edad" label="Edad"
          ><template v-slot:prepend>
            <q-icon name="cake" />
          </template>
        </q-input>
      </div>
    </div>

    <div class="row justify-between q-mt-md">
      <div class="col-12 col-sm-6 q-px-md">
        <div class="row justify-between">
          <div class="col-6 col-sm-5">
            <q-radio
              v-model="paciente.genero"
              val="Masculino"
              label="Masculino"
            />
          </div>
          <div class="col-6 col-sm-5 q-px-md ">
            <q-radio
              v-model="paciente.genero"
              val="Femenino"
              label="Femenino"
            />
          </div>
        </div>
      </div>
      <div class="col-12 col-sm-6 q-px-md">
        <q-input v-model="paciente.tipoSangre" label="Tipo de sangre">
          <template v-slot:prepend>
            <q-icon name="bloodtype" />
          </template>
        </q-input>
      </div>
    </div>

    <div class="row justify-between q-mt-md">
      <div class="col-12 col-md-6 ">
        <div class="row q-mb-md  justify-between q-px-md">
          <div class="col-8">
            <q-input label="Nuevo Peso (libras)" v-model="nuevoPeso" type="number">
              <template v-slot:prepend>
                <q-icon name="monitor_weight" />
              </template>
              <template v-slot:after>
                <q-btn :disable="nuevoPeso == null || nuevoPeso == ''"
                flat label="Agregar" color="primary" class="q-mt-md" @click="agregarPeso"></q-btn>
              </template>
            </q-input>
          </div>
          <div class="col-4">
            <q-btn
              color="primary"
              label="Pesos"
              flat
              class="q-mt-md"
              icon="expand_more"
            >
              <q-menu max-height="200px">
                <q-item
                  v-for="peso in paciente.peso"
                  :key="peso"
                  style="min-width: 100px"
                >
                  <q-item-section>
                    {{ peso }} lbs
                  </q-item-section>
                </q-item>
              </q-menu>
            </q-btn>
          </div>
        </div>
        <div class="q-px-md">
        <Grafica
          :datosGrafica="datosGraficaPeso"
          :numerosGrafica="numerosGraficaPeso"
          :label="'Peso'"
          v-if="datosGraficaPeso"
        />
        </div>
      </div>
      <div class="col-12 col-md-6 ">
        <div class="row q-mb-md  justify-between q-px-md">
          <div class="col-8">
            <q-input
              label="Nueva estatura (cms)"
              v-model="nuevaEstatura"
              type="number"
            >
              <template v-slot:prepend>
                <q-icon name="accessibility" />
              </template>
              <template v-slot:after>
                <q-btn :disable="nuevaEstatura == null || nuevaEstatura == ''"
                flat label="Agregar" color="primary" class="q-mt-md" @click="agregarEstatura"></q-btn>
              </template>
            </q-input>
          </div>
          <div class="col-4">
            <q-btn
              color="primary"
              label="Estaturas"
              flat
              class="q-mt-md"
              icon="expand_more"
            >
              <q-menu max-height="200px">
                <q-item
                  v-for="estatura in paciente.estatura"
                  :key="estatura"
                  style="min-width: 100px"
                >
                  <q-item-section>
                    {{ estatura }} cms
                  </q-item-section>
                </q-item>
              </q-menu>
            </q-btn>
          </div>
        </div>
        <div class="q-px-md">

        <Grafica
          :datosGrafica="datosGraficaEstatura"
          :numerosGrafica="numerosGraficaEstatura"
          :label="'Estatura'"
          v-if="datosGraficaEstatura"
        />
        </div>
      </div>
    </div>

    <div class="col-md-12 q-mt-md q-px-md">
      <q-input v-model="paciente.direccion" label="Dirección">
        <template v-slot:prepend>
          <q-icon name="directions" />
        </template>
      </q-input>
    </div>
    <div class="row justify-between">
      <div class="col-12 col-sm-6 q-mt-md q-px-md">
        <q-input v-model="paciente.telefono" label="Teléfono" mask="#### - ####">
          <template v-slot:prepend>
            <q-icon name="phone" />
          </template>
        </q-input>
      </div>

      <div class="col-12 col-sm-6 q-mt-md q-px-md">
        <q-input v-model="paciente.whatsapp" label="Whatsapp" mask="#### - ####">
          <template v-slot:prepend>
            <q-icon name="smartphone" />
          </template>
        </q-input>
      </div>
    </div>
    <div class="row justify-between">
      <div class="col-12 col-md-6 q-mt-md q-px-md">
        <q-input v-model="paciente.email" label="Email">
          <template v-slot:prepend>
            <q-icon name="email" />
          </template>
        </q-input>
      </div>

      <div class="col-12 col-md-6 q-mt-md q-px-md">
        <q-input v-model="paciente.dui" label="DUI" mask="########-#">
          <template v-slot:prepend>
            <q-icon name="credit_card" />
          </template>
        </q-input>
      </div>
    </div>

    <div class="col-md-12 q-my-md q-px-md">
      <q-input v-model="paciente.enCasoEmergencia" label="Caso de emergencia">
        <template v-slot:prepend>
          <q-icon name="warning" />
        </template>
      </q-input>
    </div>
  </div>
</template>

<script>
import { date } from "quasar";
import BannerPrincipal from "./../../components/ExpedientePaciente/BannerPrincipal.vue";
import Grafica from "../../components/ExpedientePaciente/Grafica";
export default {
  data() {
    return {
      nuevoPeso: null,
      nuevaEstatura: null,
      datosGraficaEstatura: null,
      numerosGraficaEstatura: [],
      datosGraficaPeso: null,
      numerosGraficaPeso: [],
      myLocale: {
        /* starting with Sunday */
        days: 'Domingo_Lunes_Martes_Miércoles_Jueves_Viernes_Sábado'.split('_'),
        daysShort: 'Dom_Lun_Mar_Mié_Jue_Vie_Sáb'.split('_'),
        months: 'Enero_Febrero_Marzo_Abril_Mayo_Junio_Julio_Agosto_Septiembre_Octubre_Noviembre_Diciembre'.split('_'),
        monthsShort: 'Ene_Feb_Mar_Abr_May_Jun_Jul_Ago_Sep_Oct_Nov_Dic'.split('_'),
        firstDayOfWeek: 1
      }
    };
  },
  props: ["paciente"],
  components: {
    BannerPrincipal,
    Grafica
  },
  computed: {
    //computen que devuelve la fecha de nacimiento
    fechaNacimiento() {
      return date.formatDate(this.paciente.fechaNacimiento, "YYYY-MM-DD");
    },
    //funcion que devuelve la edad con la fecha de nacimiento
    edad() {
      var hoy = new Date();
      var cumpleanos = new Date(this.paciente.fechaNacimiento);
      var edad = hoy.getFullYear() - cumpleanos.getFullYear();
      var m = hoy.getMonth() - cumpleanos.getMonth();

      if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
        edad--;
      }
      return edad;
    }
  },
  methods: {
    guardarInformacion() {
      this.$emit("guardarInformacion");
    },
    cargarDatosGrafica() {
      this.datosGraficaEstatura = null;
      this.numerosGraficaEstatura = [];
      this.datosGraficaPeso = null;
      this.numerosGraficaPeso = [];
      this.datosGraficaEstatura =
        this.paciente.estatura.length > 5
          ? this.paciente.estatura.slice(-5)
          : this.paciente.estatura;
      this.datosGraficaPeso =
        this.paciente.peso.length > 5
          ? this.paciente.peso.slice(-5)
          : this.paciente.peso;
      for (let index = 1; index <= this.datosGraficaEstatura.length; index++) {
        this.numerosGraficaEstatura.push(index);
      }
      for (let index = 1; index <= this.datosGraficaPeso.length; index++) {
        this.numerosGraficaPeso.push(index);
      }
    },
    agregarPeso(){
      if (this.nuevoPeso !== null && this.nuevoPeso !== "") {
        this.paciente.peso.push(parseFloat(this.nuevoPeso));
        this.nuevoPeso = null;
        this.cargarDatosGrafica();
      }
    },
    agregarEstatura(){
      if (this.nuevaEstatura !== null && this.nuevaEstatura !== "") {
        this.paciente.estatura.push(parseFloat(this.nuevaEstatura));
        this.nuevaEstatura = null;
         this.cargarDatosGrafica();
      }
    }
  },
  mounted() {
    this.cargarDatosGrafica()
  }
};
</script>

<style lang="scss" scoped></style>
