<template>
  <div class="q-ma-md">
    <div class="row">
      <h4 class="text-h4">Medicamentos Permanentes</h4>
    </div>
      <q-editor v-model="paciente.medicamentosPermanentes"
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
      min-height="8rem"
      max-height="8rem" />
  </div>
</template>

<script>
export default {
    props: {
      paciente: Object,
    },

}
</script>

<style>

</style>