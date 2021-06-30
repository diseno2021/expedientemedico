<template>
  <q-layout view="lHh LpR lFf" @scroll="onScroll">
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
          Expediente del paciente
        </q-toolbar-title>

        <q-btn class="lt-md" flat @click="test" round dense icon="menu" />
      </q-toolbar>
    </q-header>
    <Menu ref="menu" />
    <q-drawer v-model="drawerRight" show-if-above bordered side="right">
      <Navegacion ref="nav" />
    </q-drawer>
    <q-page-container>
      <q-page padding class="q-pt-none">
        <router-view></router-view>
        <q-page-scroller position="bottom-right" :scroll-offset="150" :offset="[18, 18]">
            <q-btn fab icon="keyboard_arrow_up" color="primary" />
          </q-page-scroller>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import Menu from '../components/Menu';
import Navegacion from './../components/ExpedientePaciente/Navegacion';
import BannerPrincipal from './../components/ExpedientePaciente/BannerPrincipal';
import { auth } from "../boot/firebase";
export default {
 components:{
   Navegacion,
   BannerPrincipal,
   Menu,
 },
  data() {
    return {
      drawerRight: false,
      scrollInfo: {},
      spyMovil: false,
    };
  },
  methods: {
    onScroll(info){
      if (this.spyMovil == false) {
        this.scrollInfo = info;
        this.$refs.nav.scrollspy(info.position);
      }
    },
    test(){
      this.spyMovil = true;
      this.$refs.nav.scrollspy(this.scrollInfo.position);
      this.drawerRight = !this.drawerRight;
    }
  },
  watch: {
    drawerRight: function (val) {
      if (this.drawerRight == false && this.spyMovil) {
        this.spyMovil = false;
      }
    }
  }
}
</script>
