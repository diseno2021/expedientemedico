<template>
      <div>
        
        <q-list dense padding>
          <q-item clickable v-ripple :to="{hash: '#informacion-personal'}">
            <q-item-section avatar>
              <q-icon name="person" />
            </q-item-section>
            <q-item-section>
              Informacion personal
            </q-item-section>
          </q-item>

          <q-item clickable v-ripple :to="{hash: '#antecedentes'}">
            <q-item-section avatar>
              <q-icon name="book" />
            </q-item-section>
            <q-item-section>
              Antecedentes
            </q-item-section>
          </q-item>
          <q-item clickable v-ripple :to="{hash: '#medicamentos-permanentes'}">
            <q-item-section avatar>
              <q-icon name="medication" />
            </q-item-section>
            <q-item-section>
              Medicamentos permanentes
            </q-item-section>
          </q-item>

          <q-item clickable v-ripple :to="{hash: '#consultas'}">
          <q-item-section avatar>
              <q-icon name="healing" />
            </q-item-section>
            <q-item-section>
              Consultas
            </q-item-section>
          </q-item>

          <q-item clickable v-ripple :to="{hash: '#recetas'}">
          <q-item-section avatar>
              <q-icon name="description" />
            </q-item-section>
            <q-item-section>
              Recetas
            </q-item-section>
          </q-item>

          <q-item clickable v-ripple :to="{hash: '#enfermedades-cronicas'}">
            <q-item-section avatar>
              <q-icon name="local_hospital" />
            </q-item-section>
            <q-item-section>
            Enfermedades cronicas
            </q-item-section>
          </q-item>
        </q-list>
      </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped></style>
