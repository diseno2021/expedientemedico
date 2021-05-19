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
    <q-page-container>
        <q-page padding>
         <router-view />
        </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import Menu from "components/Menu";
//import Menu from "components/PasarConsulta/NavegacionConsulta.vue"

export default {
  name: "MainLayout",
  components: {
    Menu
  }
};
</script>