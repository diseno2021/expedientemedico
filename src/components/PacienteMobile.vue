<template>
  <div class="q-pa-md full-width">
    <q-expansion-item class="shadow-1 overflow-hidden rounded-borders">
      <template v-slot:header>
        <q-item-section avatar>
          <q-avatar size="4rem">
            <img :src="paciente.foto" />
          </q-avatar>
        </q-item-section>
        <q-separator vertical inset class="q-mr-sm" />
        <q-item-section>
          {{ paciente.nombre }}
        </q-item-section>
      </template>
      <q-separator inset />
      <q-card>
        <q-card-section>
          <div class="row ">
            <div class="col offset-sm-1">
              <q-icon name="cake" style="font-size: 2em;" class="text-indigo" />
              <span> {{ fechaNacimiento }} ({{ edad }} años) </span>
            </div>
            <div class="col">
              <q-icon
                name="bloodtype"
                style="font-size: 2em;"
                class="text-red "
              />
              <span> {{ paciente.tipoSangre }}</span>
            </div>
          </div>

          <div class="row q-mt-md ">
            <div class="col offset-sm-1">
              <q-icon
                :name="paciente.genero == 'Masculino' ? 'male' : 'female'"
                :class="
                  paciente.genero == 'Masculino' ? 'text-blue' : 'text-pink'
                "
                style="font-size: 2em"
              />
              <span class="q-mr-sm"> {{ paciente.genero }}</span>
            </div>
            <div class="col">
              <q-icon name="monitor_weight" style="font-size: 2em" />
              <span>{{ paciente.peso[paciente.peso.length - 1] }} lb</span>
            </div>
          </div>
        </q-card-section>
        <q-card-actions>
          <q-btn
            class="full-width"
            color="primary"
            label="Ver Expediente"
            icon="assignment"
            to=""
          />
        </q-card-actions>
      </q-card>
    </q-expansion-item>
  </div>
</template>

<script>
import { date } from "quasar";
export default {
  props: {
    paciente: Object
  },
  computed: {
    fechaNacimiento() {
      return date.formatDate(this.paciente.fechaNacimiento, "DD/MM/YY");
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
    }
  }
};
</script>

<style lang="scss" scoped>
.brxsmall {
  display: block;
  margin-bottom: -0.4em;
}
</style>
