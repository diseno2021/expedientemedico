<template>
  <div class="q-ma-md">
    <div class="row">
      <h4 class="text-h4">Recetas</h4>
    </div>
    <div class="row" v-if="consultas.length > 0">
      <div
        class="col-12 col-md-6 q-pa-sm"
        v-for="consulta in consultasPagina"
        :key="consulta.id"
      >
        <q-card flat bordered>
          <q-expansion-item>
            <template v-slot:header>
              <q-item-section class="text-body2 text-center">
                {{ formatoFecha(consulta.fecha) }}
              </q-item-section>
            </template>
            <q-separator></q-separator>
            <div class="row">
              <div class="col q-pl-sm q-px-md q-py-xs">
                <q-scroll-area style="height: 150px">
                    
                      <div class="text-h6 q-mb-md">Receta</div>
                      <div class="text-body2" v-html="consulta.receta"></div>
                    
                </q-scroll-area>
              </div>
            </div>
            <q-separator />
            <div class="row items-center">
              <div v-if="consulta.proximaCita != undefined">
                <div v-if="consulta.proximaCita != null && consulta.proximaCita != ''" class="col-auto q-pa-sm">
                  Proxima cita: {{ formatoFecha(consulta.proximaCita) }}
                </div>
                <div v-else class="col-auto q-pa-sm">
                  Proxima cita: No se programo cita.
                </div>
              </div>
              <div v-else class="col-auto q-pa-sm">
                  Proxima cita: No se programo cita.
              </div>
              <q-space></q-space>
              <div class="col-auto q-py-xs q-px-sm">
                <q-btn
                  flat
                  size="md"
                  color="secondary"
                  dense
                  :to="'/editar-consulta/' + consulta.id"
                  >Editar</q-btn
                >
              </div>
            </div>
          </q-expansion-item>
        </q-card>
      </div>
    </div>
    <div class="row justify-center" v-if="consultas.length > 0">
      <div class="col-auto">
        <q-pagination
          v-model="pagina"
          :max="max"
          @input="cambiarPagina"
          direction-links
          boundary-links
          icon-first="skip_previous"
          icon-last="skip_next"
          icon-prev="fast_rewind"
          icon-next="fast_forward"
        />
      </div>
    </div>
    <div class="row" v-else>
      <div class="col-12 text-center text-h5">
        El paciente no tiene recetas registradas
      </div>
    </div>
  </div>
</template>
<script>
import { date } from 'quasar';

export default {
  props: {
    consultas: Array,
  },
  data: () => ({
    tab: [],
    pagina: 1,
    max: 1,
    consultasPagina: [],
    nConsultasPagina: 4,
  }),
  methods: {
    cambiarPagina() {
      this.consultasPagina.splice(0, this.consultasPagina.length);
      for (
        let index = (this.pagina - 1) * this.nConsultasPagina;
        index < this.pagina * this.nConsultasPagina;
        index++
      ) {
        if (this.consultas.length >= index + 1) {
          this.consultasPagina.push(this.consultas[index]);
        }
      }
      this.consultasPagina.forEach((c, index) => {
        this.tab.push("sintomas" + index);
      });
    },
  },
  computed: {
    formatoFecha(){
      return fecha => {
        if (date.isValid(fecha)) {
          return date.formatDate(fecha, 'DD/MM/YYYY');
        } else {
          return date.formatDate(new Date(fecha.seconds * 1000), 'DD/MM/YYYY');
        }
      } 
    },
  },
  watch: {
    consultas(newValue, oldValue) {
      this.max = Math.ceil(this.consultas.length / this.nConsultasPagina);
      for (let index = 0; index < this.nConsultasPagina; index++) {
        if (this.consultas.length >= index + 1) {
          this.consultasPagina.push(this.consultas[index]);
        }
      }
      this.consultasPagina.forEach((c, index) => {
        this.tab.push("sintomas" + index);
      });
    },
  },
};
</script>
