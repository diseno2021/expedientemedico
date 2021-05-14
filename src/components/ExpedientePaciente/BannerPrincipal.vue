<template>
  <q-toolbar class="bg-grey-3 justify-center q-px-none">
    <div class="col">
      <q-card square bordered style="max-width: 100%">
        <q-card-section>
          <div class="row justify-center items-center q-col-gutter-md">
            <div class="col-auto">
              <q-avatar square rounded size="85px" class="gt-xs">
                <img :src="paciente.foto" />
              </q-avatar>
              <q-avatar square rounded class="lt-sm">
                <img :src="paciente.foto" />
              </q-avatar>
            </div>
            <div class="col-auto">
              <div class="text-subtitle1 lt-sm">{{ paciente.nombre }}</div>
              <div class="text-subtitle2 lt-sm">Id: {{ paciente.id }}</div>
              <div class="text-h6 gt-xs">{{ paciente.nombre }}</div>
              <div class="text-subtitle1 gt-xs">Id: {{ paciente.id }}</div>
            </div>
            <div v-if="$route.path != '/paciente/pasar-consulta'" class="col-auto">
              <q-btn
                round
                color="secondary"
                icon="add"
                size="lg"
                class="gt-xs"
                to="paciente/pasar-consulta"
              >
                <q-tooltip>
                  Nueva Consulta
                </q-tooltip>
              </q-btn>
              <q-btn
                round
                color="secondary"
                icon="add"
                size="md"
                class="lt-sm"
                to="paciente/pasar-consulta"
              >
                <q-tooltip>
                  Nueva Consulta
                </q-tooltip></q-btn
              >
            </div>
          </div>
        </q-card-section>
      </q-card>
    </div>
  </q-toolbar>
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
