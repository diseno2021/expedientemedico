<template>
  <div class="q-ma-md">
    <div class="row">
      <h4 class="text-h4">Consultas</h4>
    </div>
    <div class="row" v-if="consultas.length > 0">
      <div
        class="col-12 col-md-6 q-pa-sm"
        v-for="(consulta, index) in consultasPagina"
        :key="consulta.id"
      >
        <q-card flat bordered>
          <q-expansion-item>
            <template v-slot:header>
              <q-item-section class="text-body2">
                <span> {{ formatoFecha(consulta.fecha) }} - <strong> Motivo: {{ consulta.motivoConsulta }} </strong> </span>
              </q-item-section>
            </template>
            <q-separator></q-separator>
            <div class="row">
              <div class="col-auto q-py-none q-pl-sm q-pr-none">
                <q-tabs
                  dense
                  v-model="tab[index]"
                  vertical
                  no-caps
                  align="left"
                  class="text-primary q-px-none"
                >
                  <q-tab :name="'sintomas' + index" label="Sintomas" />
                  <q-tab :name="'ef' + index" label="E. Fisica" />
                  <q-tab :name="'diagnostico' + index" label="Diagnostico" />
                  <q-tab :name="'receta' + index" label="Receta" />
                  <q-tab :name="'examenes' + index" label="Examenes" />
                </q-tabs>
              </div>
              <q-separator vertical inset color="primary" />
              <div class="col q-pl-sm q-pr-xs q-py-xs">
                <q-scroll-area style="height: 170px;">
                  <q-tab-panels
                    v-model="tab[index]"
                    animated
                    swipeable
                    vertical
                    transition-prev="jump-up"
                    transition-next="jump-up"
                  >
                    <q-tab-panel class="q-pa-none" :name="'sintomas' + index">
                      <div class="text-h6 q-mb-md">Sintomas</div>
                      <div class="text-body2" v-html="consulta.sintomas"></div>
                    </q-tab-panel>
                    <q-tab-panel class="q-pa-none" :name="'ef' + index">
                      <div class="text-h6 q-mb-md">Exploracion Fisica</div>
                      <div
                        class="text-body2"
                        v-html="consulta.exploracionFisica"
                      ></div>
                    </q-tab-panel>
                    <q-tab-panel
                      class="q-pa-none"
                      :name="'diagnostico' + index"
                    >
                      <div class="text-h6 q-mb-md">Diagnostico</div>
                      <div
                        class="text-body2"
                        v-html="consulta.diagnostico"
                      ></div>
                    </q-tab-panel>
                    <q-tab-panel class="q-pa-none" :name="'receta' + index">
                      <div class="text-h6 q-mb-md">Receta</div>
                      <div class="text-body2" v-html="consulta.receta"></div>
                    </q-tab-panel>
                    <q-tab-panel class="q-pa-none" :name="'examenes' + index">
                      <div class="text-h6 q-mb-md">Examenes</div>
                      <div class="text-body2" v-html="consulta.examenes"></div>
                    </q-tab-panel>
                  </q-tab-panels>
                </q-scroll-area>
              </div>
              <q-separator vertical class="gt-md" />
              <q-separator vertical class="lt-md gt-xs" />
              <div class="col-12 col-sm-4 col-md-12 col-lg-4 q-py-xs q-px-md">
                <q-separator class="lt-lg gt-sm"></q-separator>
                <q-separator class="lt-sm"></q-separator>
                <div class="row q-pt-xs">
                  <div class="col-6 col-sm-12 col-md-6 col-lg-12">
                    <span class="text-subtitle2">Peso: </span>
                    <span class="text-body2">{{ consulta.peso + " lb"}}</span>
                  </div>
                  <div class="col-6 col-sm-12 col-md-6 col-lg-12">
                    <span class="text-subtitle2">Estatura: </span>
                    <span class="text-body2">{{ consulta.estatura + " cm" }}</span>
                  </div>
                  <div class="col-6 col-sm-12 col-md-6 col-lg-12">
                    <span class="text-subtitle2">Temperatura: </span>
                    <span
                      class="text-body2"
                    >{{ consulta.temperatura + " °C" }}</span>
                  </div>
                  <div class="col-6 col-sm-12 col-md-6 col-lg-12">
                    <span class="text-subtitle2">IMC: </span>
                    <span class="text-body2">{{ consulta.imc + " kg/m2" }}</span>
                  </div>
                  <div class="col-12">
                    <span class="text-subtitle2">Presion arterial: </span>
                    <span
                      class="text-body2"
                    >{{ consulta.presionArterial + " mmHg" }}</span>
                  </div>
                </div>
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
        El paciente no tiene consultas registradas
      </div>
    </div>
  </div>
</template>

<script>
import { date } from 'quasar';

export default {
  props: {
    consultas: Array
  },
  data: () => ({
    tab: [],
    pagina: 1,
    max: 1,
    consultasPagina: [],
    nConsultasPagina: 4
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
    }
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
    }
  }
};
</script>

<style></style>
