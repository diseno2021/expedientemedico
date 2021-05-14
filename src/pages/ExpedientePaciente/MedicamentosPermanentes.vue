<template>
  <div class="q-ma-md">
      <q-editor v-model="medicamento" min-height="10rem" />
      <div class="row q-mt-sm">
          <q-btn>Guardar</q-btn>
      </div>
      <div class="row q-mt-lg">
          <div class="col-12 col-md-8 q-mx-auto">
          <q-card>
            <q-card-section v-html="medicamento">
            </q-card-section>
          </q-card>
      </div>
      </div>
  </div>
</template>

<script>
export default {

    data: () => ({
        medicamento: '',
    })

}
</script>

<style>

</style>