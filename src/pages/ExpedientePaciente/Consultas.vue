<template>
  <div class="q-ma-md">
      <div class="row">
          <h3 class="text-h3">Consultas</h3>
      </div>
       <div class="row">
            <div class="col-12 col-md-6 q-pa-sm" v-for="(consulta,index) in consultas" :key="consulta.id">
                <q-card flat bordered>
                    <q-expansion-item>
                        <template v-slot:header>
                            <q-item-section class="text-subtitle2">
                                Motivo: {{ consulta.motivoConsulta }}
                            </q-item-section>
                            <q-item-section class="text-body2">
                                {{ consulta.fecha }}
                            </q-item-section>
                        </template>
                        <q-separator></q-separator>
                        <div class="row">
                            <div class="col-auto q-py-md q-pl-md q-pr-none">
                                <q-tabs dense v-model="tab[index]" vertical no-caps align="left" class="text-primary">
                                    <q-tab :name="'sintomas'+index" label="Sintomas" />
                                    <q-tab :name="'ef'+index" label="E. Fisica" />
                                    <q-tab :name="'diagnostico'+index" label="Diagnostico" />
                                    <q-tab :name="'receta'+index" label="Receta" />
                                    <q-tab :name="'examenes'+index" label="Examenes" />
                                </q-tabs>
                            </div>
                            <q-separator vertical inset color="primary"/>
                            <div class="col q-pa-md">
                                <q-tab-panels v-model="tab[index]" animated swipeable vertical transition-prev="jump-up" transition-next="jump-up">
                                    <q-tab-panel class="q-pa-none" :name="'sintomas'+index">
                                        <div class="text-h6 q-mb-md">Sintomas</div>
                                        <div class="text-body2" v-html="consulta.sintomas"></div>
                                    </q-tab-panel>
                                    <q-tab-panel class="q-pa-none" :name="'ef'+index">
                                        <div class="text-h6 q-mb-md">Exploracion Fisica</div>
                                        <div class="text-body2" v-html="consulta.exploracionFisica"></div>
                                    </q-tab-panel>
                                    <q-tab-panel class="q-pa-none" :name="'diagnostico'+index">
                                        <div class="text-h6 q-mb-md">Diagnostico</div>
                                        <div class="text-body2" v-html="consulta.diagnostico"></div>
                                    </q-tab-panel>
                                    <q-tab-panel class="q-pa-none" :name="'receta'+index">
                                        <div class="text-h6 q-mb-md">Receta</div>
                                        <div class="text-body2" v-html="consulta.receta"></div>
                                    </q-tab-panel>
                                    <q-tab-panel class="q-pa-none" :name="'examenes'+index">
                                        <div class="text-h6 q-mb-md">Examenes</div>
                                        <div class="text-body2" v-html="consulta.examenes"></div>
                                    </q-tab-panel>
                                </q-tab-panels>
                            </div>
                            <q-separator vertical class="gt-md" />
                            <q-separator vertical class="lt-md gt-xs" />
                            <div class="col-12 col-sm-4 col-md-12 col-lg-4 q-pa-md">
                                <q-separator class="lt-lg gt-sm"></q-separator>
                                <q-separator class="lt-sm"></q-separator>
                                <div class="row q-pt-md">
                                    <div class="col-6 col-sm-12 col-md-6 col-lg-12">
                                        <span class="text-subtitle2">Peso: </span>
                                        <span class="text-body2" v-html="consulta.peso"></span>
                                    </div>
                                    <div class="col-6 col-sm-12 col-md-6 col-lg-12">
                                        <span class="text-subtitle2">Estatura: </span>
                                        <span class="text-body2" v-html="consulta.estatura"></span>
                                    </div>
                                    <div class="col-6 col-sm-12 col-md-6 col-lg-12">
                                        <span class="text-subtitle2">Temperatura: </span>
                                        <span class="text-body2" v-html="consulta.temperatura"></span>
                                    </div>
                                    <div class="col-6 col-sm-12 col-md-6 col-lg-12">
                                        <span class="text-subtitle2">IMC: </span>
                                        <span class="text-body2" v-html="consulta.imc"></span>
                                    </div>
                                    <div class="col-12">
                                        <span class="text-subtitle2">Presion arterial: </span>
                                        <span class="text-body2" v-html="consulta.presionArterial"></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <q-separator />
                        <q-card-section class="text-center">
                            Proxima cita: {{ consulta.proximaCita }}
                        </q-card-section>
                    </q-expansion-item>
                </q-card>
            </div>
       </div>
  </div>
</template>

<script>
export default {

    data: () => ({
        consultas: [],
        tab: [],
    }),
    created(){
        let consultaejemplo =
        {
            id:"asdfasdlkjjash9783asdf",
            idPaciente:"asdfasdfasdfa987asdfasdf76as",
            fecha: "2021-04-30T12:21:21",
            peso:132.5, //peso en libras
            estatura: 123, //en centimetros
            temperatura: 36.5,
            imc:23.3,
            presionArterial: "180/40",
            exploracionFisica:"las amígdalas están enrojecidas", //texto html
            motivoConsulta:"Molestias en la garganta",
            sintomas:"Sensación de picazón en la garganta <br />Voz ronca <br />Dolor e inflamación de los ganglios en la zona del cuello o la mandíbula", //texto html
            diagnostico:"Faringo-amigdalitis aguda", //texto html
            receta:"Paracetamol - 1 por las noches", //texto html
            examenes:"", //texto html
            proximaCita: "2021-05-30T12:21:21",
        }
        this.consultas.push(consultaejemplo);
        let consultaejemplo2 =
        {
            id:"sdfasdljash9783789asd",
            idPaciente:"asdfasdfasdfa987asdfasdf76as",
            fecha: "2021-03-30T12:21:21",
            peso:132.5, //peso en libras
            estatura: 123, //en centimetros
            temperatura: 36.5,
            imc:23.3,
            presionArterial: "180/40",
            exploracionFisica:"", //texto html
            motivoConsulta:"Temperatura corporal alta",
            sintomas:"Deshidratación <br />Dolor de cabeza", //texto html
            diagnostico:"Febrícula", //texto html
            receta:"Ibuprofeno - 1 al dia <br />Paracetamol - 1 por las noches", //texto html
            examenes:"", //texto html
            proximaCita: "2021-04-30T12:21:21",
        }
        this.consultas.push(consultaejemplo2);
        let consultaejemplo3 =
        {
            id:"sasdlkjjash9783789asd",
            idPaciente:"asdfasasdfa987asdfasdf76as",
            fecha: "2021-02-30T12:21:21",
            peso:132.5, //peso en libras
            estatura: 123, //en centimetros
            temperatura: 36.5,
            imc:23.3,
            presionArterial: "180/40",
            exploracionFisica:"", //texto html
            motivoConsulta:"Temperatura corporal alta",
            sintomas:"Escalofríos y temblores <br />Sudoración", //texto html
            diagnostico:"Febrícula", //texto html
            receta:"Ibuprofeno - 1 al dia <br />Paracetamol - 1 por las noches", //texto html
            examenes:"", //texto html
            proximaCita: "2021-03-30T12:21:21",
        }
        this.consultas.push(consultaejemplo3);
        this.consultas.forEach((c, index) => {
            this.tab.push('sintomas' + index);
        });
    }

}
</script>

<style>

</style>