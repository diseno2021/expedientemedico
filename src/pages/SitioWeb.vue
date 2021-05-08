<template>
<div class="q-pa-md q-gutter-y-sm">
<div class="bg-primary text-white">
<q-toolbar>
<!-- <q-btn flat round dense icon="menu" class="q-mr-sm" /> -->
<h1>SISTEMA ABC</h1>
<q-space />
<q-btn flat round dense icon="search" class="q-mr-xs" />
</q-toolbar>
<q-toolbar inset>
<q-toolbar-title
><strong>Informacion de salud para usted</strong></q-toolbar-title
>
<q-btn>ACERCA DE SISTEMAS ABC</q-btn>
<q-btn>Contactenos</q-btn>
<!-- <q-space/> -->
</q-toolbar>
</div>

<div class="row">
<div class="col-4 text-center"><a href="">Temas de salud</a></div>
<div class="col-4 text-center">
<a href="">Medicinas y suplementos</a>
</div>
<div class="col-4 text-center"><a href="">Pruebas Medicas</a></div>
</div>
<div class="row">
<div class="col-12 text-center">
<q-card class="my-card">
<q-card-section>
<h3>
Información sobre COVID-19 Obtenga la información de salud pública
más reciente de los CDC Entérese sobre lo nuevo en investigación
de los NIH Encuentre información del HHS sobre el COVID-19 y usted
</h3>
</q-card-section>
</q-card>
</div>
</div>


<div class="row">

<div class="col-4">

<div class="q-pa-md" style="max-width: 350px">
<q-list bordered>
<q-item clickable v-ripple>
<q-item-section avatar>
<q-icon color="negative" name="favorite" />
</q-item-section>

<q-item-section>Temas de salud</q-item-section>
</q-item>
<q-item clickable v-ripple>
<q-item-section avatar>
<q-icon color="negative" name="local_hospital" />
</q-item-section>

<q-item-section>Medicinas y suplementos</q-item-section>
</q-item>
<q-item clickable v-ripple>
<q-item-section avatar>
<q-icon color="negative" name="bloodtype" />
</q-item-section>

<q-item-section>Pruebas medicas</q-item-section>
</q-item>

</q-list>
</div>
<h4>Siguenos:</h4>
<div class="row">
<div class="col-4 text-center"><q-icon color="primary" name="facebook" style="font-size: 2em"/></div>
<div class="col-4 text-center">
<q-icon color="negative" name="health_and_safety" style="font-size: 2em"/>
</div>
<div class="col-4 text-center"><q-icon color="negative" name="bloodtype" style="font-size: 2em"/></div>
</div>

</div>

<div class="col-8 q-pa-md justify-center">
<q-card>
<q-carousel
v-model="slide"
transition-prev="slide-right"
transition-next="slide-left"
swipeable
animated
control-color="primary"
navigation
padding
arrows
class="bg-grey-1 shadow-2 rounded-borders"
>
<q-carousel-slide :name="1" img-src="../../src/assets/img/doctor-1.jpg" style="height: 280px; max-width: 1100px"/>
<q-carousel-slide :name="2" img-src="../../src/assets/img/doctor-2.jpg" style="height: 280px; max-width: 1100px"/>
<q-carousel-slide :name="3" img-src="../../src/assets/img/doctor-3.jpg" style="height: 280px; max-width: 1100px"/>
</q-carousel>
</q-card>
</div>


</div>





</div>
</template>

<script>
export default {
name: "SitioWeb",
data() {
return {
slide: 1
};
},
};
</script>

<style>
</style>
