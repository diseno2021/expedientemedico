<template>
    <div>
      <q-card flat>
        <q-card-section>
          <div class="row justify-center q-pb-xs">
            <q-avatar square rounded size="85px" class="q-mx-auto">
                <img :src="paciente.foto" />
              </q-avatar>
          </div>
              <div class="text-h6 q-pb-xs">{{ paciente.nombre }}</div>
              <div class="text-caption text-grey-7 q-pb-sm">Id: {{ paciente.id }}</div>
              <q-btn
                color="secondary"
                icon="medical_services"
                label="Nueva Consulta"
                class="full-width"
                to="/pasar-consulta"
              >
              </q-btn>
        </q-card-section>
      </q-card>
    </div>
</template>

<script>
export default {
  data: () => ({
    paciente: {
      id: "asdfasdfasdfa987asdfasdf76as",
      nombre: "Juan Santiago Perez Lima",
      foto: "https://cdn.quasar.dev/img/avatar6.jpg"
    }
  })
};
</script>

<style lang="scss" scoped></style>
