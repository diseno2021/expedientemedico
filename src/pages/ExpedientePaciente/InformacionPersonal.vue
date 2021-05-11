<template>
  <div class="q-ma-md">
    <div class="row q-mt-md">
      <div class="col-md-12 q-mt-md">
        <q-input v-model="text" label="Nombre completo">
          <template v-slot:prepend>
            <q-icon name="person" />
          </template>
        </q-input>
      </div>
    </div>
    <div class="row justify-between q-mt-md">
      <div class="col-md-5">
        <q-input
          label="fecha de nacimiento"
          filled
          v-model="date"
          mask="date"
          :rules="['date']"
        >
          <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy
                ref="qDateProxy"
                transition-show="scale"
                transition-hide="scale"
              >
                <q-date v-model="date">
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="primary" flat />
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
      </div>
      <div class="col-md-5">
        <q-input v-model="text" label="Edad"
          ><template v-slot:prepend>
            <q-icon name="cake" />
          </template>
        </q-input>
      </div>
    </div>

    <div class="row justify-between">
      <div class="col-md-5">
        <q-radio v-model="genero" val="masculino" label="Masculino" />
        <q-radio v-model="genero" val="femenino" label="Femenino" />
      </div>
      <div class="col-md-5">
        <q-input v-model="text" label="Tipo de sangre">
          <template v-slot:prepend>
            <q-icon
                  name="bloodtype"
                />
          </template>
        </q-input>
      </div>
    </div>

    <div class="row justify-between">
      <div class="col-md-4">
        <q-input v-model="text" label="Peso">
          <template v-slot:prepend>
            <q-icon name="monitor_weight"/>
          </template>
        </q-input>
      </div>
      <div class="col-md-6"></div>
    </div>

    <div class="col-md-12 q-mt-md">
      <q-input v-model="text" label="Dirección">
        <template v-slot:prepend>
          <q-icon name="directions" />
        </template>
      </q-input>
    </div>

    <div class="col-md-12 q-mt-md">
      <q-input v-model="text" label="Teléfono">
        <template v-slot:prepend>
          <q-icon name="phone" />
        </template>
      </q-input>
    </div>

    <div class="col-md-12 q-mt-md">
      <q-input v-model="text" label="Caso de emergencia">
        <template v-slot:prepend>
          <q-icon name="warning" />
        </template>
      </q-input>
    </div>
  </div>
</template>

<script>
import BannerPrincipal from "./../../components/ExpedientePaciente/BannerPrincipal.vue";
export default {
  data() {
    return {
      date: "2020/02/01",
      edad: "",
      genero: "",
      text: ""
    };
  },
  components: {
    BannerPrincipal
  }
};
</script>

<style lang="scss" scoped></style>
