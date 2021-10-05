<template>
  <div class="relative-position" :style="visible ? 'height: 92Vh' : ''">
    <div class="row q-pa-lg" v-if="!visible && clinicas.length > 0">
      <div
        class="col-12 col-md-6 q-pa-md"
        v-for="clinica in clinicas"
        :key="clinica.id"
      >
        <q-card class="my-card" flat bordered>
          <q-card-section class="row items-center">
            <q-icon name="apartment" style="font-size: 3rem;" />
            <div>
              <div class="text-h6">{{ clinica.nombre }}</div>
              <div class="text-subtitle2">
                <q-icon name="phone" />
                {{ clinica.telefono }}
              </div>
            </div>
            <q-space />
            <div>
              <q-btn flat round color="primary" icon="edit" />
              <q-btn flat round color="red" icon="delete" />
            </div>
          </q-card-section>
          <q-separator inset />
          <q-expansion-item icon="place" label="Dirección" :active="true">
            <q-card class="text-black">
              <q-card-section>
                {{ clinica.direccion }}
              </q-card-section>
            </q-card>
          </q-expansion-item>
        </q-card>
      </div>
    </div>
    <!-- mensaje si no hay clinicas-->
    <div
      class="row  items-center justify-center items-center"
      v-if="!visible && clinicas.length == 0"
      style="height: 85Vh"
    >
      <div class="col-12 text-center text-primary">
        <q-icon name="local_hospital" style="font-size: 8rem" />

        <div class=" text-h4  text-weight-bolder">
          No hay clinicas registradas
        </div>
      </div>
    </div>
    <q-inner-loading :showing="visible">
      <q-spinner-cube size="3rem" color="primary" />
      <span
        class=" text-primary
        text-uppercase
        text-overline
        text-weight-bold"
        >Cargando Clinicas</span
      >
    </q-inner-loading>
  </div>
</template>

<script>
import { auth, db, st } from "../../boot/firebase";
export default {
  data() {
    return {
      visible: true,
      clinicas: []
    };
  },
  async created() {
    await this.traerClinicas();
  },
  methods: {
    async traerClinicas() {
      this.clinicas = [];
      try {
        const clinicaSnap = await db
          .collection("clinicas")
          .where("idMedico", "==", auth.currentUser.uid)
          .get();
        clinicaSnap.forEach(e => {
          console.log(e.data());
          this.clinicas.push(e.data());
        });
        this.visible = false;
      } catch (error) {
        console.error(error);
      }
    }
  }
};
</script>

<style>
.q-expansion-item--expanded {
  color: blue;
}
</style>
