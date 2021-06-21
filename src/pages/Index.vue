<template>
  <div class="relative-position" :style="visible ? 'height: 92Vh' : ''">
    <!-- row de filtros-->
    <div class="row" v-if="!visible && pacientes.length > 0">
      <div class="col-12 q-pa-md">
        <!-- row Barra de busqueda -->
        <div class="row">
          <q-input
            class="full-width"
            rounded
            standout="bg-blue-11 text-white"
            bottom-slots
            v-model="search"
            label="Buscar por nombre"
            @input="filtrarPacientes"
          >
            <template v-slot:prepend>
              <q-icon name="search" />
            </template>
            <template v-slot:append>
              <q-icon
                name="close"
                @click="clearSearch"
                class="cursor-pointer"
              />
            </template>
          </q-input>
        </div>
        <!-- Row de opciones para buscar -->
        <div class="row items-center justify-center">
          <div class="col-12">
            <span class="q-ml-xl" v-if="$q.screen.width > 599"
              >Ordenar por:</span
            >
            <q-select
              @input="filtrarPacientes"
              class="inline q-mx-md"
              rounded
              v-model="orderBy"
              :options="orderByOptions"
              dense
            >
              <template v-slot:prepend>
                <q-icon name="sort" />
              </template>
            </q-select>
            <q-btn
              class="q-mr-xl"
              :disabled="orderBy == ''"
              round
              color="grey"
              size="sm"
              :icon="orderDescend == true ? 'arrow_downward' : 'arrow_upward'"
              @click="changeOrder"
            />
            <span v-if="$q.screen.width > 599">Filtrar género:</span>
            <q-btn-toggle
              @input="filtrarPacientes"
              class="q-ml-md q-mr-lg"
              v-model="filterBy"
              toggle-color="grey-5"
              size="sm"
              :options="optionFilters"
            >
              <template v-slot:todos>
                <q-icon name="male" class="text-blue" />
                <q-icon name="female" class="text-pink" />
                <q-tooltip>
                  Todos
                </q-tooltip>
              </template>
              <template v-slot:Masculino>
                <q-icon name="male" class="text-blue" />
                 <q-tooltip>
                  Solo Hombres
                </q-tooltip>
              </template>
              <template v-slot:Femenino>
                <q-icon name="female" class="text-pink" />
                 <q-tooltip>
                  Solo Mujeres
                </q-tooltip>
              </template>
            </q-btn-toggle>
            <span v-if="$q.screen.width > 599">Ver: </span>
            <q-select
              @input="filtrarPacientes"
              class="inline q-mx-md"
              outlined
              v-model="pacientesPorPagina"
              :options="pacientesPorPaginaOptions"
              dense
            >
            </q-select>
          </div>
        </div>
      </div>
    </div>
    <!-- row de pacientes-->
    <div class="row" v-if="!visible && pacientes.length > 0">
      <div
        v-if="$q.screen.width > 599"
        class="col-12 col-md-6 col-lg-4"
        v-for="paciente in pacientesFiltradosPaginados"
        :key="paciente.id"
      >
        <PacienteDesktop :paciente="paciente" />
      </div>

      <div
        v-for="paciente in pacientesFiltradosPaginados"
        :key="paciente.id"
        class="full-width"
        v-if="$q.screen.width <= 599"
      >
        <PacienteMobile :paciente="paciente" />
      </div>
    </div>
    <!-- paginador-->
    <div
      class="q-pa-lg flex flex-center"
      v-if="!visible && pacientes.length > 0"
    >
      <q-pagination
        v-model="paginaActual"
        :max="numPaginas"
        @input="cambioPagina"
        direction-links
        boundary-links
        icon-first="skip_previous"
        icon-last="skip_next"
        icon-prev="fast_rewind"
        icon-next="fast_forward"
      />
    </div>
    <!-- mensaje si no hay pacientes-->
    <div
      class="row  items-center justify-center items-center"
      v-if="!visible && pacientes.length == 0"
      style="height: 85Vh"
    >
      <div class="col-12 text-center text-primary">
        <q-icon name="people" style="font-size: 8rem" />

        <div class=" text-h4  text-weight-bolder">
          No hay pacientes registrados
        </div>
      </div>
    </div>
    <!-- loading-->
    <q-inner-loading :showing="visible">
      <q-spinner-cube size="3rem" color="primary" />
      <span
        class=" text-primary
        text-uppercase
        text-overline
        text-weight-bold"
        >Cargando Pacientes</span
      >
    </q-inner-loading>
  </div>
</template>

