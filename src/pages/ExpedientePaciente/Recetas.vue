<template>
  <div>
    <div class="row">
      <h3 class="text-h3">Recetas</h3>
    </div>
    <div class="q-pa-md q-gutter-sm">
      <q-editor v-model="editor"
        :definitions="{
        }"
       :toolbar="[
          ['bold', 'italic', 'strike', 'underline'],
          [
            {
              label: $q.lang.editor.fontSize,
              icon: $q.iconSet.editor.fontSize,
              fixedLabel: true,
              fixedIcon: true,
              list: 'no-icons',
              options: [
                'size-1',
                'size-2',
                'size-3',
                'size-4',
                'size-5',
                'size-6',
                'size-7'
              ]
            },
          ],
      ]"
        min-height="10rem"
      />
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
      editor: "<br> Medicamentos Permanentes:<br/>Acetaminofén </br>Loratadina<br/>" //texto html
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