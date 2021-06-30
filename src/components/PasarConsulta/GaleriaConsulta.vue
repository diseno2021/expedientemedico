<template>
  <div class="q-pa-md">
    <q-carousel arrows animated v-model="slide" height="200px" transition-prev="slide-right"
      transition-next="slide-left"
      swipeable
      control-color="primary"
      navigation
      padding
      >
      <q-carousel-slide
        name="first"
        img-src="https://www.deidiagnostico.com/wp-content/uploads/2016/03/caso-66-rx-tc3b3rax-inicial.jpg"
      >
      </q-carousel-slide>
      <q-carousel-slide
        name="second"
        img-src="https://www.ecestaticos.com/image/clipping/9198cd2d471abe7b4ec368c5b7a4aa92/acudio-al-medico-con-dolor-de-cabeza-pero-tenia-una-plaga-de-gusanos-en-el-cerebro.jpg"
      >
      </q-carousel-slide>
      <q-carousel-slide
        name="third"
        img-src="https://image.slidesharecdn.com/laboratoriodehematologa-131104172358-phpapp01/95/laboratorios-de-hematologa-5-638.jpg?cb=1383586091"
      >
      </q-carousel-slide>
    </q-carousel>
  </div>
</template>

<script>
export default {
  data() {
    return {
      slide: "first",
    };
  },
};
</script>

<style lang="sass" scoped>
.custom-caption
    text-align: center
    padding: 12px
    color: white
    background-color: rgba(0, 0, 0, .3)
</style>