<template>
  <q-page>
    <div class="row">
      <div class="col-12 q-pa-md">
        <div class="row">
          <div class="col-12">
            <q-input
              rounded
              bottom-slots
              v-model="search"
              label="Buscar por nombre"
            >
              <template v-slot:prepend>
                <q-icon name="search" />
              </template>
              <template v-slot:append>
                <q-icon
                  name="close"
                  @click="search = ''"
                  class="cursor-pointer"
                />
              </template>
            </q-input>
          </div>
          <div class="col-12 col-sm-10 col-lg-4 col-md-6">
            <div class="row items-center">
              <div class="col-4">
                Ordenar por:
              </div>
              <div class="col-4">
                <q-select
                  class="inline"
                  rounded
                  v-model="orderBy"
                  :options="orderByOptions"
                  dense
                >
                  <template v-slot:prepend>
                    <q-icon name="event" />
                  </template>
                </q-select>
              </div>
              <div class="col-4">
                <q-btn
                  round
                  color="grey"
                  :icon="
                    orderDescend == true ? 'arrow_downward' : 'arrow_upward'
                  "
                  @click="changeOrder"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-12">
        <div class="row">
          <div
            v-if="$q.screen.width > 599"
            class="col-12"
            v-for="paciente in pacientesFiltrados"
            :key="paciente.id"
          >
            <PacienteDesktop :paciente="paciente" />
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import PacienteDesktop from "../components/PacienteDesktop";
export default {
  name: "PageIndex",
  components: {
    PacienteDesktop
  },
  data: function() {
    return {
      search: "",
      orderBy: "",
      orderByOptions: ["edad", "peso"],
      orderDescend: true,
      pacientes: [
        {
          id: "asasa",
          idMedico: "asdfasd88asd7fas6dfasd", //este campo relaciona al medico al cual pertenece
          nombre: "Juan Santiago Perez Lima",
          fechaNacimiento: "1998-03-06T00:00:00",
          genero: "Masculino",
          peso: [170, 150, 140, 200], //el peso se lleva en un arreglo para poder graficarlo
          estatura: [123, 125, 135],
          foto:
            "https://cdn.pixabay.com/photo/2016/03/09/15/10/man-1246508_960_720.jpg",
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
            "http://storage/idpaciente/foto01.jpg&#39",
            "http://storage/idpaciente/foto01.jpg&#39"
          ]
        },
        {
          id: "asdsd",
          idMedico: "asdfasd88asd7fas6dfasd", //este campo relaciona al medico al cual pertenece
          nombre: "Louis Vincent Frank",
          fechaNacimiento: "1998-03-06T00:00:00",
          genero: "Femenino",
          peso: [170, 150, 140, 180], //el peso se lleva en un arreglo para poder graficarlo
          estatura: [123, 125, 135],
          foto:
            "https://media.istockphoto.com/photos/calm-man-meditating-in-sunny-summer-day-picture-id1215733691",
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
            "http://storage/idpaciente/foto01.jpg&#39",
            "http://storage/idpaciente/foto01.jpg&#39"
          ]
        },
        {
          id: "fgfgf",
          idMedico: "asdfasd88asd7fas6dfasd", //este campo relaciona al medico al cual pertenece
          nombre: "Christopher Ralph Andre",
          fechaNacimiento: "1998-03-06T00:00:00",
          genero: "Masculino",
          peso: [170, 150, 140, 175], //el peso se lleva en un arreglo para poder graficarlo
          estatura: [123, 125, 135],
          foto:
            "https://cdn.pixabay.com/photo/2015/03/03/08/55/portrait-657116_960_720.jpg",
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
            "http://storage/idpaciente/foto01.jpg&#39",
            "http://storage/idpaciente/foto01.jpg&#39"
          ]
        },
        {
          id: "asdas",
          idMedico: "asdfasd88asd7fas6dfasd", //este campo relaciona al medico al cual pertenece
          nombre: "Charles Lukas Abdullah",
          fechaNacimiento: "1998-03-06T00:00:00",
          genero: "Femenino",
          peso: [170, 150, 140, 177], //el peso se lleva en un arreglo para poder graficarlo
          estatura: [123, 125, 135],
          foto:
            "https://cdn.pixabay.com/photo/2016/03/09/15/10/man-1246508_960_720.jpg",
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
            "http://storage/idpaciente/foto01.jpg&#39",
            "http://storage/idpaciente/foto01.jpg&#39"
          ]
        },
        {
          id: "fdsfsdf",
          idMedico: "asdfasd88asd7fas6dfasd", //este campo relaciona al medico al cual pertenece
          nombre: "Matthew Theodore Otto",
          fechaNacimiento: "1997-03-06T00:00:00",
          genero: "Femenino",
          peso: [170, 150, 140, 160], //el peso se lleva en un arreglo para poder graficarlo
          estatura: [123, 125, 135],
          foto:
            "https://cdn.pixabay.com/photo/2014/01/02/04/14/woman-237438_960_720.jpg",
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
            "http://storage/idpaciente/foto01.jpg&#39",
            "http://storage/idpaciente/foto01.jpg&#39"
          ]
        },
        {
          id: "asdasdas",
          idMedico: "asdfasd88asd7fas6dfasd", //este campo relaciona al medico al cual pertenece
          nombre: "William Ricky Ioan",
          fechaNacimiento: "1996-03-06T00:00:00",
          genero: "Femenino",
          peso: [170, 150, 140, 161], //el peso se lleva en un arreglo para poder graficarlo
          estatura: [123, 125, 135],
          foto:
            "https://cdn.pixabay.com/photo/2017/04/05/10/45/girl-2204622_960_720.jpg",
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
            "http://storage/idpaciente/foto01.jpg&#39",
            "http://storage/idpaciente/foto01.jpg&#39"
          ]
        },
        {
          id: "zxczczczx",
          idMedico: "asdfasd88asd7fas6dfasd", //este campo relaciona al medico al cual pertenece
          nombre: "Dewey Ray Robert",
          fechaNacimiento: "1995-03-06T00:00:00",
          genero: "Masculino",
          peso: [170, 150, 140, 162], //el peso se lleva en un arreglo para poder graficarlo
          estatura: [123, 125, 135],
          foto:
            "https://cdn.pixabay.com/photo/2016/11/29/06/08/woman-1867715_960_720.jpg",
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
            "http://storage/idpaciente/foto01.jpg&#39",
            "http://storage/idpaciente/foto01.jpg&#39"
          ]
        },
        {
          id: "asdasdsd",
          idMedico: "asdfasd88asd7fas6dfasd", //este campo relaciona al medico al cual pertenece
          nombre: "Harrison Lee Sara",
          fechaNacimiento: "1994-03-06T00:00:00",
          genero: "Femenino",
          peso: [170, 150, 140, 163], //el peso se lleva en un arreglo para poder graficarlo
          estatura: [123, 125, 135],
          foto:
            "https://cdn.pixabay.com/photo/2016/11/21/14/53/man-1845814_960_720.jpg",
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
            "http://storage/idpaciente/foto01.jpg&#39",
            "http://storage/idpaciente/foto01.jpg&#39"
          ]
        },
        {
          id: "zczxczczx",
          idMedico: "asdfasd88asd7fas6dfasd", //este campo relaciona al medico al cual pertenece
          nombre: "James Marco Mustafa",
          fechaNacimiento: "1993-03-06T00:00:00",
          genero: "Masculino",
          peso: [170, 150, 140, 164], //el peso se lleva en un arreglo para poder graficarlo
          estatura: [123, 125, 135],
          foto:
            "https://cdn.pixabay.com/photo/2019/11/03/20/11/portrait-4599553_960_720.jpg",
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
            "http://storage/idpaciente/foto01.jpg&#39",
            "http://storage/idpaciente/foto01.jpg&#39"
          ]
        },
        {
          id: "sdasdasdas",
          idMedico: "asdfasd88asd7fas6dfasd", //este campo relaciona al medico al cual pertenece
          nombre: "Richard Mark Georgie",
          fechaNacimiento: "1992-03-06T00:00:00",
          genero: "Femenino",
          peso: [170, 150, 140, 165], //el peso se lleva en un arreglo para poder graficarlo
          estatura: [123, 125, 135],
          foto:
            "https://cdn.pixabay.com/photo/2016/11/22/21/42/woman-1850703_960_720.jpg",
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
            "http://storage/idpaciente/foto01.jpg&#39",
            "http://storage/idpaciente/foto01.jpg&#39"
          ]
        },
        {
          id: "hjghh",
          idMedico: "asdfasd88asd7fas6dfasd", //este campo relaciona al medico al cual pertenece
          nombre: "David Cory Dean",
          fechaNacimiento: "1991-03-06T00:00:00",
          genero: "Masculino",
          peso: [170, 150, 140, 166], //el peso se lleva en un arreglo para poder graficarlo
          estatura: [123, 125, 135],
          foto:
            "https://cdn.pixabay.com/photo/2020/08/21/08/46/african-5505598_960_720.jpg",
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
            "http://storage/idpaciente/foto01.jpg&#39",
            "http://storage/idpaciente/foto01.jpg&#39"
          ]
        },
        {
          id: "zxczczczxc",
          idMedico: "asdfasd88asd7fas6dfasd", //este campo relaciona al medico al cual pertenece
          nombre: "Joshua Walter Tommy ",
          fechaNacimiento: "1990-03-06T00:00:00",
          genero: "Femenino",
          peso: [170, 150, 140, 167], //el peso se lleva en un arreglo para poder graficarlo
          estatura: [123, 125, 135],
          foto:
            "https://cdn.pixabay.com/photo/2018/08/23/22/29/girl-3626901_960_720.jpg",
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
            "http://storage/idpaciente/foto01.jpg&#39",
            "http://storage/idpaciente/foto01.jpg&#39"
          ]
        },
        {
          id: "zzxczxczczxc",
          idMedico: "asdfasd88asd7fas6dfasd", //este campo relaciona al medico al cual pertenece
          nombre: "Jack Shawn Edwin",
          fechaNacimiento: "1979-03-06T00:00:00",
          genero: "Masculino",
          peso: [170, 150, 140, 168], //el peso se lleva en un arreglo para poder graficarlo
          estatura: [123, 125, 135],
          foto:
            "https://cdn.pixabay.com/photo/2017/04/06/19/34/girl-2209147_960_720.jpg",
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
            "http://storage/idpaciente/foto01.jpg&#39",
            "http://storage/idpaciente/foto01.jpg&#39"
          ]
        },
        {
          id: "asdasdasdas",
          idMedico: "asdfasd88asd7fas6dfasd", //este campo relaciona al medico al cual pertenece
          nombre: "Michael Frazer Terry",
          fechaNacimiento: "1976-03-06T00:00:00",
          genero: "Femenino",
          peso: [170, 150, 140, 168], //el peso se lleva en un arreglo para poder graficarlo
          estatura: [123, 125, 135],
          foto:
            "https://cdn.pixabay.com/photo/2020/07/08/19/13/girl-5384878_960_720.jpg",
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
            "http://storage/idpaciente/foto01.jpg&#39",
            "http://storage/idpaciente/foto01.jpg&#39"
          ]
        },
        {
          id: "czxczczxc",
          idMedico: "asdfasd88asd7fas6dfasd", //este campo relaciona al medico al cual pertenece
          nombre: "Nathan Maxwell Elias",
          fechaNacimiento: "1971-03-06T00:00:00",
          genero: "Masculino",
          peso: [170, 150, 140, 170], //el peso se lleva en un arreglo para poder graficarlo
          estatura: [123, 125, 135],
          foto:
            "https://cdn.pixabay.com/photo/2016/11/10/12/35/model-1814202_960_720.jpg",
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
            "http://storage/idpaciente/foto01.jpg&#39",
            "http://storage/idpaciente/foto01.jpg&#39"
          ]
        },
        {
          id: "asdasdasdad",
          idMedico: "asdfasd88asd7fas6dfasd", //este campo relaciona al medico al cual pertenece
          nombre: "Harry Maya Ivan",
          fechaNacimiento: "1960-03-06T00:00:00",
          genero: "Femenino",
          peso: [170, 150, 140, 135], //el peso se lleva en un arreglo para poder graficarlo
          estatura: [123, 125, 135],
          foto:
            "https://cdn.pixabay.com/photo/2017/07/07/12/41/beauty-2481372_960_720.jpg",
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
            "http://storage/idpaciente/foto01.jpg&#39",
            "http://storage/idpaciente/foto01.jpg&#39"
          ]
        },
        {
          id: "zczczczxc",
          idMedico: "asdfasd88asd7fas6dfasd", //este campo relaciona al medico al cual pertenece
          nombre: "Benjamin Cleo Marvin",
          fechaNacimiento: "1998-03-06T00:00:00",
          genero: "Femenino",
          peso: [170, 150, 140, 189], //el peso se lleva en un arreglo para poder graficarlo
          estatura: [123, 125, 135],
          foto:
            "https://cdn.pixabay.com/photo/2016/03/09/15/10/man-1246508_960_720.jpg",
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
            "http://storage/idpaciente/foto01.jpg&#39",
            "http://storage/idpaciente/foto01.jpg&#39"
          ]
        },
        {
          id: "sdasdasdasd",
          idMedico: "asdfasd88asd7fas6dfasd", //este campo relaciona al medico al cual pertenece
          nombre: "Muhammad Fraser Gregory",
          fechaNacimiento: "1998-03-06T00:00:00",
          genero: "Femenino",
          peso: [170, 150, 140, 190], //el peso se lleva en un arreglo para poder graficarlo
          estatura: [123, 125, 135],
          foto:
            "https://cdn.pixabay.com/photo/2017/05/12/11/29/girl-2306829_960_720.jpg",
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
            "http://storage/idpaciente/foto01.jpg&#39",
            "http://storage/idpaciente/foto01.jpg&#39"
          ]
        },
        {
          id: "zczczczxczx",
          idMedico: "asdfasd88asd7fas6dfasd", //este campo relaciona al medico al cual pertenece
          nombre: "Aaron Jason Yasin",
          fechaNacimiento: "1998-03-06T00:00:00",
          genero: "Masculino",
          peso: [170, 150, 140, 192], //el peso se lleva en un arreglo para poder graficarlo
          estatura: [123, 125, 135],
          foto:
            "https://cdn.pixabay.com/photo/2016/03/09/15/10/man-1246508_960_720.jpg",
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
            "http://storage/idpaciente/foto01.jpg&#39",
            "http://storage/idpaciente/foto01.jpg&#39"
          ]
        },
        {
          id: "asdfasdfasdfa987asdfasdf76as",
          idMedico: "asdfasd88asd7fas6dfasd", //este campo relaciona al medico al cual pertenece
          nombre: "Thomas Roosevelt Oscar",
          fechaNacimiento: "1998-03-06T00:00:00",
          genero: "Femenino",
          peso: [170, 150, 140, 196], //el peso se lleva en un arreglo para poder graficarlo
          estatura: [123, 125, 135],
          foto:
            "https://cdn.pixabay.com/photo/2016/03/09/15/10/man-1246508_960_720.jpg",
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
            "http://storage/idpaciente/foto01.jpg&#39",
            "http://storage/idpaciente/foto01.jpg&#39"
          ]
        }
      ]
    };
  },
  methods: {
    changeOrder() {
      this.orderDescend = !this.orderDescend;
    },
    getEdad(date) {
      var hoy = new Date();
      var cumpleanos = new Date(date);
      var edad = hoy.getFullYear() - cumpleanos.getFullYear();
      var m = hoy.getMonth() - cumpleanos.getMonth();

      if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
        edad--;
      }
      return edad;
    }
  },
  computed: {
    pacientesFiltrados() {
      if (this.search == "" && this.orderBy == "") {
        //sin ordenar sin filtrar
        return this.pacientes;
      } else if (this.search == "" && this.orderBy != "") {
        //con ordenar sin fintrar
        var ordenado = [];
        if (this.orderBy == "edad" && this.orderDescend==false) {
          ordenado = this.pacientes.sort((p1, p2)=>  {
            return this.getEdad(p1.fechaNacimiento)-this.getEdad(p2.fechaNacimiento); //de menor a mayor
          });
        } else if (this.orderBy == "edad"  && this.orderDescend==true) {
           ordenado = this.pacientes.sort((p1, p2)=>  {
            return this.getEdad(p2.fechaNacimiento)-this.getEdad(p1.fechaNacimiento); //de mayor a menor
          });
        }

        if (this.orderBy == "peso" && this.orderDescend==false) {
          ordenado = this.pacientes.sort((p1, p2)=>  {
            return p1[p1.peso.length - 1]-p2[p2.peso.length - 1]; //de menor a mayor
          });
        } else if (this.orderBy == "peso"  && this.orderDescend==true) {
           ordenado = this.pacientes.sort((p1, p2)=>  {
            return p2[p2.peso.length - 1]-p1[p1.peso.length - 1]; //de mayor a menor
          });
        }
        return ordenado;
      } else if (this.search != "" && this.orderBy != "") {
        //con ordenar con filtrar
        var filtrado = [];
        filtrado = this.pacientes.filter(p => p.nombre.includes(this.search));
        var ordenado = [];
        if (this.orderBy == "edad" && this.orderDescend==false) {
          ordenado = filtrado.sort((p1, p2)=>  {
            return this.getEdad(p1.fechaNacimiento)-this.getEdad(p2.fechaNacimiento); //de menor a mayor
          });
        } else if (this.orderBy == "edad"  && this.orderDescend==true) {
           ordenado = filtrado.sort((p1, p2)=>  {
            return this.getEdad(p2.fechaNacimiento)-this.getEdad(p1.fechaNacimiento); //de mayor a menor
          });
        }

        if (this.orderBy == "peso" && this.orderDescend==false) {
          ordenado = filtrado.sort((p1, p2)=>  {
            return p1.peso-p2.peso; //de menor a mayor
          });
        } else if (this.orderBy == "peso"  && this.orderDescend==true) {
           ordenado = filtrado.sort((p1, p2)=>  {
            return p2.peso-p1.peso; //de mayor a menor
          });
        }
        return ordenado;
      } else if (this.search != "" && this.orderBy == "") {
        //sin ordenar con filtrar
        var filtrado = [];
        filtrado = this.pacientes.filter(p => p.nombre.includes(this.search));
        return filtrado;
      }
    }
  }
};
</script>
