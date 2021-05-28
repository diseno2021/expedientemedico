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
          Pacientes
        </q-toolbar-title>
      </q-toolbar>
    </q-header>
    <Menu ref="menu" />
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import Menu from "components/Menu";

export default {
  name: "MainLayout",
  components: {
    Menu
  }
};
</script>
