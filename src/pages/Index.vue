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
                <q-btn round color="grey" :icon="orderDescend==true?'arrow_downward':'arrow_upward'" @click="changeOrder" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-12">
        <div class="row">
          <div
           v-if="$q.screen.width>599"
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
    PacienteDesktop,
  },
  data: function () {
    return {
      search: "",
      orderBy:"",
      orderByOptions:["edad","genero","estatura","peso"],
      orderDescend:true,
      pacientes: [
        {
          id: "asasa",
          idMedico: "asdfasd88asd7fas6dfasd", //este campo relaciona al medico al cual pertenece
          nombre: "Juan Santiago Perez Lima",
          fechaNacimiento: "1998-03-06T00:00:00",
          genero: "Masculino",
          peso: [170, 150, 140, 135], //el peso se lleva en un arreglo para poder graficarlo
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
            "http://storage/idpaciente/foto01.jpg&#39",
          ],
        },
        {
          id: "asdsd",
          idMedico: "asdfasd88asd7fas6dfasd", //este campo relaciona al medico al cual pertenece
          nombre: "Louis Vincent Frank",
          fechaNacimiento: "1998-03-06T00:00:00",
          genero: "Femenino",
          peso: [170, 150, 140, 135], //el peso se lleva en un arreglo para poder graficarlo
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
            "http://storage/idpaciente/foto01.jpg&#39",
          ],
        },
        {
          id: "fgfgf",
          idMedico: "asdfasd88asd7fas6dfasd", //este campo relaciona al medico al cual pertenece
          nombre: "Christopher Ralph Andre",
          fechaNacimiento: "1998-03-06T00:00:00",
          genero: "Masculino",
          peso: [170, 150, 140, 135], //el peso se lleva en un arreglo para poder graficarlo
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
            "http://storage/idpaciente/foto01.jpg&#39",
          ],
        },
        {
          id: "asdas",
          idMedico: "asdfasd88asd7fas6dfasd", //este campo relaciona al medico al cual pertenece
          nombre: "Charles Lukas Abdullah",
          fechaNacimiento: "1998-03-06T00:00:00",
          genero: "Femenino",
          peso: [170, 150, 140, 135], //el peso se lleva en un arreglo para poder graficarlo
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
            "http://storage/idpaciente/foto01.jpg&#39",
          ],
        },
        {
          id: "fdsfsdf",
          idMedico: "asdfasd88asd7fas6dfasd", //este campo relaciona al medico al cual pertenece
          nombre: "Matthew Theodore Otto",
          fechaNacimiento: "1997-03-06T00:00:00",
          genero: "Femenino",
          peso: [170, 150, 140, 135], //el peso se lleva en un arreglo para poder graficarlo
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
            "http://storage/idpaciente/foto01.jpg&#39",
          ],
        },
        {
          id: "asdasdas",
          idMedico: "asdfasd88asd7fas6dfasd", //este campo relaciona al medico al cual pertenece
          nombre: "William Ricky Ioan",
          fechaNacimiento: "1996-03-06T00:00:00",
          genero: "Femenino",
          peso: [170, 150, 140, 135], //el peso se lleva en un arreglo para poder graficarlo
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
            "http://storage/idpaciente/foto01.jpg&#39",
          ],
        },
        {
          id: "zxczczczx",
          idMedico: "asdfasd88asd7fas6dfasd", //este campo relaciona al medico al cual pertenece
          nombre: "Dewey Ray Robert",
          fechaNacimiento: "1995-03-06T00:00:00",
          genero: "Masculino",
          peso: [170, 150, 140, 135], //el peso se lleva en un arreglo para poder graficarlo
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
            "http://storage/idpaciente/foto01.jpg&#39",
          ],
        },
        {
          id: "asdasdsd",
          idMedico: "asdfasd88asd7fas6dfasd", //este campo relaciona al medico al cual pertenece
          nombre: "Harrison Lee Sara",
          fechaNacimiento: "1994-03-06T00:00:00",
          genero: "Femenino",
          peso: [170, 150, 140, 135], //el peso se lleva en un arreglo para poder graficarlo
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
            "http://storage/idpaciente/foto01.jpg&#39",
          ],
        },
        {
          id: "zczxczczx",
          idMedico: "asdfasd88asd7fas6dfasd", //este campo relaciona al medico al cual pertenece
          nombre: "James Marco Mustafa",
          fechaNacimiento: "1993-03-06T00:00:00",
          genero: "Masculino",
          peso: [170, 150, 140, 135], //el peso se lleva en un arreglo para poder graficarlo
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
            "http://storage/idpaciente/foto01.jpg&#39",
          ],
        },
        {
          id: "sdasdasdas",
          idMedico: "asdfasd88asd7fas6dfasd", //este campo relaciona al medico al cual pertenece
          nombre: "Richard Mark Georgie",
          fechaNacimiento: "1992-03-06T00:00:00",
          genero: "Femenino",
          peso: [170, 150, 140, 135], //el peso se lleva en un arreglo para poder graficarlo
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
            "http://storage/idpaciente/foto01.jpg&#39",
          ],
        },
        {
          id: "hjghh",
          idMedico: "asdfasd88asd7fas6dfasd", //este campo relaciona al medico al cual pertenece
          nombre: "David Cory Dean",
          fechaNacimiento: "1991-03-06T00:00:00",
          genero: "Masculino",
          peso: [170, 150, 140, 135], //el peso se lleva en un arreglo para poder graficarlo
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
            "http://storage/idpaciente/foto01.jpg&#39",
          ],
        },
        {
          id: "zxczczczxc",
          idMedico: "asdfasd88asd7fas6dfasd", //este campo relaciona al medico al cual pertenece
          nombre: "Joshua Walter Tommy ",
          fechaNacimiento: "1990-03-06T00:00:00",
          genero: "Femenino",
          peso: [170, 150, 140, 135], //el peso se lleva en un arreglo para poder graficarlo
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
            "http://storage/idpaciente/foto01.jpg&#39",
          ],
        },
        {
          id: "zzxczxczczxc",
          idMedico: "asdfasd88asd7fas6dfasd", //este campo relaciona al medico al cual pertenece
          nombre: "Jack Shawn Edwin",
          fechaNacimiento: "1979-03-06T00:00:00",
          genero: "Masculino",
          peso: [170, 150, 140, 135], //el peso se lleva en un arreglo para poder graficarlo
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
            "http://storage/idpaciente/foto01.jpg&#39",
          ],
        },
        {
          id: "asdasdasdas",
          idMedico: "asdfasd88asd7fas6dfasd", //este campo relaciona al medico al cual pertenece
          nombre: "Michael Frazer Terry",
          fechaNacimiento: "1976-03-06T00:00:00",
          genero: "Femenino",
          peso: [170, 150, 140, 135], //el peso se lleva en un arreglo para poder graficarlo
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
            "http://storage/idpaciente/foto01.jpg&#39",
          ],
        },
        {
          id: "czxczczxc",
          idMedico: "asdfasd88asd7fas6dfasd", //este campo relaciona al medico al cual pertenece
          nombre: "Nathan Maxwell Elias",
          fechaNacimiento: "1971-03-06T00:00:00",
          genero: "Masculino",
          peso: [170, 150, 140, 135], //el peso se lleva en un arreglo para poder graficarlo
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
            "http://storage/idpaciente/foto01.jpg&#39",
          ],
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
            "http://storage/idpaciente/foto01.jpg&#39",
          ],
        },
        {
          id: "zczczczxc",
          idMedico: "asdfasd88asd7fas6dfasd", //este campo relaciona al medico al cual pertenece
          nombre: "Benjamin Cleo Marvin",
          fechaNacimiento: "1998-03-06T00:00:00",
          genero: "Femenino",
          peso: [170, 150, 140, 135], //el peso se lleva en un arreglo para poder graficarlo
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
            "http://storage/idpaciente/foto01.jpg&#39",
          ],
        },
        {
          id: "sdasdasdasd",
          idMedico: "asdfasd88asd7fas6dfasd", //este campo relaciona al medico al cual pertenece
          nombre: "Muhammad Fraser Gregory",
          fechaNacimiento: "1998-03-06T00:00:00",
          genero: "Femenino",
          peso: [170, 150, 140, 135], //el peso se lleva en un arreglo para poder graficarlo
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
            "http://storage/idpaciente/foto01.jpg&#39",
          ],
        },
        {
          id: "zczczczxczx",
          idMedico: "asdfasd88asd7fas6dfasd", //este campo relaciona al medico al cual pertenece
          nombre: "Aaron Jason Yasin",
          fechaNacimiento: "1998-03-06T00:00:00",
          genero: "Masculino",
          peso: [170, 150, 140, 135], //el peso se lleva en un arreglo para poder graficarlo
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
            "http://storage/idpaciente/foto01.jpg&#39",
          ],
        },
        {
          id: "asdfasdfasdfa987asdfasdf76as",
          idMedico: "asdfasd88asd7fas6dfasd", //este campo relaciona al medico al cual pertenece
          nombre: "Thomas Roosevelt Oscar",
          fechaNacimiento: "1998-03-06T00:00:00",
          genero: "Femenino",
          peso: [170, 150, 140, 135], //el peso se lleva en un arreglo para poder graficarlo
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
            "http://storage/idpaciente/foto01.jpg&#39",
          ],
        },
      ],
    };
  },
  methods: {
    changeOrder(){
      this.orderDescend=!this.orderDescend;
    }
  },
  computed: {
    pacientesFiltrados() {
      if (this.search == "" && this.orderBy!="") {
        return this.pacientes;
      } else {
        if(this.orderBy==""){
          var filtrado = [];
          filtrado = this.pacientes.filter((p) => p.nombre.includes(this.search));
          return filtrado;
        }else{
          var filtrado = [];
          filtrado = this.pacientes.filter((p) => p.nombre.includes(this.search));
          return filtrado.sort((a,b)=>{
            if(a.edad>b.edad){
              return 1;
            }
            if(a.edad<b.edad){
              return -1;
            }
            return 0
          });
        }

      }
    },
  },
};
</script>
