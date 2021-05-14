<template>
  <div>
        <InformacionPersonal id="informacion-personal" />
        <Antecedentes id="antecedentes" />
        <MedicamentosPermanentes id="medicamentos-permanentes" />
        <Consultas id="consultas" />
        <Recetas id="recetas" />
        <EnfermedadesCronicas id="enfermedades-cronicas" />
  </div>
</template>

<script>
import InformacionPersonal from './InformacionPersonal';
import Antecedentes from './Antecedentes';
import MedicamentosPermanentes from './MedicamentosPermanentes';
import Consultas from './Consultas';
import Recetas from './Recetas';
import EnfermedadesCronicas from './EnfermedadesCronicas';
export default {
    components:{
        InformacionPersonal,
        Antecedentes,
        MedicamentosPermanentes,
        Consultas,
        Recetas,
        EnfermedadesCronicas,
    },
}
</script>

<style>

</style>