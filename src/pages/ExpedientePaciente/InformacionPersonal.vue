<template>
  <div class="q-ma-md">
    <div class="row">
      <h3 class="text-h3">Información Personal</h3>
    </div>
    <div class="row q-mt-md">
      <div class="col-12 q-mt-md">
        <q-input v-model="paciente.nombre" label="Nombre completo">
          <template v-slot:prepend>
            <q-icon name="person" />
          </template>
        </q-input>
      </div>
    </div>
    <div class="row justify-between q-mt-md">
      <div class="col-12 col-sm-5 col-md-5">
        <q-input
          label="fecha de nacimiento"
          filled
          v-model="paciente.fechaNacimiento"
          mask="date"
          :rules="['date']"
        >
          <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy
                ref="qDateProxy"
                transition-show="scale"
                transition-hide="scale"
              >
                <q-date v-model="paciente.fechaNacimiento">
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="primary" flat />
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
      </div>
      <div class="col-12 col-sm-5 col-md-5 q-mt-md">
        <q-input v-model="edad" label="Edad"
          ><template v-slot:prepend>
            <q-icon name="cake" />
          </template>
        </q-input>
      </div>
    </div>

    <div class="row justify-between q-mt-md">
      <div class="col-12 col-md-5 ">
        <div class="row justify-between">
          <div class="col-6 col-sm-5">
            <q-radio v-model="paciente.genero" val="Masculino" label="Masculino" />
          </div>
          <div class="col-6 col-sm-5 ">
            <q-radio v-model="paciente.genero" val="Femenino" label="Femenino" />
          </div>
        </div>
      </div>
      <div class="col-12 col-md-5">
        <q-input v-model="paciente.tipoSangre" label="Tipo de sangre">
          <template v-slot:prepend>
            <q-icon name="bloodtype" />
          </template>
        </q-input>
      </div>
    </div>

    <div class="row justify-between q-mt-md">
      <div class="col-12 col-md-4">
        <q-input v-model="paciente.peso" label="Peso">
          <template v-slot:prepend>
            <q-icon name="monitor_weight" />
          </template>
        </q-input>
      </div>
      <div class="col-md-6"></div>
    </div>

    <div class="col-md-12 q-mt-md q-mt-md">
      <q-input v-model="paciente.direccion" label="Dirección">
        <template v-slot:prepend>
          <q-icon name="directions" />
        </template>
      </q-input>
    </div>

    <div class="col-md-12 q-mt-md q-mt-md">
      <q-input v-model="paciente.telefono" label="Teléfono">
        <template v-slot:prepend>
          <q-icon name="phone" />
        </template>
      </q-input>
    </div>

    <div class="col-md-12 q-mt-md q-my-md ">
      <q-input v-model="paciente.enCasoEmergencia" label="Caso de emergencia">
        <template v-slot:prepend>
          <q-icon name="warning" />
        </template>
      </q-input>
    </div>
    <q-btn
                color="secondary"
                icon="save"
                label="Guardar Información"
                class="full-width"
                @click="guardarInformacion"
              ></q-btn>
  </div>
</template>

<script>
import { date } from "quasar";
import BannerPrincipal from "./../../components/ExpedientePaciente/BannerPrincipal.vue";
export default {
  data() {
    return {
          paciente: { id:"asdfasdfasdfa987asdfasdf76as",
          idMedico:"asdfasd88asd7fas6dfasd", //este campo relaciona al medico al cual pertenece
          nombre: "Juan Santiago Perez Lima",
          fechaNacimiento: "1998-03-06T00:00:00",
          genero:"Masculino",
          peso:[170,150,140,135], //el peso se lleva en un arreglo para poder graficarlo
          estatura:[123,125,135],
          foto:"http://storage/123231.jpg&quot;",
          tipoSangre:"O RH+",
          direccion:"Final avenida fray felipe de jesus moraga casa #23",
          telefono:"7366-2344",
          dui:"",
          whatsapp:"1242-1234",
          email:"paciente@outlook.com",
          enCasoEmergencia:"Esposa Juana Salazar 7346454",
          comentario:"",
          antecedentes:"Padre diabético<br> Tía materna hipertensa", //texto html
          alergias:"Penicilina Procainica, picadas de abejas",
          enfermedadesCronicas:"Cancer de Seno, Diabetes tipo 2", //texto html
          medicamentosPermanentes:"<br>Rivoflavina</br> una por las noches", //texto html
          archivos:['http://storage/idpaciente/foto01.jpg&#39;',
          'http://storage/idpaciente/foto01.jpg&#39;',
          ]
          }

  }
  },
  components: {
    BannerPrincipal
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
  methods:{
    guardarInformacion () {
            this.$q.notify({
                message: 'Información personal guardada en local storage',
                color: 'green-4',
                textColor: 'white',
                icon: 'cloud_done'
            })
        },
  }
};
</script>

<style lang="scss" scoped></style>
