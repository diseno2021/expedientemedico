<template>
  <div>
    <div class="row">
      <div class="col-12">
        <InformacionPersonal id="informacion-personal" />
      </div>
    </div>
        <q-separator></q-separator>
    <div class="row">
      <div class="col-12 col-md-6">
        <Antecedentes id="antecedentes" />
      </div>
      <div class="col-12 col-md-6">
        alergias
      </div>
    </div>
        <q-separator></q-separator>
    <div class="row">
      <div class="col-12 col-md-6">
        <MedicamentosPermanentes id="medicamentos-permanentes" />
      </div>
      <div class="col-12 col-md-6">
        <EnfermedadesCronicas id="enfermedades-cronicas" />
      </div>
    </div>

        <q-separator></q-separator>
        <Consultas id="consultas" />
        <q-separator></q-separator>
        <Recetas id="recetas" />
        <q-separator></q-separator>
        <q-separator></q-separator>
        <Examenes id="examenes" />
  </div>
</template>

<script>
import InformacionPersonal from './InformacionPersonal';
import Antecedentes from './Antecedentes';
import MedicamentosPermanentes from './MedicamentosPermanentes';
import Consultas from './Consultas';
import Recetas from './Recetas';
import EnfermedadesCronicas from './EnfermedadesCronicas';
import Examenes from '../testGaleria.vue';
export default {
    components:{
        InformacionPersonal,
        Antecedentes,
        MedicamentosPermanentes,
        Consultas,
        Recetas,
        EnfermedadesCronicas,
        Examenes,
    },
}
</script>

<style>

</style>