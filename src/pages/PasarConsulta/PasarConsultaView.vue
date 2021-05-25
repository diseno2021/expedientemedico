<template>
  <div id="pasar-consulta">   
        <div class="row justify-center">
      <h3 class="text-h3" style="line-height:0rem" >Nueva Consulta</h3> 
      </div>
    <div class="row justify-center" >
      
        <q-input
          class="q-mx-md q-my-md "
          type="number"
          min="0"
          outlined
          suffix="lb"
          v-model="form_data.peso"
          label="peso"
          style="max-width: 7rem; min-width: 5rem"
        ></q-input>
      
      
        <q-input
          class="q-mx-md q-my-md"
          type="number"
          min="0"
          outlined
          suffix="cm"
          v-model="form_data.estatura"
          label="estatura"
          style="max-width: 7rem; min-width: 5rem"
        ></q-input>
      
        <q-input
          class="q-mx-md q-my-md"
          type="number"
          min="0"
          outlined
          suffix="°C"
          v-model="form_data.temperatura"
          label="temperatura"
          style="max-width: 7rem; min-width: 5rem"
        ></q-input>
     
        <q-input
          class="q-mx-md q-my-md"
          type="number"
          min="0"
          outlined
          suffix="kg/m2"
          v-model="form_data.imc"
          label="imc"
          style="max-width: 7rem; min-width: 5rem"
        ></q-input>
      
      
        <q-input
          class="q-mx-md q-my-md"
          type="number"
          min="0"
          outlined
          suffix="mmHg"
          v-model="form_data.presionArterial"
          label="presión"
          style="width: 7rem; min-width: 5rem"
        ></q-input>
      
    </div>
    <div class="row justify-center">
      <div class="col-md-6">
        <div class="q-pa-md q-gutter-sm">
          <p>Motivo de Consulta</p>
          <q-input filled v-model="form_data.motivoConsulta" label="Motivo de consulta" 
          type="textarea" /> 

          <p>Sintomas subjetivos</p>
          <q-editor
            :toolbar="toolbar"
            v-model="form_data.sintomasSubjetivos"
            min-height="7rem"
          ></q-editor>
          <p>Diagnostico</p>
          <q-editor
            :toolbar="toolbar"
            v-model="form_data.diagnostico"
            min-height="7rem"
          ></q-editor>
        </div>
      </div>
      <div class="col-md-6">
        <div class="q-pa-md q-gutter-sm">
          <p>Exploracion fisica</p>
          <q-editor
            :toolbar="toolbar"
            v-model="form_data.exploracionFisica"
            min-height="7rem"
          ></q-editor>
          <p>Examenes</p>
          <q-editor
            :toolbar="toolbar"
            v-model="form_data.examenes"
            min-height="7rem"
          ></q-editor>

          <p>Recetas</p>
          <q-editor
            :toolbar="toolbar"
            v-model="form_data.receta"
            min-height="7rem"
          ></q-editor>
        </div>
      </div>
    </div>
    

    <hr class="lt-md" />
    
    <div class="row justify-center items-baseline lt-md ">
      <q-input
        outlined
        class=" q-mb-lg"
        v-model="form_data.proximaCita"
        filled
        type="date"
        label="Próxima Cita"
        stack-label
      />
      <div class="q-pa-md q-gutter-sm">
        
        <q-btn color="primary" label="Guardar" to="paciente"></q-btn>
      </div>
    </div>
  </div>
</template>

<script>
import perfil from "components/PasarConsulta/Perfil.vue";
import navegacionConsulta from "components/PasarConsulta/NavegacionConsulta.vue";
import Examenes from "pages/testGaleriaComponent.vue";

export default {
  components: {
    perfil,
    navegacionConsulta,
    Examenes
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
        diagnostico: "",

        proximaCita: undefined
      },
      toolbar: [
        ["bold", "italic", "strike", "underline"],
        ["unordered", "ordered", "outdent", "indent"]      
      ]
    };
  }
};
</script>

<style scoped></style>
