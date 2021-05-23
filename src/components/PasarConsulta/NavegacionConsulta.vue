<template>
  <div>
    <q-card flat>
        <q-card-section>
          <div class="row justify-center q-pb-xs">
            <q-avatar square rounded size="85px" class="q-mx-auto">
                <img :src="paciente.foto" />
              </q-avatar>
          </div>
              <div class="text-h6 q-pb-xs">{{ paciente.nombre }}</div>
              <div class="text-caption text-grey-7 q-pb-sm">Id: {{ paciente.id }}</div>
        </q-card-section>
      </q-card>
    <q-list bordered class="rounded-borders">
      <q-expansion-item
        icon="book"
        expand-separator
        label="Antecedentes"
        class="shadow-1 overflow-hidden"
        header-class="bg-primary text-white"
        expand-icon-class="text-white"
      >
        <q-card>
          <q-card-section v-html="paciente.antecedentes"> </q-card-section>
        </q-card>
      </q-expansion-item>

      <q-expansion-item
        icon="medication"
        expand-separator
        label="Medicamentos Permantentes"
        class="shadow-1 overflow-hidden"
        header-class="bg-primary text-white"
        expand-icon-class="text-white"
      >
        <q-card>
          <q-card-section v-html="paciente.medicamentosPermanentes">
          </q-card-section>
        </q-card>
      </q-expansion-item>

      <q-expansion-item
        icon="healing"
        expand-separator
        label="Consultas"
        class="shadow-1 overflow-hidden"
        header-class="bg-primary text-white"
        expand-icon-class="text-white"
      >
        <q-card>
          <q-card-section> Hola </q-card-section>
        </q-card>
      </q-expansion-item>

      <q-expansion-item
        icon="description"
        label="Recetas"
        expand-separator
        class="shadow-1 overflow-hidden"
        header-class="bg-primary text-white"
        expand-icon-class="text-white"
      >
        <q-card>
          <q-card-section v-html="consultas.receta"> </q-card-section>
        </q-card>
      </q-expansion-item>

      <q-expansion-item
        icon="collections"
        label="Archivos"
        expand-separator
        class="shadow-1 overflow-hidden"
        header-class="bg-primary text-white"
        expand-icon-class="text-white"
      >
        <q-card>
          <q-card-section>  <galeriaConsulta/>  </q-card-section>
        </q-card>
      </q-expansion-item>

      <q-expansion-item
        icon="monitor_weight"
        label="Peso"
        expand-separator
        class="shadow-1 overflow-hidden"
        header-class="bg-primary text-white"
        expand-icon-class="text-white"
      >
        <q-card>
          <q-card-section> <center> <img src="https://www.enpeso.com/wp-content/uploads/2016/06/graf-peso.png" style="height: 200px; max-width: 200px"> </center> </q-card-section>
        </q-card>
      </q-expansion-item>
    </q-list>
  </div>
</template>

<script>

import galeriaConsulta from "components/PasarConsulta/GaleriaConsulta";

export default {
components: {
    galeriaConsulta
  },

  data: () => ({
    paciente: {
      id: "asdfasdfasdfa987asdfasdf76as",
      idMedico: "asdfasd88asd7fas6dfasd", //este campo relaciona al medico al cual pertenece
      nombre: "Juan Santiago Perez Lima",
      fechaNacimiento: "1998-03-06T00:00:00",
      genero: "Masculino",
      peso: [170, 150, 140, 135], //el peso se lleva en un arreglo para poder graficarlo
      estatura: [123, 125, 135],
      foto: "https://cdn.quasar.dev/img/avatar6.jpg",
      tipoSangre: "O RH+",
      direccion: "Final avenida fray felipe de jesus moraga casa #23",
      telefono: "7366-2344",
      dui: "",
      whatsapp: "1242-1234",
      email: "paciente@outlook.com",
      enCasoEmergencia: "Esposa Juana Salazar 7346454",
      comentario: "",
      antecedentes: "Padre diabético<br> Tía materna hipertensa", //texto html
      alergias: "Penicilina Procainica, picadas de abejas",
      enfermedadesCronicas: "Cancer de Seno, Diabetes tipo 2", //texto html
      medicamentosPermanentes: "<br>Rivoflavina</br> una por las noches", //texto html
      archivos: [
        "http://storage/idpaciente/foto01.jpg&#39;",
        "http://storage/idpaciente/foto01.jpg&#39;",
      ],
    },
    consultas: {
      id: "asdfasdlkjjash9783789asdf",
      idPaciente: "asdfasdfasdfa987asdfasdf76as",
      peso: 132.5, //peso en libras
      estatura: 123, //en centimetros
      temperatura: 36.5,
      imc: 23.3,
      presionArterial: "180/40",
      exploracionFisica: "", //texto html
      motivoConsulta: "",
      sintomas: "", //texto html
      diagnostico: "", //texto html
      receta:
        "<br>2 pastillas de Paracetamol</br> <br>1 tableta de rivotril </br>", //texto html
      examenes: "", //texto html
      proximaCita: "2021-04-30T12:21:21",
    },
  }),
};
</script>