<template>
  <q-card class="q-ml-md q-mr-md q-mt-md">
    <q-card-section horizontal>
      <q-card-section class="bg-blue-grey-1  items-center">
        <div class="row full-height items-center">
          <div class="col-12">
            <q-avatar size="5rem" class="justify-center">
          <img :src="paciente.foto" />
        </q-avatar>
          </div>
        </div>
      </q-card-section>
      <q-card-section class="full-width">
        <div class="row">
          <div class="col-12">
            <p class="text-h6">{{ paciente.nombre }}</p>
          </div>
          <div class="col-12">
            <div class="row text-weight-light">
              <div class="col-lg-5 col-4">
                <q-icon name="cake" style="font-size: 2em" />
                {{ fechaNacimiento }}, {{ edad }} años <br />
                <br />
                <q-icon
                  :name="paciente.genero == 'Masculino' ? 'male' : 'female'"
                  style="font-size: 2em"
                />
                {{ paciente.genero }}
              </div>
              <div class="col-lg-5 col-4">
                <q-icon name="bloodtype" style="font-size: 2em" />
                {{ paciente.tipoSangre }} <br />
                <br />
                <q-icon name="monitor_weight" style="font-size: 2em" />
                {{ paciente.peso[paciente.peso.length - 1] }}
              </div>
              <div class="col-lg-2 col-4">
                <q-btn color="blue-9" push sm>
                  <div class="row items-center">
                    <q-icon left name="more" />
                    <div class="text-center">Ver expediente</div>
                  </div>
                </q-btn>
              </div>
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card-section>
  </q-card>
</template>

<script>
import { date } from "quasar";

export default {
  name: "PacienteComponent",
  props: {
    paciente: Object,
  },
  computed: {
    fechaNacimiento() {
      return date.formatDate(this.paciente.fechaNacimiento, "YYYY-MM-DD");
    },
    edad() {
      var hoy = new Date();
      var cumpleanos = new Date(this.paciente.fechaNacimiento);
      var edad = hoy.getFullYear() - cumpleanos.getFullYear();
      var m = hoy.getMonth() - cumpleanos.getMonth();

      if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
        edad--;
      }
      return edad;
    },
  },
};
</script>

<style>
</style>
