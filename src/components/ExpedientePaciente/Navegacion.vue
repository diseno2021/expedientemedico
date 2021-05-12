<template>
      <div>
        <q-list dense padding>
          <q-item clickable v-ripple to="/paciente/informacion-personal">
            <q-item-section avatar>
              <q-icon name="person" />
            </q-item-section>
            <q-item-section>
              Información personal
            </q-item-section>
          </q-item>

          <q-item clickable v-ripple to="/paciente/antecedentes">
            <q-item-section avatar>
              <q-icon name="book" />
            </q-item-section>
            <q-item-section>
              Antecedentes
            </q-item-section>
          </q-item>

          <q-item clickable v-ripple to="/paciente/medicamentos-permanentes">
            <q-item-section avatar>
              <q-icon name="medication" />
            </q-item-section>
            <q-item-section>
              Medicamentos permanentes
            </q-item-section>
          </q-item>

          <q-item clickable v-ripple to="/paciente/consultas">
          <q-item-section avatar>
              <q-icon name="healing" />
            </q-item-section>
            <q-item-section>
              Consultas
            </q-item-section>
          </q-item>

          <q-item clickable v-ripple to="/paciente/recetas">
          <q-item-section avatar>
              <q-icon name="description" />
            </q-item-section>
            <q-item-section>
              Recetas
            </q-item-section>
          </q-item>

          <q-item clickable v-ripple to="/paciente/enfermedades-cronicas">
            <q-item-section avatar>
              <q-icon name="local_hospital" />
            </q-item-section>
            <q-item-section>
              Enfermedades Cronicas
            </q-item-section>
          </q-item>
        </q-list>
      </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped></style>
