<template>
    <div>
        <div class="row justify-center">
            <div class="col-md-10">
                <q-editor v-model="editor" min-height="5rem" />
                <q-btn>Guardar</q-btn>
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