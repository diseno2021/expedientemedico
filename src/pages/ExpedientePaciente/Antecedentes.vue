<template>
  <div class="q-ma-md">
    <div class="row">
      <div class="col-12">
      <h3 class="text-h3">Antecedentes</h3>
        <q-editor v-model="paciente.antecedentes" min-height="5rem" />
        <q-btn class="q-mt-sm">Guardar</q-btn>
      </div>
    </div>
  </div>
</template>

<script>
import BannerPrincipal from "./../../components/ExpedientePaciente/BannerPrincipal";

export default {
  data() {
    return {
      paciente: { id:"asdfasdfasdfa987asdfasdf76as",
          idMedico:"asdfasd88asd7fas6dfasd", //este campo relaciona al medico al cual pertenece
          nombre: "Juan Santiago Perez Lima",
          fechaNacimiento: "1998-03-06T00:00:00",
          genero:"Masculino",
          peso:[170,150,140,135], //el peso se lleva en un arreglo para poder graficarlo
          estatura:[123,125,135],
          foto:"http://storage/123231.jpg&quot;",
          tipoSangre:"O RH+",
          direccion:"Final avenida fray felipe de jesus moraga casa #23",
          telefono:"7366-2344",
          dui:"",
          whatsapp:"1242-1234",
          email:"paciente@outlook.com",
          enCasoEmergencia:"Esposa Juana Salazar 7346454",
          comentario:"",
          antecedentes:"Padre diabético<br> Tía materna hipertensa", //texto html
          alergias:"Penicilina Procainica, picadas de abejas",
          enfermedadesCronicas:"Cancer de Seno, Diabetes tipo 2", //texto html
          medicamentosPermanentes:"<br>Rivoflavina</br> una por las noches", //texto html
          archivos:['http://storage/idpaciente/foto01.jpg&#39;',
          'http://storage/idpaciente/foto01.jpg&#39;',
          ]
          }
    };
  },
  components: {
    BannerPrincipal
  }
};
</script>

<style lang="scss" scoped></style>
