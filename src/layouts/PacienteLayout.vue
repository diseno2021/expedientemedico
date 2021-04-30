<template>
  <q-layout view="lHh LpR lFf">
    <q-header> </q-header>
    <Navegacion/>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import Navegacion from './../components/ExpedientePaciente/Navegacion'
export default{
 components:{
   Navegacion
 }
}
</script>
