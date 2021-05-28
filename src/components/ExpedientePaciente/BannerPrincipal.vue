<template>
  <div v-if="paciente != null">
    <q-card flat>
      <q-card-section>
        <div class="row justify-center q-pb-xs">
          <q-avatar square rounded size="85px" class="q-mx-auto">
            <q-img :src="fotoPerfil" v-if="nuevaImagen == null">
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
import { db, st } from "../../boot/firebase";

export default {
  data: () => ({
    paciente: null,
    cambiarFotografia: false,
    nuevaImagen: null,
    nuevaImagenUrl: "",
    fotoPerfil: '',
  }),
  created(){
    this.obtenerDatosPaciente();
  },
  methods: {
    obtenerDatosPaciente() {
      let id = this.$router.currentRoute.params.id
      var docRef = db.collection("pacientes").doc(id);
      docRef
        .get()
        .then(doc => {
          if (doc.exists) {
            this.paciente = doc.data();
            st.ref(doc.data().foto).getDownloadURL().then( url => {
              this.fotoPerfil = url;
            })
          } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
          }
        })
        .catch(error => {
          console.log("Error getting document:", error);
        });
    },
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
