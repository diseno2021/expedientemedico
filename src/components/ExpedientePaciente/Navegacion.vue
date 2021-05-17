<template>
      <div>
        <BannerPrincipal />
        <q-separator></q-separator>
        <q-list dense padding>
          <q-item clickable v-ripple @click="push('informacion-personal')" :active="observer == 'i-personal'">
            <q-item-section avatar>
              <q-icon name="person" />
            </q-item-section>
            <q-item-section>
              Informacion personal
            </q-item-section>
          </q-item>

          <q-item clickable v-ripple @click="push('antecedentes')" :active="observer == 'antecedentes'">
            <q-item-section avatar>
              <q-icon name="book" />
            </q-item-section>
            <q-item-section>
              Antecedentes
            </q-item-section>
          </q-item>
          <q-item clickable v-ripple @click="push('medicamentos-permanentes')" :active="observer == 'm-permanentes'">
            <q-item-section avatar>
              <q-icon name="medication" />
            </q-item-section>
            <q-item-section>
              Medicamentos permanentes
            </q-item-section>
          </q-item>

          <q-item clickable v-ripple @click="push('consultas')" :active="observer == 'consultas'">
          <q-item-section avatar>
              <q-icon name="healing" />
            </q-item-section>
            <q-item-section>
              Consultas
            </q-item-section>
          </q-item>

          <q-item clickable v-ripple @click="push('recetas')" :active="observer == 'recetas'">
          <q-item-section avatar>
              <q-icon name="description" />
            </q-item-section>
            <q-item-section>
              Recetas
            </q-item-section>
          </q-item>

          <q-item clickable v-ripple @click="push('enfermedades-cronicas')" :active="observer == 'e-cronicas'">
            <q-item-section avatar>
              <q-icon name="local_hospital" />
            </q-item-section>
            <q-item-section>
            Enfermedades cronicas
            </q-item-section>
          </q-item>

          <q-item clickable v-ripple @click="push('examenes')" :active="observer == 'examenes'">
            <q-item-section avatar>
              <q-icon name="collections" />
            </q-item-section>
            <q-item-section>
            Examenes
            </q-item-section>
          </q-item>
        </q-list>
        {{ pos }}
      </div>
</template>

<script>
import BannerPrincipal from './BannerPrincipal';
export default {
  components: {
    BannerPrincipal
  },
  data: () => ({
    observer: '',
    pos: 0,
  }),
  methods: {
    scrollspy(posicion){
      this.pos = posicion;
      if (posicion <= 650) {
        this.observer = 'i-personal';
      } else if (posicion > 650 && posicion <= 1000) {
        this.observer = 'antecedentes';
      } else if (posicion > 1000 && posicion <= 1400) {
        this.observer = 'm-permanentes'
      } else if (posicion > 1400 && posicion <= 1700) {
        this.observer = 'consultas';
      } else if (posicion > 1700 && posicion <= 2200) {
        this.observer = 'recetas';
      } else if (posicion > 2200 && posicion <= 2350) {
        this.observer = 'e-cronicas';
      } else {
        this.observer = 'examenes';
      }
    },
    push(hash){
      if (this.$route.path + this.$route.hash != '/paciente#' + hash) {
        this.$router.push('/paciente#' + hash);
      }
    }
  }
};
</script>

<style lang="scss" scoped></style>
