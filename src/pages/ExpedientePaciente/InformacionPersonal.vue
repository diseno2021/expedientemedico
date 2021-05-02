<template>
  <div>
    <div class="row justify-center">
      <div class="col-md-10">
        <p class="text">Nombre Completo</p>
        <q-input outlined />
        <div class="row justify-between">
          <div class="col-md-5">
            <p>Fecha de nacimiento</p>
            <q-input filled v-model="date" mask="date" :rules="['date']">
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy
                    ref="qDateProxy"
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-date v-model="date">
                      <div class="row items-center justify-end">
                        <q-btn
                          v-close-popup
                          label="Close"
                          color="primary"
                          flat
                        />
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </div>
          <div class="col-md-5">
            <p class="text">Edad</p>
            <q-input outlined />
          </div>
        </div>
        <div class="row justify-between">
          <div class="col-md-5">
            <p>Género</p>
            <q-radio v-model="genero" val="masculino" label="Masculino" />
            <q-radio v-model="genero" val="femenino" label="Femenino" />
          </div>
          <div class="col-md-5">
            <p class="text">Tipo de sangre</p>
            <q-input outlined />
          </div>
        </div>

        <div class="col">
          <p class="text">Dirección</p>
          <q-input outlined />
        </div>

        <div class="col">
          <p class="text">Teléfono</p>
          <q-input outlined />
        </div>

        <div class="col">
          <p class="text">Caso de emergencia</p>
          <q-input outlined />
        </div>
      </div>
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
      genero: ""
    };
  },
  components: {
    BannerPrincipal
  }
};
</script>

<style lang="scss" scoped></style>
