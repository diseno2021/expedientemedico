<template>
  <div>
    <q-drawer v-model="state" show-if-above bordered>
      <q-list>
        <q-item>
          <q-item-section header>
            <q-card
              class="row text-primary text-h5 text-bold q-my-md justify-center items-center"
              flat
              @click.prevent="state = false"
            >
              <q-icon name="health_and_safety" style="font-size: 2.5rem;" />
              VirtualDoc
            </q-card>
          </q-item-section>
        </q-item>
        <q-separator />

        <q-card flat class="row q-my-md items-center" v-if="usuario != null">
          <div class="col-3 text-center">
            <q-avatar>
              <img :src="usuario.photoURL" />
            </q-avatar>
          </div>
          <div class="col">
            <div class="row  ">Dr. {{ usuario.displayName }}</div>
            <div class="row text-caption text-weight-light">
              {{ usuario.email }}
            </div>
          </div>
          <div class="col-2">
            <q-btn flat round color="primary" icon="logout" @click="logout">
              <q-tooltip anchor="center right" self="center left">
                Cerrar Sesion
              </q-tooltip>
            </q-btn>
          </div>
        </q-card>
        <q-separator />
        <q-item>
          <q-item-section avatar>
            <q-icon name="nights_stay" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Modo Oscuro</q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-toggle color="blue" v-model="dark" @input="cambiarModoDark" />
          </q-item-section>
        </q-item>
        <q-separator />
        <div v-if="usuario != null">
          <q-item to="/" clickable v-ripple >
            <q-item-section avatar>
              <q-icon name="people" />
            </q-item-section>
            <q-item-section >Pacientes</q-item-section>
          </q-item>    
            <agregar_paciente></agregar_paciente>
        </div>
      </q-list>
      <div class="fixed-bottom q-mb-xl" v-if="usuario != null">
        <q-separator />
        <q-card class="text-center q-mt-xl" flat>
          <q-icon name="people" style="font-size: 2.5rem;" />
          <div class="full-width ">
            20 pacientes registrados
          </div>
        </q-card>
      </div>
    </q-drawer>
  </div>
</template>

<script>
import Agregar_paciente from "../components/Agregar_paciente.vue";
import { auth } from "../boot/firebase";
export default {
  components: { Agregar_paciente },
  props: {
    leftDrawerOpen: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      usuario: null,
      state: this.leftDrawerOpen,
      dark: false
    };
  },
  methods: {
    mostrarMensaje() {
      console.log("un mensaje");
      //this.$q.notify(this.user.displayName)
    },
    logout() {
      auth
        .signOut()
        .then(() => {
          // Sign-out successful.
          this.$q.notify("Se ha cerrado la sesión");
        })
        .catch(error => {
          // An error happened.
          this.$q.notify(error);
        });
    },
    cambiarModoDark() {
      this.$q.dark.set(!this.$q.dark.isActive);
    },
    openCloseDrawer() {
      this.state = !this.state;
    }
  },
  created() {
    auth.onAuthStateChanged(user => {
      this.usuario = user;
      console.log(this.usuario);
    });
  }
};
</script>

<style lang="scss" scoped></style>
