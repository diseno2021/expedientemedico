<template>
  <div id="pasar-consulta">
    <div class="row justify-center"><h3 class="text-h3">Nueva Consulta</h3></div>
    <div class="row justify-center">
      <div class="col-md-4">
        <q-input
          class="q-mx-md q-my-md"
          type="number"
          min="0"
          outlined
          suffix="lb"
          v-model="form_data.peso"
          label="peso"
        ></q-input>
        <q-input
          class="q-mx-md q-my-md"
          type="number"
          min="0"
          outlined
          suffix="cm"
          v-model="form_data.estatura"
          label="estatura"
        ></q-input>
      </div>
      <div class="col-md-4">
        <q-input
          class="q-mx-md q-my-md"
          type="number"
          min="0"
          outlined
          suffix="°C"
          v-model="form_data.temperatura"
          label="temperatura"
        ></q-input>
        <q-input
          class="q-mx-md q-my-md"
          type="number"
          min="0"
          outlined
          suffix="kg/m2"
          v-model="form_data.imc"
          label="imc"
        ></q-input>
      </div>
      <div class="col-md-4">
        <q-input
          class="q-mx-md q-my-md"
          type="number"
          min="0"
          outlined
          suffix="mmHg"
          v-model="form_data.presionArterial"
          label="presión"
        ></q-input>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <div class="q-pa-md q-gutter-sm">
          <p>Exploracion fisica</p>
          <q-editor
            v-model="form_data.exploracionFisica"
            min-height="5rem"
          ></q-editor>
          <p>Motivo de Consulta</p>
          <q-editor v-model="form_data.editor" min-height="5rem"></q-editor>
          <p>Sintomas subjetivos</p>
          <q-editor
            v-model="form_data.sintomasSubjetivos"
            min-height="5rem"
          ></q-editor>
          <p>Diagnostigo</p>
          <q-editor v-model="form_data.diagnostico" min-height="5rem"></q-editor>
          <p>Recetas</p>
          <q-editor v-model="form_data.receta" min-height="5rem"></q-editor>
          <p>Examenes</p>
          <q-editor v-model="form_data.examenes" min-height="5rem"></q-editor>
          </div>          
      </div>
    </div>
    <hr />
    <div class="row justify-center items-baseline">
      
      <q-input
        outlined
        class=" q-mb-lg"
        v-model="form_data.proximaCita"
        filled
        type="date"
        hint="Próxima Cita"
      />
      <div class="q-pa-md q-gutter-sm">
        <q-btn color="primary" label="Guardar" to=""></q-btn>
      </div>
    </div>
  </div>
</template>

<script>
import perfil from "components/PasarConsulta/Perfil.vue";
import navegacionConsulta from "components/PasarConsulta/NavegacionConsulta.vue";

export default {
  components: {
    perfil,
    navegacionConsulta
  },
  data() {
    return {
      form_data: {
        id: "",
        idPaciente: "",
        peso: 0,
        estatura: 0,
        temperatura: 0,
        imc: 0,
        presionArterial: 0,
        exploracionFisica: "",
        motivoConsulta: "",
        sintomas: "",
        diagnostico: "",
        receta: "",
        examenes: "",
        editor: "un texto <b>en negrita</b> de ejemplo ",
        exploracionFisica: "Item1 </br> Item2 </br> Item3",
        sintomasSubjetivos: "",
        diagnostico: "",

        proximaCita: undefined
      }
    };
  }
};
</script>

<style scoped></style>
