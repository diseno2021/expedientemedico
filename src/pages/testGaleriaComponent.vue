
<template>
  <v-row >
    <v-col md="6">
      <div class="q-pa-md">
        <div class="q-gutter-md" style="max-width: 300px">
          <q-file
            filled
            bottom-slots
            v-model="model"
            label="Agregar imágenes"
            counter
            max-files="20"
            bg-color="purple-12"
            label-color="white"
            accept=".jpg, image/*"
            multiple
          >
            <template v-slot:before>
              <q-icon name="collections" />
            </template>

            <template v-slot:hint> Imágenes agregadas </template>
            <template v-slot:append>
              <q-btn
                color="grey-4"
                dense
                flat
                icon="upload"
                @click="agregarImagenes"
              />
              <q-tooltip
                anchor="center right"
                self="center left"
                :offset="[50, 10]"
                v-model="showing"
                content-class="bg-green"
                content-style="font-size: 16px"
              >
                <bold>Agregar nueva imagen</bold>
              </q-tooltip>
            </template>
          </q-file>
        </div>
      </div>
    </v-col>

    <v-col md="6" class="q-gutter-md"> 
    <q-card class="my-card">
      <q-img
        src="https://cdn.quasar.dev/img/parallax2.jpg" width="450px" 

        basic
      >
        <div class="absolute-bottom text-subtitle2 text-center">
          Title
        </div>
      </q-img>
     </q-card>   
    </v-col>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      model: null,
      showing: false,
      guardarImagen:[]
    };
  },
  methods: {
    agregarImagenes() {
        this.guardarImagen=[];
        this.guardarImagen =  this.model;         
         console.log(this.guardarImagen);
        this.model= null;
        console.log(this.guardarImagen);
       
        alert( "Imagen agregada con exito")       

    },
  },
};
</script>

<style>
</style>