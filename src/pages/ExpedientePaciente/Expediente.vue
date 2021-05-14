<template>
  <div>
        <InformacionPersonal id="informacion-personal" />
        <q-separator></q-separator>
        <Antecedentes id="antecedentes" />
        <q-separator></q-separator>
        <MedicamentosPermanentes id="medicamentos-permanentes" />
        <q-separator></q-separator>
        <Consultas id="consultas" />
        <q-separator></q-separator>
        <Recetas id="recetas" />
        <q-separator></q-separator>
        <EnfermedadesCronicas id="enfermedades-cronicas" />
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