<script>
import { auth, db, st } from "../boot/firebase";
import PacienteDesktop from "../components/Dashboard/PacienteDesktop";
import PacienteMobile from "../components/Dashboard/PacienteMobile";
export default {
  name: "PageIndex",
  components: {
    PacienteDesktop,
    PacienteMobile
  },
  data() {
    return {
      visible: true,
      search: "",
      orderBy: "nombre",
      orderByOptions: ["edad", "peso", "nombre"],
      orderDescend: false,
      paginaActual: 1,
      numPaginas: 0,
      pacientesPorPagina: 15,
      pacientesPorPaginaOptions: [5, 10, 15, 20],
      totalPacientes: 0,
      pacientesFiltrados: [],
      pacientesFiltradosPaginados: [],
      filterBy: "todos",
      optionFilters: [
        { slot: "todos", value: "todos" },
        { slot: "Masculino", value: "Masculino" },
        { slot: "Femenino", value: "Femenino" }
      ],
      pacientes: []
    };
  },
  //se le pone async para que no filtre antes de que este lleno el array de pacientes
  async created() {
    await this.traerPacientes();
    this.filtrarPacientes();
  },
  methods: {
    //cuando presiona la x de borrar busqueda
    clearSearch() {
      this.search = "";
      this.filtrarPacientes();
    },
    //funcion para cambiar de ordenar ascendente a descentende y viceversa
    changeOrder() {
      this.orderDescend = !this.orderDescend;
      this.filtrarPacientes();
    },
    //funcion que devuelve la edad con la fecha de nacimiento
    getEdad(date) {
      var hoy = new Date();
      var cumpleanos = new Date(date);
      var edad = hoy.getFullYear() - cumpleanos.getFullYear();
      var m = hoy.getMonth() - cumpleanos.getMonth();

      if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
        edad--;
      }
      return edad;
    },
    //cada vez que hace un cambio de pagina vuelve a partir el array de pacientes filtrados y solo devuelve el trozo dependiendo de la pagina
    //y el numero de pacientes que quiera por pagina
    cambioPagina() {
      this.pacientesFiltradosPaginados = this.pacientesFiltrados.slice(
        this.paginaActual * this.pacientesPorPagina - this.pacientesPorPagina,
        this.paginaActual * this.pacientesPorPagina
      );
    },
    //metodo para llenar el array pacientes con todos los pacientes del doctor actual
    async traerPacientes() {
      this.pacientes = [];
      try {
        //primero traemos los pacientes
        const snapshot = await db
          .collection("pacientes")
          .where("idMedico", "==", auth.currentUser.uid)
          .get();
        snapshot.forEach(e => {
          var paciente = {
            id: e.id,
            nombre: e.data().nombre,
            direccion: e.data().direccion,
            fechaNacimiento: e.data().fechaNacimiento,
            peso: e.data().peso[e.data().peso.length - 1],
            tipoSangre: e.data().tipoSangre,
            genero: e.data().genero
          };
          this.pacientes.push(paciente);
        });
        for (var paciente of this.pacientes) {
          paciente.foto = await st
            .ref()
            .child(paciente.id + "/perfil.jpg")
            .getDownloadURL();
        }
        this.visible = false;
      } catch (error) {
        console.error(error);
      }
    },

    //primero filtra el arreglo de pacientes por los parametros y al final solo delvuelve el primer trozo
    //despues de aplicar un filtro lo mueve a pa pagina 1 para que no haya problemas
    filtrarPacientes() {
      this.pacientesFiltrados = this.pacientes;
      if (this.search != "") {
        this.pacientesFiltrados = this.pacientesFiltrados.filter(p => {
          let regex = new RegExp(this.search, "i");
          return regex.test(p.nombre);
        });
      }
      //PRIMERO EVALUA LA BUSQUEDA POR NOMBRE
      if (this.orderBy == "nombre" && this.orderDescend == false) {
        this.pacientesFiltrados = this.pacientesFiltrados.sort((p1, p2) => {
          if (p1.nombre > p2.nombre) {
            return 1;
          }
          if (p1.nombre < p2.nombre) {
            return -1;
          }
          return 0;
        });
        //si no esta this.pacientesFiltrados por busqueda lo filtra por nombre
      } else if (this.orderBy == "nombre" && this.orderDescend == true) {
        this.pacientesFiltrados = this.pacientesFiltrados.sort((p1, p2) => {
          if (p1.nombre > p2.nombre) {
            return -1;
          }
          if (p1.nombre < p2.nombre) {
            return 1;
          }
          return 0;
        });
      }

      //AHORA LOS ORDENA
      //si es ordenado por edad
      if (this.orderBy == "edad" && this.orderDescend == false) {
        this.pacientesFiltrados = this.pacientesFiltrados.sort((p1, p2) => {
          return (
            this.getEdad(p1.fechaNacimiento) - this.getEdad(p2.fechaNacimiento)
          ); //de menor a mayor
        });
        //si es con ordenar por edad descendente
      } else if (this.orderBy == "edad" && this.orderDescend == true) {
        this.pacientesFiltrados = this.pacientesFiltrados.sort((p1, p2) => {
          return (
            this.getEdad(p2.fechaNacimiento) - this.getEdad(p1.fechaNacimiento)
          ); //de mayor a menor
        });
      }

      //si es ordenado por peso
      if (this.orderBy == "peso" && this.orderDescend == false) {
        this.pacientesFiltrados = this.pacientesFiltrados.sort((p1, p2) => {
          return p1.peso - p2.peso; //de menor a mayor
        });
        //si es con ordenar por peso descendente
      } else if (this.orderBy == "peso" && this.orderDescend == true) {
        this.pacientesFiltrados = this.pacientesFiltrados.sort((p1, p2) => {
          return p2.peso - p1.peso; //de mayor a menor
        });
      }

      //FILTRO DE MASCULINO Y FEMENINO
      if (this.filterBy == "Masculino") {
        this.pacientesFiltrados = this.pacientesFiltrados.filter(p => {
          return p.genero == "Masculino";
        });
      } else if (this.filterBy == "Femenino") {
        this.pacientesFiltrados = this.pacientesFiltrados.filter(p => {
          return p.genero == "Femenino";
        });
      }

      //despues de filtrar devuelve el primer trozo, de esta manera cada vez que haya un filtro
      //lo volvera a la pagina 1 de los resultados
      this.paginaActual = 1;
      this.total = this.pacientesFiltrados.length;
      this.numPaginas = Math.ceil(this.total / this.pacientesPorPagina);
      this.pacientesFiltradosPaginados = this.pacientesFiltrados.slice(
        0,
        this.pacientesPorPagina
      );
    }
  },
  computed: {}
};
</script>
