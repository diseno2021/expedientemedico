<template>
  <div class="q-ma-md">
    <div class="row">
      <h4 class="text-h4">Medicamentos Permanentes</h4>
    </div>
      <q-editor v-model="paciente.medicamentosPermanentes"
      :toolbar="[
          ['bold', 'italic', 'strike', 'underline'],
          [
            {
              label: $q.lang.editor.fontSize,
              icon: $q.iconSet.editor.fontSize,
              fixedLabel: true,
              fixedIcon: true,
              list: 'no-icons',
              options: [
                'size-1',
                'size-2',
                'size-3',
                'size-4',
                'size-5',
                'size-6',
                'size-7'
              ]
            },
          ],
      ]"
      min-height="8rem"
      max-height="8rem" />
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

}
</script>

<style>

</style>