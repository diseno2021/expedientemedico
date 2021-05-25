<template>
  <div class="row" style="border: 4px solid black">
    <div class="col-12">
      <div class="q-pa-md">
        <div class="q-gutter-md" style="max-width: 300px">
          <q-file
            filled
            bottom-slots
            v-model="model"
            label="Agregar imágenes"
            counter
            max-files="20"
            bg-color="purple-12"
            label-color="white"
            accept=".jpg, image/*"
            multiple
          >
            <template v-slot:before>
              <q-icon name="collections" />
            </template>

            <template v-slot:hint> Imágenes agregadas </template>
            <template v-slot:append>
              <q-btn
                color="grey-4"
                dense
                flat
                icon="upload"
               @click="triggerPositive"

              />
              <q-tooltip
                anchor="center right"
                self="center left"
                :offset="[50, 10]"
                v-model="showing"
                content-class="bg-green"
                content-style="font-size: 16px"
              >
                <bold>Agregar nueva imagen</bold>
              </q-tooltip>
            </template>
          </q-file>
        </div>
      </div>
    </div>

    <div class="col-12 q-pa-md">
      <div class="row">
        <div class="col-6 q-pa-sm">
          <q-card class="my-card">
            <q-img src="https://www.deidiagnostico.com/wp-content/uploads/2016/03/caso-66-rx-tc3b3rax-inicial.jpg" basic>
              <q-btn
                  round
                  color="red"
                  size="sm"
                  icon="delete_forever"
                  class="q-mx-sm"
                  @click="confirm = true"
                  position-x
                >
                  <q-tooltip
                    v-model="showing2"
                    content-class="bg-negative"
                    content-style="font-size: 16px"
                  >
                    <bold>Eliminar imagen</bold>
                  </q-tooltip>
                </q-btn>
            </q-img>
          </q-card>
        </div>
        <div class="col-6 q-pa-sm">
          <q-card class="my-card">
            <q-img src="https://www.deidiagnostico.com/wp-content/uploads/2016/03/caso-66-rx-tc3b3rax-inicial.jpg" basic>
              <q-btn
                  round
                  color="red"
                  size="sm"
                  icon="delete_forever"
                  class="q-mx-sm"
                  @click="confirm = true"
                  position-x
                >
                  <q-tooltip
                    v-model="showing3"
                    content-class="bg-negative"
                    content-style="font-size: 16px"
                  >
                    <bold>Eliminar imagen</bold>
                  </q-tooltip>
                </q-btn>
            </q-img>
          </q-card>
        </div>
        <div class="col-6 q-pa-sm">
          <q-card class="my-card">
            <q-img src="https://www.deidiagnostico.com/wp-content/uploads/2016/03/caso-66-rx-tc3b3rax-inicial.jpg" basic>
              <q-btn
                  round
                  color="red"
                  size="sm"
                  icon="delete_forever"
                  class="q-mx-sm"
                  @click="confirm = true"
                  position-x
                >
                  <q-tooltip
                    v-model="showing4"
                    content-class="bg-negative"
                    content-style="font-size: 16px"
                  >
                    <bold>Eliminar imagen</bold>
                  </q-tooltip>
                </q-btn>
            </q-img>
          </q-card>
        </div>
      </div>
    </div>
    <q-dialog v-model="confirm" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="warning" color="negative" text-color="white" />
          <span class="q-ml-sm">¿Está seguro si desea eliminar la imagen?</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="grey-7" v-close-popup />
          <q-btn flat label="Confirmar" color="red" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      model: null,
      showing: false,
      showing2: false,
      showing3: false,
      showing4: false,
      confirm: false,
      guardarImagen: []
    };
  },
  methods: {
    agregarImagenes() {
    },
  triggerPositive () {
      this.$q.notify({
        type: 'positive',
        message: `Imagen agregada con exito!`
      })
  }
  }
};
</script>

<style>
.my-card {
  width: 100%;
  max-width: 250px;
}
</style>
