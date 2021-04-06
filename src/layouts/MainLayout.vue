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
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title>
          Aplicación de ejemplo
        </q-toolbar-title>

        <div>Quasar </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      
    >
      <q-list >        
        <q-item-label
          header
          class="text-grey-8" @click.prevent="leftDrawerOpen=false"
        >
        <q-btn flat color="primary" icon="book" size="lg"
        class="full-width text-capitalize text-bold	" >Sistema ABC</q-btn>
        </q-item-label>
        <q-separator />

        <div v-if="usuario!=null">
          <q-item to="#" >
           <q-item-section avatar>
            <q-avatar>
              <img :src="usuario.photoURL">
            </q-avatar>
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ usuario.displayName}}</q-item-label>
            <q-item-label caption>{{ usuario.email}}</q-item-label>            
          </q-item-section>
                   
        </q-item>
        <q-item>          
            <q-btn outline rounded color="primary" size="sm" class="absolute-center"
            label="Cerrar sesión" @click="logout" />          
        </q-item>
        </div>            
        <q-separator />
        <q-item>           
           <q-item-label> Modo oscuro <q-btn @click.prevent="cambiarModoDark" icon="nights_stay" rounded />
           </q-item-label>         
        </q-item>

      </q-list>      
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import {auth} from "../boot/firebase"


export default {
  name: 'MainLayout',
  components: { },
  data () {
    return {
      leftDrawerOpen: false,
      usuario: null,
         
    }
  },
  methods: {
    mostrarMensaje(){
      console.log('un mensaje')
      //this.$q.notify(this.user.displayName)
    },
    logout(){
      auth.signOut().then(() => {
         // Sign-out successful.
         this.$q.notify("Se ha cerrado la sesión")
        }).catch((error) => {
          // An error happened.
          this.$q.notify(error)
        });
    },
    cambiarModoDark(){
      this.$q.dark.set(!this.$q.dark.isActive)
    },
  },
  created() {
    auth.onAuthStateChanged(user => {
        this.usuario = user;        
    });
},
}
</script>
