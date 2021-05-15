<template>
  <div>
      <q-item-section class="q-my-xs" @click="formulario = true">
            Nuevo Paciente
      </q-item-section>
   

    <q-dialog v-model="formulario" :maximized="true">
      <q-card>
         <q-btn icon="close" class="float-right" flat round dense v-close-popup />
         <br>
        <div class="row">
          <br />
          <div style="text-align:center" class="col-md-3 col-xs-12">
          
            <q-img
              v-if="filesImages"
              v-model="filesImages"
              v-bind:src="filesImages"
              contain
               spinner-color="white"
              style="height: 170px; max-width: 300px"
              class="q-my-md rounded-borders q-mx-md q-mx-xs"
            >
              <!-- <q-btn class="float-right" flat @click="filesImages=null">x</q-btn> -->
            </q-img>
          </div>

          <div class="col-md-8 col-xs-11 justify-around">
            <br />
            <q-input
              class="q-mx-md"
              outlined
              v-model="paciente.nombre"
              label="Nombre del paciente"
            ></q-input>
            <br />
            <q-input
              class="q-mx-md"
              outlined
              v-model="paciente.apellido"
              label="Apellidos del paciente"
            ></q-input>
            <br />

            <div class="row">
              <div class="col-5">
                <q-label class="q-mx-md">Sexo:</q-label><br />
                <q-radio
                  class="q-mx-md"
                  v-model="paciente.sexo"
                  label="Masculino"
                  val="masculino"
                >
                </q-radio>
                <br />
                <q-radio
                  class="q-mx-md"
                  v-model="paciente.sexo"
                  label="Femenino"
                  val="femenino"
                >
                </q-radio>
              </div>
              <div class="col-5 ">
                <q-label class="q-mx-md">Fecha de nacimiento:</q-label><br />
                <q-input
                  class="q-mx-md"
                  v-model="paciente.fecha_nacimiento"
                  type="date"
                ></q-input>
              </div>
            </div>
            <q-input
              class="q-mx-md"
              v-model="telefono_num"
              label="Numero telefonico"
              mask="####-####"
              v-on:keydown.enter="paciente.telefonos.push(telefono_num);"
              v-on:keyup.enter="telefono_num = ''"
            >
              <q-btn
                @click.prevent="paciente.telefonos.push(telefono_num)"
               @click="telefono_num = ''"
                text-color="dark"
                flat
              >
                <q-icon name="add"></q-icon> </q-btn
            ></q-input>
            <br />
            <div class="q-mx-md row col-4">
              <q-list  bordered separator v-if="paciente.telefonos.length > 0">
                <q-toolbar class="bg-primary" style="color: white">Numeros telefonicos</q-toolbar>
              
                <q-item  :key="telefono" v-for="telefono in paciente.telefonos">
                  <q-item-section >
                    <q-item-label>
                        {{ telefono }} 
                      <q-btn flat @click="paciente.telefonos.splice(paciente.telefonos.indexOf(telefono),1)">
                        x
                        </q-btn></q-item-label
                    >
                  </q-item-section>
                </q-item>
              </q-list>
            </div>

            <q-input
              class="q-mx-md"
              v-model="paciente.direccion"
              label="Direccion de residencia"
            ></q-input>

            <q-input @keydown.enter="paciente.alergias.push(alergia_input)"
            @keyup.enter="alergia_input = ''" class="q-mx-md" v-model="alergia_input" label="Alergias">
              <q-btn
                @click.prevent="paciente.alergias.push(alergia_input)"
               @click="alergia_input = ''"
                text-color="dark"
                flat
              >
                <q-icon name="add"></q-icon>
              </q-btn>
            </q-input>
            <br />
            <div class="q-mx-md row col-4">
              <q-list bordered separator v-if="paciente.alergias.length > 0">
                <q-toolbar class="bg-primary" style="color: white">Alergias</q-toolbar>
               <q-item :key="alergia" v-for="alergia in paciente.alergias">
                  <q-item-section>
                    <q-item-label
                      >{{ alergia }} 
                      <q-btn flat @click="paciente.alergias.splice(paciente.alergias.indexOf(alergia),1)">
                        x
                        </q-btn></q-item-label
                    >
                  </q-item-section>
                </q-item>
              </q-list>
            </div>

            <q-input
              class="q-mx-md"
              v-model="paciente.encargado"
              label="Persona encargada"
            ></q-input>

            <q-select
              class="q-mx-md"
              v-model="paciente.parentesco_encargado"
              :options="opciones"
              label="Parentesco"
            />
            <q-input
              class="q-mx-md"
              v-model="paciente.observaciones"
              label="Observaciones"
              type="textarea"
            ></q-input>

            <q-checkbox
              class="q-mx-md"
              v-model="checkbox"
              label="He leido y acepto los terminos y condiciones"
            ></q-checkbox>

            <br />
            <q-btn
              class="q-mx-md"
              v-if="checkbox"
              color="primary"
              @click="formulario = false"
              >Registrar</q-btn
            >
            <br />
            <br />
            <br />
          </div>
        </div>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
export default {
  name: "agregar_paciente",
  data() {
    return {
      filesImages: "https://images.vexels.com/media/users/3/153835/isolated/preview/172ddc045ae1707a415adeae0543a5f0-icono-de-trazo-de-color-del-paciente-by-vexels.png",
      filesMaxSize: null,
      filesMaxTotalSize: null,
      filesMaxNumber: null,
      paciente: {
        nombre: "",
        apellido: "",
        sexo: "",
        fecha_nacimiento: "",
        telefonos: [],
        direccion: "",
        alergias: [],
        encargado: "",
        parentesco_encargado: "",
        observaciones: ""
      },
      telefono_num: "",
      checkbox: false,
      alergia_input: "",
      opciones: [
        "Esposa/o",
        "Hermano/a",
        "Tia/o",
        "Hija/o",
        "Padre",
        "Madre",
        "Primo/a"
      ],
      formulario: false
    };
  
  }
};
</script>
