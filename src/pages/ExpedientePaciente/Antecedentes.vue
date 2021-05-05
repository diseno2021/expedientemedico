<template>
    <div class="q-ma-md">
        <div class="row">
      <div class="text-h4">Antecedentes</div>
      <div class="col-md-12">
        <q-editor v-model="editor" min-height="5rem" />
        <q-btn class="q-mt-sm">Guardar</q-btn>
      </div>
    </div>
    <div class="row q-mt-md">
      <div class="col-md-12">
        <q-card>
          <q-card-section>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem
            ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum
            dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit
            amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt
            ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet,
            consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
            labore et dolore magna aliqua.
          </q-card-section>
        </q-card>
      </div>
    </div>
    </div>
</template>

<script>
import BannerPrincipal from './../../components/ExpedientePaciente/BannerPrincipal';

    export default {
        data(){
            return{
                editor: ''
            }
        },
        components:{
            BannerPrincipal
        }
    }
</script>

<style lang="scss" scoped>

</style>