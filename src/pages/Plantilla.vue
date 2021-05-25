<template>
    <div class="q-pa-md" >
        <div class="row">
            <div class="col-6 offset-1" v-if="usuario!=null">
                <p>{{usuario.displayName}}</p>
                <p>{{usuario.email}}</p>
                <p>{{usuario.id}}</p>
                <p >
                <q-btn icon="warning" @click="mostrarMensaje">mostrar mensaje</q-btn>
                
                <q-btn icon="windows" @click="mostrarDialog">Modal dialogo</q-btn>
            </p>
            </div>           

        </div>
    </div>
</template>

<script>
import {auth} from "../boot/firebase"

    export default {
        name: 'unNombre',
        data() {
            return {
                usuario: null,
            }
        },
        methods: {
            mostrarMensaje(){
                // como mostrar un mensaje corto
                this.$q.notify("un mensaje corto")
                this.$q.notify({
                    message: "un mensaje",
                    icon: "warning",
                    color:"negative"                    
                })

            },
            mostrarPosicion(){
                navigator.geolocation.getCurrentPosition(pos=>{
                    // console.log(pos.coords);
                    var algo=pos.coords
                    this.$q.notify({
                                        message: "latitud: " + algo.latitude + " longitud: "+ algo.longitude,
                                        icon: "map",
                                        color:"primary"                    
                                    })

                })
            },

            mostrarDialog () {
                this.$q.dialog({
                    title: 'Dialogo Modal',
                    message: '<h1>Titulo</h1><h4>Sub Titulo HTML</h4>',
                    cancel: true,
                    persistent: false,
                    html: true
                }).onOk(() => {
                    // console.log('>>>> OK')
                }).onOk(() => {
                    // console.log('>>>> second OK catcher')
                }).onCancel(() => {
                    // console.log('>>>> Cancel')
                }).onDismiss(() => {
                    // console.log('I am triggered on both OK and Cancel')
                })
            },
            
        },
        created() {
            auth.onAuthStateChanged(user => {
                this.usuario = user;                
            });
        }

    }
</script>

