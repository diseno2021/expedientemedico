<template>
  <div class="q-pa-md full-width">
    <q-expansion-item class="shadow-1 overflow-hidden rounded-borders">
      <template v-slot:header>
        <q-item-section avatar>
          <q-avatar size="4rem">
            <q-img :src="paciente.foto" />
          </q-avatar>
        </q-item-section>
        <q-separator vertical inset class="q-mr-sm" />
        <q-item-section>
          <q-item-label>
            {{ paciente.nombre }}
          </q-item-label>
          <q-item-label caption lines="1">
            <q-icon name="place" class="text-green" style="font-size: 1.5em"/> {{ paciente.direccion }}
          </q-item-label>
        </q-item-section>
      </template>
      <q-separator inset />
      <q-card>
        <q-card-section>
          <div class="row ">
            <div class="col ">
              <div class="row items-center">
                <div class="col-3 text-center">
                  <q-icon
                    name="cake"
                    style="font-size: 2em;"
                    class="text-indigo"
                  />
                </div>
                <div class="col">
                  <div class="row  justify-center">{{ fechaNacimiento }}</div>
                  <div class="row text-caption justify-center">
                    {{ edad }} años
                  </div>
                </div>
              </div>
            </div>
            <div class="col">
              <div class="row items-center">
                <div class="col-3  text-center">
                  <q-icon
                    name="bloodtype"
                    style="font-size: 2em;"
                    class="text-red "
                  />
                </div>
                <div class="col text-center">
                  {{ paciente.tipoSangre }}
                </div>
              </div>
            </div>
          </div>

          <div class="row q-mt-md ">
            <div class="col">
              <div class="row items-center">
                <div class="col-3 text-center">
                  <q-icon
                    :name="paciente.genero == 'Masculino' ? 'male' : 'female'"
                    :class="
                      paciente.genero == 'Masculino' ? 'text-blue' : 'text-pink'
                    "
                    style="font-size: 2em"
                  />
                </div>
                <div class="col text-center">
                  {{ paciente.genero }}
                </div>
              </div>
            </div>
            <div class="col">
              <div class="row items-center">
                <div class="col-3 text-center">
                  <q-icon name="monitor_weight" style="font-size: 2em" />
                </div>
                <div class="col text-center">
                  {{ paciente.peso }} lb
                </div>
              </div>
            </div>
          </div>
        </q-card-section>
        <q-card-actions>
          <q-btn
            class="full-width"
            color="primary"
            label="Ver Expediente"
            icon="assignment"
            :to="'/paciente/'+paciente.id"
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
