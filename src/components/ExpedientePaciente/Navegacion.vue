<template>
    <div>
        <q-drawer show-if-above bordered side="right">
      <div>
        <q-list dense padding>
          <q-item clickable v-ripple to="/paciente/informacion-personal">
            <q-item-section>
              Información personal
            </q-item-section>
          </q-item>

          <q-item clickable v-ripple to="/paciente/antecedentes">
            <q-item-section>
              Antecedentes
            </q-item-section>
          </q-item>

          <q-item clickable v-ripple to="/paciente/medicamentos-permanentes">
            <q-item-section>
              Medicamentos permanentes
            </q-item-section>
          </q-item>

          <q-item clickable v-ripple to="/paciente/consultas">
            <q-item-section>
              Consultas
            </q-item-section>
          </q-item>

          <q-item clickable v-ripple to="/paciente/recetas">
            <q-item-section>
              Recetas
            </q-item-section>
          </q-item>

          <q-item clickable v-ripple to="/pacientes/archivos">
            <q-item-section>
              Archivos
            </q-item-section>
          </q-item>
        </q-list>


      </div>
    </q-drawer>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style lang="scss" scoped>

</style>