<template>
  <div v-if="paciente != null && paciente != 'No pertece al medico'">
    <q-card flat>
      <q-card-section>
        <div class="row justify-center q-pb-xs">
          <q-avatar
            square
            rounded
            size="85px"
            class="q-mx-auto"
          >
            <q-img :src="fotoPerfil"> </q-img>
          </q-avatar>
        </div>
        <div class="row justify-center q-pb-xs">
          <q-btn
            round
            size="sm"
            color="secondary"
            icon="edit"
            @click="cambiarImagen"
          >
            <q-tooltip>
              Cambiar fotografía
            </q-tooltip>
          </q-btn>
        </div>

        <div class="text-h6 q-pb-xs">{{ paciente.nombre }}</div>
        <q-select
          v-model="paciente.clinica"
          :options="clinicas"
          option-label="nombre"
          label="Clinica"
          @input="saveNewClinica"
        >
          <template v-slot:prepend>
            <q-icon
              name="local_hospital"
              @click.stop
            />
          </template>
        </q-select>
        <br>
        <q-btn
          color="secondary"
          icon="medical_services"
          label="Nueva Consulta"
          class="full-width"
          :to="'/pasar-consulta/' + paciente.id"
        >
        </q-btn>
      </q-card-section>
    </q-card>

    <q-dialog
      v-model="cambiarFotografia"
      persistent
    >
      <q-card
        class="my-card"
        style="width: 300px"
      >
        <q-card-section>
          <div class="text-h6">Cambiar fotografía</div>
          <div class="text-subtitle2">Haz click o arrastra la imagen</div>
        </q-card-section>
        <q-card-section>
          <q-file
            v-model="nuevaImagen"
            label="Cambiar fotografía"
          >
            <template v-slot:prepend>
              <q-icon name="photo_camera" />
            </template>
          </q-file>
        </q-card-section>
        <q-separator dark />

        <q-card-actions class="justify-end">
          <q-btn
            flat
            color="primary"
            @click="cerrar"
          >Cerrar</q-btn>
          <q-btn
            flat
            color="primary"
            @click="guardar"
          >Guardar</q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { auth, db, st } from "../../boot/firebase";

export default {
  data: () => ({
    paciente: null,
    cambiarFotografia: false,
    nuevaImagen: null,
    nuevaImagenUrl: "",
    fotoPerfil: "",
    clinicas: [],
    clinicaModel: {},
  }),
  async created() {
    this.obtenerDatosPaciente();
    await this.getClinicas();
  },
  methods: {
    obtenerDatosPaciente() {
      let id = this.$router.currentRoute.params.id;
      var docRef = db.collection("pacientes").doc(id);
      docRef
        .get()
        .then((doc) => {
          if (doc.exists) {
            if (doc.data().idMedico == auth.currentUser.uid) {
              let datos = doc.data();
              this.paciente = {
                id: doc.id,
                ...datos,
              };
              st.ref(doc.data().foto)
                .getDownloadURL()
                .then((url) => {
                  this.fotoPerfil = url;
                });
            } else {
              this.paciente = "No pertece al medico";
            }
          } else {
            this.paciente == null;
          }
        })
        .catch((error) => {
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
    guardar: async function () {
      if (this.nuevaImagen !== null) {
        //this.nuevaImagenUrl = URL.createObjectURL(this.nuevaImagen);
        const foto = this.paciente.foto;
        let id = this.$router.currentRoute.params.id;
        const archivoRef = st.ref(foto);
        var task = await archivoRef.put(this.nuevaImagen);
        const urlImage = await task.ref.getDownloadURL();
        this.fotoPerfil = urlImage;
        this.nuevaImagen = null;
        this.cambiarFotografia = false;
      }
    },
    async getClinicas() {
      const snap = await db
        .collection("clinicas")
        .where("idMedico", "==", auth.currentUser.uid)
        .get();
      snap.forEach((c) => {
        var clinica = {
          id: c.id,
          nombre: c.data().nombre,
          direccion: c.data().direccion,
          telefono: c.data().telefono,
        };
        this.clinicas.push(clinica);
      });
    },
    async saveNewClinica(value) {
      try {
        const ref = await db
          .collection("pacientes")
          .doc(this.paciente.id)
          .update({
            clinica: value
          });
          this.$q.notify({
            message: "Clinica actualizada con exito",
            color: "green-4",
            textColor: "white",
            icon: "cloud_done"
          });
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
