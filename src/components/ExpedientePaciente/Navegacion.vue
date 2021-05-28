<template>
  <div>
    <BannerPrincipal />
    <q-separator></q-separator>
    <q-list dense padding>
      <q-item
        clickable
        v-ripple
        @click="push('informacion-personal')"
        :active="observer == 'i-personal'"
      >
        <q-item-section avatar>
          <q-icon name="person" />
        </q-item-section>
        <q-item-section>
          Informacion personal
        </q-item-section>
      </q-item>

      <q-item
        clickable
        v-ripple
        @click="push('antecedentes')"
        :active="observer == 'antecedentes' || observer == 'antecedentes-alergias'"
      >
        <q-item-section avatar>
          <q-icon name="book" />
        </q-item-section>
        <q-item-section>
          Antecedentes
        </q-item-section>
      </q-item>

      <q-item
        clickable
        v-ripple
        @click="push('alergias')"
        :active="observer == 'alergias' || observer == 'antecedentes-alergias'"
      >
        <q-item-section avatar>
          <q-icon name="collections" />
        </q-item-section>
        <q-item-section>
          Alergias
        </q-item-section>
      </q-item>

      <q-item
        clickable
        v-ripple
        @click="push('medicamentos-permanentes')"
        :active="observer == 'm-permanentes' || observer == 'm-permanentes-e-cronicas'"
      >
        <q-item-section avatar>
          <q-icon name="medication" />
        </q-item-section>
        <q-item-section>
          Medicamentos permanentes
        </q-item-section>
      </q-item>

      <q-item
        clickable
        v-ripple
        @click="push('enfermedades-cronicas')"
        :active="observer == 'e-cronicas' || observer == 'm-permanentes-e-cronicas'"
      >
        <q-item-section avatar>
          <q-icon name="local_hospital" />
        </q-item-section>
        <q-item-section>
          Enfermedades cronicas
        </q-item-section>
      </q-item>

      <q-item
        clickable
        v-ripple
        @click="push('consultas')"
        :active="observer == 'consultas'"
      >
        <q-item-section avatar>
          <q-icon name="healing" />
        </q-item-section>
        <q-item-section>
          Consultas
        </q-item-section>
      </q-item>

      <q-item
        clickable
        v-ripple
        @click="push('recetas')"
        :active="observer == 'recetas'"
      >
        <q-item-section avatar>
          <q-icon name="description" />
        </q-item-section>
        <q-item-section>
          Recetas
        </q-item-section>
      </q-item>

      <q-item
        clickable
        v-ripple
        @click="push('examenes')"
        :active="observer == 'examenes'"
      >
        <q-item-section avatar>
          <q-icon name="collections" />
        </q-item-section>
        <q-item-section>
          Examenes
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script>
import BannerPrincipal from "./BannerPrincipal";
export default {
  components: {
    BannerPrincipal
  },
  data: () => ({
    observer: "",
  }),
  methods: {
    scrollspy(posicion) {
      if (this.$q.screen.gt.sm) {
        if (posicion <= 900) {
          this.observer = "i-personal";
        } else if (posicion > 900 && posicion <= 1200) {
          this.observer = 'antecedentes-alergias';
        } else if (posicion > 1200 && posicion <= 1550) {
          this.observer = "m-permanentes-e-cronicas";
        } else if (posicion > 1550 && posicion <= 1900) {
          this.observer = "consultas";
        } else if (posicion > 1900 && posicion <= 2100) {
          this.observer = "recetas";
        } else {
          this.observer = "examenes";
        }
      } else if (this.$q.screen.gt.xs) {
        if (posicion <= 1650) {
          this.observer = "i-personal";
        } else if (posicion > 1650 && posicion <= 2000) {
          this.observer = "antecedentes";
        } else if (posicion > 2000 && posicion <= 2400) {
          this.observer = "alergias";
        } else if (posicion > 2400 && posicion <= 2750) {
          this.observer = "m-permanentes";
        } else if (posicion > 2750 && posicion <= 3000) {
          this.observer = "e-cronicas";
        } else if (posicion > 3000 && posicion <= 3550) {
          this.observer = "consultas";
        } else if (posicion > 3550 && posicion <= 3750) {
        this.observer = "recetas";
        } else {
          this.observer = "examenes";
        }
      } else {
        if (posicion <= 1350) {
          this.observer = "i-personal";
        } else if (posicion > 1350 && posicion <= 1850) {
          this.observer = "antecedentes";
        } else if (posicion > 1850 && posicion <= 2150) {
          this.observer = "alergias";
        } else if (posicion > 2150 && posicion <= 2450) {
          this.observer = "m-permanentes";
        } else if (posicion > 2450 && posicion <= 2850) {
          this.observer = "e-cronicas";
        } else if (posicion > 2850 && posicion <= 3300) {
          this.observer = "consultas";
        } else if (posicion > 3300 && posicion <= 3500) {
        this.observer = "recetas";
        } else {
          this.observer = "examenes";
        }
      }
    },
    push(hash) {
      if (this.$route.path + this.$route.hash != "/paciente/" + this.$router.currentRoute.params.id + '#' + hash) {
        this.$router.push("/paciente/" + this.$router.currentRoute.params.id + '#' + hash);
      }
    }
  }
};
</script>

<style lang="scss" scoped></style>
