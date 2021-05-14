<template>
  <div class="q-ma-md">
      <h3 class="text-h3">Medicamentos Permanentes</h3>
      <q-editor v-model="paciente.medicamentosPermanentes" :definitions="{
          save: {
          tip: 'Guarda los cambios',
          icon: 'save',
          label: 'Guardar',
          handler: saveWork
        },
      }"
      :toolbar="[
        ['bold', 'italic', 'strike', 'underline'],
        ['upload', 'save']
      ]"
      min-height="10rem" />
  </div>
</template>

<script>
export default {

    data: () => ({
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
          medicamentosPermanentes:"Rivoflavina - una por las noches </br>Simvastatina - una por las noches<br/>", //texto html
          archivos:['http://storage/idpaciente/foto01.jpg&#39;',
          'http://storage/idpaciente/foto01.jpg&#39;',
          ]
          }
    }),
    methods: {
        saveWork () {
            this.$q.notify({
                message: 'Medicamentos permanentes guardados en local storage',
                color: 'green-4',
                textColor: 'white',
                icon: 'cloud_done'
            })
        },
    }

}
</script>

<style>

</style>