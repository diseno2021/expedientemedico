<template>
  <div>
    <q-list bordered class="rounded-borders">
      <q-expansion-item
        expand-separator
        label="Antecedentes"
      >
        <q-card>
          <q-card-section> Hola </q-card-section>
        </q-card>
      </q-expansion-item>

      <q-expansion-item expand-separator label="Medicamentos">
        <q-card>
          <q-card-section> Hola </q-card-section>
        </q-card>
      </q-expansion-item>

      <q-expansion-item
        expand-separator
        label="Consultas"
      >
        <q-card>
          <q-card-section> Hola </q-card-section>
        </q-card>
      </q-expansion-item>

      <q-expansion-item label="Recetas" expand-separator>
        <q-card>
          <q-card-section> Hola </q-card-section>
        </q-card>
      </q-expansion-item>

       <q-expansion-item label="Archivos" expand-separator>
        <q-card>
          <q-card-section> Hola </q-card-section>
        </q-card>
      </q-expansion-item>

       <q-expansion-item label="Peso" expand-separator>
        <q-card>
          <q-card-section> Hola </q-card-section>
        </q-card>
      </q-expansion-item>

    </q-list>
  </div>
</template>

<script>

export default {
  data: () => ({
    paciente: {
      id:"asdfasdfasdfa987asdfasdf76as",
      nombre: "Juan Santiago Perez Lima",
      foto:"https://cdn.quasar.dev/img/avatar6.jpg",
    }
  }),
};
</script>