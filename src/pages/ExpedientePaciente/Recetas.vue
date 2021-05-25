<template>
  <div class="q-pa-md" style="max-width: 450px">
    <q-list bordered class="rounded-borders">
      <q-expansion-item expand-separator class="text-weight-bold text-subtitle1" label="Recetas">
        <q-card>
          <q-card-section>
            <div>
              <q-splitter v-model="splitterModel" style="height: 250px">
                <template v-slot:before>
                  <q-tabs v-model="tab" vertical class="text-primary">
                    <q-tab name="fecha" label="Fecha" />
                    <q-tab name="recetas" label="Recetas" />
                  </q-tabs>
                </template>

                <template v-slot:after>
                  <q-tab-panels
                    v-model="tab"
                    animated
                    swipeable
                    vertical
                    transition-prev="jump-up"
                    transition-next="jump-up"
                  >
                    <q-tab-panel name="fecha">
                       <span class="text-weight-bold text-subtitle1">Fecha De Sus Recetas</span> <br>
                      <span class="text-subtitle2">2021-01-03</span>
                    </q-tab-panel>

                    <q-tab-panel name="recetas">
                      <span class="text-weight-bold text-subtitle1">Receta por molestia de Garganta</span> <br>
                      <span class="text-subtitle2"><br>Paracetamol - 1 por las noches</span>
                      <span class="text-subtitle2"><br>Acetaminofen - 1 por las noches</span>
                    </q-tab-panel>
                  </q-tab-panels>
                </template>
              </q-splitter>
            </div>
          </q-card-section>
        </q-card>
      </q-expansion-item>
    </q-list>
  </div>
</template>
<script>
import BannerPrincipal from "./../../components/ExpedientePaciente/BannerPrincipal.vue";
export default {
  data() {
    return {
      tab: "fecha",
      splitterModel: 20,
    };
  },
  components: {
    BannerPrincipal,
  },
  methods: {
    saveWork() {
      this.$q.notify({
        message: "Recetas guardadas en el local storage",
        color: "green-4",
        textColor: "white",
        icon: "cloud_done",
      });
    },
  },
};
</script>