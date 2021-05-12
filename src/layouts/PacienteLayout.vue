<template>
  <q-layout view="lHh LpR lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title>
          Aplicación de ejemplo
        </q-toolbar-title>

        <q-btn class="lt-md" flat @click="drawerRight = !drawerRight" round dense icon="menu" />
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item>
          <q-item-label
            header
            class="text-grey-8"
            @click.prevent="leftDrawerOpen = false"
          >
            <q-btn
              flat
              color="primary"
              icon="book"
              size="lg"
              class="full-width text-capitalize text-bold	"
              >Sistema ABC</q-btn
            >
          </q-item-label>
        </q-item>
        <q-separator />
        <q-item>
          <div v-if="usuario != null">
            <q-item to="#">
              <q-item-section avatar>
                <q-avatar>
                  <img :src="usuario.photoURL" />
                </q-avatar>
              </q-item-section>
              <q-item-section>
                <q-item-label>{{ usuario.displayName }}</q-item-label>
                <q-item-label caption>{{ usuario.email }}</q-item-label>
              </q-item-section>
            </q-item>
            <q-item>
              <q-btn
                outline
                rounded
                color="primary"
                size="sm"
                class="absolute-center"
                label="Cerrar sesión"
                @click="logout"
              />
            </q-item>
          </div>
        </q-item>
        <q-separator />
        <q-item>
          <q-item-label>
            Modo oscuro
            <q-btn
              @click.prevent="cambiarModoDark"
              icon="nights_stay"
              rounded
            />
          </q-item-label>
        </q-item>
        <q-separator />
        <q-item to="/" clickable v-ripple>
          <q-item-section avatar>
            <q-icon name="people" />
          </q-item-section>
          <q-item-section>Pacientes</q-item-section>
        </q-item>
        <q-item to="/plantilla" clickable v-ripple>
          <q-item-section avatar>
            <q-icon name="person_add" />
          </q-item-section>
          <q-item-section>Nuevo Paciente</q-item-section>
        </q-item>
      </q-list>
    </q-drawer>
    <q-drawer v-model="drawerRight" show-if-above bordered side="right">
      <div>
        <q-list dense padding>
          <q-item clickable v-ripple to="/paciente/informacion-personal">
            <q-item-section avatar>
              <q-icon name="person" />
            </q-item-section>
            <q-item-section>
              Información personal
            </q-item-section>
          </q-item>

          <q-item clickable v-ripple to="/paciente/antecedentes">
            <q-item-section avatar>
              <q-icon name="book" />
            </q-item-section>
            <q-item-section>
              Antecedentes
            </q-item-section>
          </q-item>

          <q-item clickable v-ripple to="/paciente/medicamentos-permanentes">
            <q-item-section avatar>
              <q-icon name="medication" />
            </q-item-section>
            <q-item-section>
              Medicamentos permanentes
            </q-item-section>
          </q-item>

          <q-item clickable v-ripple to="/paciente/consultas">
          <q-item-section avatar>
              <q-icon name="healing" />
            </q-item-section>
            <q-item-section>
              Consultas
            </q-item-section>
          </q-item>

          <q-item clickable v-ripple to="/paciente/recetas">
          <q-item-section avatar>
              <q-icon name="description" />
            </q-item-section>
            <q-item-section>
              Recetas
            </q-item-section>
          </q-item>

          <q-item clickable v-ripple to="/paciente/enfermedades-cronicas">
            <q-item-section avatar>
              <q-icon name="local_hospital" />
            </q-item-section>
            <q-item-section>
              Enfermedades Cronicas
            </q-item-section>
          </q-item>
        </q-list>
      </div>
    </q-drawer>
    <q-page-container>
      <q-page padding style="padding-top: 146px">
        <router-view />
        <q-page-sticky position="top" expand>
          <BannerPrincipal />
        </q-page-sticky>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import Navegacion from './../components/ExpedientePaciente/Navegacion';
import BannerPrincipal from './../components/ExpedientePaciente/BannerPrincipal';
import { auth } from "../boot/firebase";
export default {
 components:{
   Navegacion,
   BannerPrincipal
 },
 data() {
    return {
      leftDrawerOpen: false,
      usuario: null,
      drawerRight: false,
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
    }
  },
  created() {
    auth.onAuthStateChanged(user => {
      this.usuario = user;
    });
  }
}
</script>
