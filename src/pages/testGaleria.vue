<template>
<!-- arrows
      transition-prev="slide-right"
      transition-next="slide-left" -->
  <div class="q-pa-md">
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
      <q-carousel-slide :name="1" img-src="https://cdn.quasar.dev/img/mountains.jpg" />
      <q-carousel-slide :name="2" img-src="https://cdn.quasar.dev/img/parallax1.jpg" />
      <q-carousel-slide :name="3" img-src="https://cdn.quasar.dev/img/parallax2.jpg" />
      <q-carousel-slide :name="4" img-src="https://cdn.quasar.dev/img/quasar.jpg" />


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
