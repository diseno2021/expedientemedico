<template>
  <div class="row q-ma-md">
      <h3 class="text-h3">Consultas</h3>
      <div class="col-12 q-pa-sm" v-for="consulta in consultas" :key="consulta.id">
        <q-card>
            <q-card-section class="text-center">
                <div class="text-h6">Motivo: {{ consulta.motivoConsulta }}</div>
            </q-card-section>
            <q-separator inset></q-separator>
            <div class="row">
                <div class="col-12 col-md-8">
                    <q-card-section>
                        <div class="text-body1">Sintomas: {{ consulta.sintomas }}</div>
                        <div class="text-body1">Exploración Física: {{ consulta.exploracionFisica }}</div>
                        <div class="text-body1">Diagnostico: {{ consulta.diagnostico }}</div>
                        <div class="text-body1">Receta: {{ consulta.receta }}</div>
                        <div class="text-body1">Examenes: {{ consulta.examenes }}</div>
                    </q-card-section>
                </div>
                <div class="col-12 lt-md"><q-separator inset /></div>
                <q-separator inset vertical class="gt-sm" />
                <div class="col-12 col-md-auto">
                    <q-card-section>
                        <div class="text-body1">Peso: {{ consulta.peso }}</div>
                        <div class="text-body1">Estatura: {{ consulta.estatura }}</div>
                        <div class="text-body1">Temperatura: {{ consulta.temperatura }}</div>
                        <div class="text-body1">IMC: {{ consulta.imc }}</div>
                        <div class="text-body1">Presión Arterial: {{ consulta.presionArterial }}</div>
                    </q-card-section>
                </div>
            </div>
            <q-separator inset></q-separator>
            <q-card-section class="text-center">
                <div class="text-subtitle2">Próxima cita: {{ consulta.proximaCita }}</div>
            </q-card-section>
        </q-card>
      </div>
  </div>
</template>

<script>
export default {

    data: () => ({
        consultas: []
    }),
    created(){
        let consultaejemplo =
        {
            id:"asdfasdlkjjash9783789asdf",
            idPaciente:"asdfasdfasdfa987asdfasdf76as",
            peso:132.5, //peso en libras
            estatura: 123, //en centimetros
            temperatura: 36.5,
            imc:23.3,
            presionArterial: "180/40",
            exploracionFisica:"", //texto html
            motivoConsulta:"Molestias",
            sintomas:"", //texto html
            diagnostico:"", //texto html
            receta:"", //texto html
            examenes:"", //texto html
            proximaCita: "2021-04-30T12:21:21",
        }
        this.consultas.push(consultaejemplo);
        let consultaejemplo2 =
        {
            id:"sdfasdlkjjash9783789asd",
            idPaciente:"asdfasdfasdfa987asdfasdf76as",
            peso:132.5, //peso en libras
            estatura: 123, //en centimetros
            temperatura: 36.5,
            imc:23.3,
            presionArterial: "180/40",
            exploracionFisica:"", //texto html
            motivoConsulta:"Temperatura corporal alta",
            sintomas:"", //texto html
            diagnostico:"", //texto html
            receta:"", //texto html
            examenes:"", //texto html
            proximaCita: "2021-04-30T12:21:21",
        }
        this.consultas.push(consultaejemplo2);
    }

}
</script>

<style>

</style>