<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="$refs.menu.openCloseDrawer()"
        />

        <q-toolbar-title>
          Nueva Consulta
        </q-toolbar-title>
      </q-toolbar>
    </q-header>
    <Menu ref="menu" />
    <q-drawer v-model="drawerRight" show-if-above bordered side="right">
      <NavegacionConsulta ref="nav" />
      <div class="column align-center ">
        <q-input filled type="date" stack-label label="Próxima Cita" />
        <q-btn color="primary" label="Guardar" to=""></q-btn>
      </div>
    </q-drawer>
    <q-page-container>
      <q-page padding>
        <router-view />
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import Menu from "components/Menu";
import NavegacionConsulta from "components/PasarConsulta/NavegacionConsulta.vue";

export default {
  name: "MainLayout",
  components: {
    Menu,
    NavegacionConsulta
  },
  data() {
    return {
      drawerRight: false
    };
  },
  watch: {
    drawerRigth: function(val) {
      if (this.drawerRight == false) {
      }
    }
  }
};
</script>
