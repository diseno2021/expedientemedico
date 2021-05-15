<template>
      <div>
        <BannerPrincipal />
        <q-separator></q-separator>
        <q-list dense padding>
          <q-item clickable v-ripple :to="{path: '/paciente', hash: '#informacion-personal'}">
            <q-item-section avatar>
              <q-icon name="person" />
            </q-item-section>
            <q-item-section>
              Informacion personal
            </q-item-section>
          </q-item>

          <q-item clickable v-ripple :to="{path: '/paciente', hash: '#antecedentes'}">
            <q-item-section avatar>
              <q-icon name="book" />
            </q-item-section>
            <q-item-section>
              Antecedentes
            </q-item-section>
          </q-item>
          <q-item clickable v-ripple :to="{path: '/paciente', hash: '#medicamentos-permanentes'}">
            <q-item-section avatar>
              <q-icon name="medication" />
            </q-item-section>
            <q-item-section>
              Medicamentos permanentes
            </q-item-section>
          </q-item>

          <q-item clickable v-ripple :to="{path: '/paciente', hash: '#consultas'}">
          <q-item-section avatar>
              <q-icon name="healing" />
            </q-item-section>
            <q-item-section>
              Consultas
            </q-item-section>
          </q-item>

          <q-item clickable v-ripple :to="{path: '/paciente', hash: '#recetas'}">
          <q-item-section avatar>
              <q-icon name="description" />
            </q-item-section>
            <q-item-section>
              Recetas
            </q-item-section>
          </q-item>

          <q-item clickable v-ripple :to="{path: '/paciente', hash: '#enfermedades-cronicas'}">
            <q-item-section avatar>
              <q-icon name="local_hospital" />
            </q-item-section>
            <q-item-section>
            Enfermedades cronicas
            </q-item-section>
          </q-item>

          <q-item clickable v-ripple :to="{path: '/paciente', hash: '#examenes'}">
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
import BannerPrincipal from './BannerPrincipal';
export default {
  components: {
    BannerPrincipal
  }
};
</script>

<style lang="scss" scoped></style>
