<template>
  <!-- card de paciente -->
  <q-card class="q-ml-md q-mr-md q-mt-md">
    <q-card-section horizontal>
      <!-- imagen del paciente -->
      <q-card-section class="bg-blue-grey-1 ">
        <div class="row justify-center">
          <q-avatar size="5rem" class="justify-center">
            <q-img :src="paciente.foto" />
          </q-avatar>
        </div>
        <div class="row">
          <div class="col">
            <q-btn color="blue-9" flat :to="'/paciente/' + paciente.id">
              Expediente
            </q-btn>
          </div>
        </div>
      </q-card-section>
      <!-- fin imagen -->
      <!-- informacion del paciente -->
      <q-card-section class="full-width">
        <div class="row">
          <div class="col-12">
            <span class="text-h6">{{ paciente.nombre }}</span> <br />
            <q-separator></q-separator>
            <q-icon
              left
              name="location_on"
              style="font-size: 1.2em"
              class="text-green"
            /><span
              class="text-caption q-mb-md text-grey-7"
              style="font-size: 0.8em"
              >{{ paciente.direccion }}</span
            >
          </div>
        </div>

        <div class="row q-mt-sm">
          <div class="col-6">
            <q-icon name="cake" style="font-size: 1.5em" class="text-indigo" />
            {{ fechaNacimiento }},
            <span class="text-weight-regular" style="font-size: 1em">
              {{ edad }} años</span
            >
          </div>
          <div class="col-6">
            <q-icon
              name="bloodtype"
              style="font-size: 1.5em"
              class="text-red"
            />
            {{ paciente.tipoSangre }}
          </div>
        </div>

        <div class="row q-mt-sm">
          <div class="col-6">
            <q-icon
              :name="paciente.genero == 'Masculino' ? 'male' : 'female'"
              :class="
                paciente.genero == 'Masculino' ? 'text-blue' : 'text-pink'
              "
              style="font-size: 1.5em"
            />
            {{ paciente.genero }}
          </div>
          <div class="col-6">
            <q-icon name="monitor_weight" style="font-size: 1.5em" />
            {{ paciente.peso }} Lb.
          </div>
        </div>
      </q-card-section>
      <!-- fin informacion del paciente -->
    </q-card-section>
  </q-card>
</template>

<script>
import { date } from "quasar";

export default {
  name: "PacienteComponent",
  props: {
    paciente: Object
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
  }
};
</script>

<style></style>
