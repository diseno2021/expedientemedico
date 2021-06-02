<template>
  <div>
  <div class="q-pa-md">
    <q-card flat>
      <q-card-section>
        <div class="row justify-center q-pb-xs">
          <q-avatar square rounded size="85px" class="q-mx-auto">
            <img :src="paciente.foto" />
          </q-avatar>
        </div>
        <div class="text-h6 q-pb-xs">{{ paciente.nombre }}</div>      
      </q-card-section>
      
    </q-card>
  </div>
  <div class="q-pa-md" style="max-width: 350px">
    <q-list >
      <q-expansion-item
        icon="book"
        expand-separator
        group="somegroup"
        label="Antecedentes"
        class="overflow-hidden"
        
      >
        <q-card class="bg-grey-3">
          <q-card-section v-html="paciente.antecedentes"> </q-card-section>
        </q-card>
      </q-expansion-item>

      <q-expansion-item
        icon="medication"
        group="somegroup"
        expand-separator
        label="Medicamentos Permantentes"
        class=" overflow-hidden"
       
        
      >
        <q-card class="bg-grey-3">
          <q-card-section v-html="paciente.medicamentosPermanentes">
          </q-card-section>
        </q-card>
      </q-expansion-item>

      <q-expansion-item
        icon="healing"
        group="somegroup"
        expand-separator
        label="Consultas"
        class=" overflow-hidden"
        header-class="claseheader"
      >
        <q-card class="bg-grey-3">
          <q-card-section>
        <div class="text-h6">05-23-2021</div>
        <div class="text-subtitle2">fecha de ultima consulta</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        Este es el diagnostico de la ultima consulta con el paciente
        puede ser extenso como se desee
      </q-card-section>
        </q-card>
      </q-expansion-item>

      <q-expansion-item
        icon="description"
        group="somegroup"
        label="Recetas"
        expand-separator
        class=" overflow-hidden"
        header-class="claseheader"
      >
        <q-card class="bg-grey-3"> 
          <q-card-section>
        <div class="text-h6">05-23-2021</div>
        <div class="text-subtitle2">Receta de la ultima consulta</div>
        
      </q-card-section>
     
          <q-card-section v-html="consultas.receta"> </q-card-section>
        </q-card>
      </q-expansion-item>

      <q-expansion-item
        icon="collections"
        group="somegroup"
        label="Archivos"
        expand-separator
        class=" overflow-hidden"
        header-class="claseheader"
      >
        <q-card class="bg-grey-3">
          <!-- Dejamos nuestro componente, nos deben pasar el id del paciente en la propiedad :idPaciente="" -->
          <q-card-section> <testGaleriaComponent idPaciente="asdfasdfasdfa987asdfasdf76aw" /> </q-card-section>
        </q-card>
      </q-expansion-item>

      <q-expansion-item
        icon="monitor_weight"
        group="somegroup"
        label="Peso"
        expand-separator
        class=" overflow-hidden"
        header-class="claseheader"
        active="bg-teal text-white"
      >
        <q-card class="bg-grey-3">
          <q-card-section>
            <center>
              <img
                src="https://www.enpeso.com/wp-content/uploads/2016/06/graf-peso.png"
                style="height: 200px; max-width: 200px"
              />
            </center>
          </q-card-section>
        </q-card>
      </q-expansion-item>
      <br>
      <div class="column align-center ">
        <q-input filled type="date" stack-label label="Próxima Cita" />
        <br>
        <q-btn color="primary" label="Guardar" to="/paciente"></q-btn>
        <br>
        <q-btn
          color="secondary"          
          label="Cancelar consulta"
          class="full-width"
          to="/paciente"
        ></q-btn>
      </div>
      
    </q-list>
  </div>
  </div>
</template>

<script>
import TestGaleriaComponent from 'src/pages/testGaleriaComponent.vue';

export default {
  components: {
    TestGaleriaComponent
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
      antecedentes: `
      <ul>
      <li>
      Padre diabético
      </li>
      <li>
      Tía materna hipertensa
      </li>
      </ul>
      `, //texto html
      alergias: "Penicilina Procainica, picadas de abejas",
      enfermedadesCronicas: "Cancer de Seno, Diabetes tipo 2", //texto html
      medicamentosPermanentes: `
        <ul>
        <li>
          <strong>Rivoflavina</strong>
          </br> una por las noches
        </li>
        </ul>`, //texto html
      archivos: [
        "http://storage/idpaciente/foto01.jpg&#39;",
        "http://storage/idpaciente/foto01.jpg&#39;"
      ]
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
      receta: `
        <ul>
        <li>
        2 pastillas de Paracetamol
        </li>
        <li>
        1 tableta de rivotril 
        </li>
        </ul>
        `, //texto html
      examenes: "", //texto html
      proximaCita: "2021-04-30T12:21:21"
    }
  })
};
</script>
