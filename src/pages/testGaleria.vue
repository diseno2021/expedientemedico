<template>
<!-- arrows
      transition-prev="slide-right"
      transition-next="slide-left" -->
  
  
  <div class="q-pa-md">
  <h3>Exámenes del paciente</h3>
    <q-carousel
      swipeable
      animated
      v-model="slide"
      thumbnails
      infinite
      :autoplay="autoplay"
      @mouseenter="autoplay = false"
      @mouseleave="autoplay = true"
      :fullscreen.sync="fullscreen"
      :navigation-position="fullscreen ? 'left' : 'bottom' "

    >
      <q-carousel-slide :name="1" img-src="https://www.deidiagnostico.com/wp-content/uploads/2016/03/caso-66-rx-tc3b3rax-inicial.jpg" />
      <q-carousel-slide :name="2" img-src="https://www.ecestaticos.com/image/clipping/9198cd2d471abe7b4ec368c5b7a4aa92/acudio-al-medico-con-dolor-de-cabeza-pero-tenia-una-plaga-de-gusanos-en-el-cerebro.jpg" />
      <q-carousel-slide :name="3" img-src="https://image.slidesharecdn.com/laboratoriodehematologa-131104172358-phpapp01/95/laboratorios-de-hematologa-5-638.jpg?cb=1383586091" />
      <q-carousel-slide :name="4" img-src="https://www.fundacionmf.org.ar/imgforo/02013251.gif" />


      <template v-slot:control>
        <q-carousel-control
          :position="fullscreen ? 'bottom-right' : 'top-right'"
          :offset="[18, 18]"
        >
          <q-btn round color="black" size="md" icon="add_circle" class="q-mx-sm ">
            <q-tooltip v-model="showing" content-class="bg-green" content-style="font-size: 16px">
              <bold>Agregar nuevo archivo</bold>
            </q-tooltip>
          </q-btn>
          <q-btn
            push round dense color="white" text-color="primary"
            :icon="fullscreen ? 'fullscreen_exit' : 'fullscreen'"
            @click="fullscreen = !fullscreen"
          />
        </q-carousel-control>
      </template>

    </q-carousel>


  </div>



</template>


<script>
export default {
     data () {
    return {
      slide: 1,
      autoplay: true,
      fullscreen: false,
      showing: false
    }
  }
}
</script>

<style>

</style>
