<template>
  <div>
    <q-card flat>
      <q-card-section>
        <div class="row justify-center q-pb-xs">
          <q-avatar square rounded size="85px" class="q-mx-auto">
            <q-img :src="paciente.foto" v-if="nuevaImagen == null">
              <q-icon
                class="absolute all-pointer-events absolute-bottom-right"
                size="20px"
                name="edit"
                color="white"
                @click="cambiarImagen"
              >
                <q-tooltip>
                  Cambiar fotografía
                </q-tooltip>
              </q-icon>
            </q-img>
            <q-img :src="nuevaImagenUrl" v-else>
              <q-icon
                class="absolute all-pointer-events absolute-bottom-right"
                size="20px"
                name="edit"
                color="white"
                @click="cambiarImagen"
              >
                <q-tooltip>
                  Cambiar fotografía
                </q-tooltip>
              </q-icon>
            </q-img>
          </q-avatar>
        </div>
        <div class="text-h6 q-pb-xs">{{ paciente.nombre }}</div>
        <div class="text-caption text-grey-7 q-pb-sm">
          Id: {{ paciente.id }}
        </div>
        <q-btn
          color="secondary"
          icon="medical_services"
          label="Nueva Consulta"
          class="full-width"
          to="pasar-consulta/nueva-consulta"
        >
        </q-btn>
      </q-card-section>
    </q-card>

    <q-dialog v-model="cambiarFotografia" persistent>
      <q-card class="my-card" style="width: 300px">
        <q-card-section>
          <div class="text-h6">Cambiar fotografía</div>
          <div class="text-subtitle2">Haz click o arrastra la imagen</div>
        </q-card-section>
        <q-card-section>
          <q-file v-model="nuevaImagen" label="Cambiar fotografía">
            <template v-slot:prepend>
              <q-icon name="photo_camera" />
            </template>
          </q-file>
        </q-card-section>
        <q-separator dark />

        <q-card-actions class="justify-end">
          <q-btn flat color="primary" @click="cerrar">Cerrar</q-btn>
          <q-btn flat color="primary" @click="guardar">Guardar</q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
export default {
  data: () => ({
    paciente: {
      id: "asdfasdfasdfa987asdfasdf76as",
      nombre: "Juan Santiago Perez Lima",
      foto: "https://cdn.quasar.dev/img/avatar6.jpg"
    },
    cambiarFotografia: false,
    nuevaImagen: null,
    nuevaImagenUrl: ""
  }),
  methods: {
    cambiarImagen() {
      this.cambiarFotografia = true;
    },
    cerrar() {
      this.cambiarFotografia = false;
      this.nuevaImagen = null;
    },
    guardar() {
      if (this.nuevaImagen !== null) {
        this.cambiarFotografia = false;
        this.nuevaImagenUrl = URL.createObjectURL(this.nuevaImagen);
      }
    }
  }
};
</script>

<style lang="scss" scoped></style>
