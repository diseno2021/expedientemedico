<template>
  <div class="main">
    <div class="left"></div>
    <div class="rigth">
      <div class="logo">
        <q-icon name="health_and_safety" size="4rem" color="#3c75ad" />
        <h2 style="display: inline-block">VirtualDoc</h2>
      </div>
      <div class="inputs">
        <q-avatar> <img :src="user.photoURL" /> </q-avatar><br />
        {{ user.email }} <br />
        <q-input
          v-model="prefix"
          label="Prefijo"
          style="max-width: 100px; display: inline-block"
        />
        <q-input
          v-model="user.displayName"
          label="Nombre"
          style="min-width: 400px; display: inline-block; margin-left: 1rem"
        />
        <br /><br />
        Acepte los siguientes términos y condiciones para terminar de crear su
        cuenta.
        <br />
        <q-checkbox v-model="valCheckbox" />
        <a
          href="#"
          v-on:click.prevent="persistent = true"
          style="display: inline"
          >Aceptar términos y condiciones</a
        >
        <div class="q-pa-md q-gutter-sm" style="text-align: center">
          <q-btn color="red" label="Cancelar" @click="cancelarSub()" />
          <q-btn
            color="primary"
            label="Enviar"
            :class="{ not_allowed: !valCheckbox }"
            @click="aceptar()"
          />
        </div>

        <br />
      </div>
    </div>
    <q-dialog
      v-model="persistent"
      persistent
      transition-show="scale"
      transition-hide="scale"
    >
      <q-card class="bg-primary text-white">
        <q-card-section>
          <div class="text-h6">TÉRMINOS Y CONDICIONES</div>
        </q-card-section>

        <q-card-section
          class="q-pt-none"
          style="text-align: justify; text-justify: inter-word"
        >
          <p>
            Licencia MIT
            <br /><br />
            Copyright (c) 2021 diseno2021
            <br /><br />
            Por la presente se otorga permiso, sin cargo, a cualquier persona
            que obtenga una copia. de este software y los archivos de
            documentación asociados (el "Software"), para tratar en el Software
            sin restricciones, incluidos, entre otros, los derechos para usar,
            copiar, modificar, fusionar, publicar, distribuir, sublicenciar y /
            o vender copias del Software, y para permitir a las personas a las
            que el Software es amueblado para ello, sujeto a las siguientes
            condiciones:
            <br /><br />
            El aviso de copyright anterior y este aviso de permiso se incluirán
            en todos copias o partes sustanciales del Software.
            <br /><br />
            EL SOFTWARE SE PROPORCIONA "TAL CUAL", SIN GARANTÍA DE NINGÚN TIPO,
            EXPRESA O IMPLÍCITAS, INCLUIDAS PERO NO LIMITADAS A LAS GARANTÍAS DE
            COMERCIABILIDAD, APTITUD PARA UN PROPÓSITO PARTICULAR Y NO
            INFRACCIÓN. EN NINGÚN CASO LOS AUTORES O TITULARES DE LOS DERECHOS
            DE AUTOR SERÁN RESPONSABLES DE CUALQUIER RECLAMO, DAÑOS U OTROS
            RESPONSABILIDAD, YA SEA EN UNA ACCIÓN DE CONTRATO, AGRAVIO O DE OTRO
            MODO, QUE SURJA DE, FUERA O EN RELACIÓN CON EL SOFTWARE O EL USO U
            OTROS NEGOCIOS EN EL SOFTWARE.
          </p>
        </q-card-section>

        <q-card-actions align="right" class="bg-white text-primary">
          <q-btn flat label="OK" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>
<script>
import { firebase, db } from "../boot/firebase";

export default {
  name: "Registrar",
  data() {
    return {
      user: {
        displayName: "",
        email: "correo.prueba@ues.edu.sv",
      },
      prefix: "",
      valCheckbox: false,
      persistent: false,
    };
  },
  methods: {
    cancelarSub() {
      this.user
        .delete()
        .then(function () {
          console.log("Se cancela el registro");
        })
        .catch(function (error) {
          console.log("Problemas al tratar de cancelar el registro.", error);
        });
      this.$router.push("/auth");
    },
    aceptar() {
      //Construir usuario
      const usuario = {
        id: this.user.uid,
        nombre: this.user.displayName,
        correo: this.user.email,
        foto: this.user.photoURL,
        prefijo: this.prefix,
      };
      //guardando en el local storage
      localStorage.setItem("prefijo", this.prefix);
      //guardando en firestone
      db.collection("medicos")
        .doc(usuario.id)
        .set(usuario)
        .then(() => {
          console.log("usuario guardado");
          this.$router.push("/");
        })
        .catch((error) => {
          console.error("Error writing document: ", error);
        });
    },
  },
  mounted() {
    //Se carga la información del usuario
    this.user = firebase.auth().currentUser;
    // console.log(this.user);

    //Esto sirve para verificar si el usuario ya estaba loguiado o si es nuevo.
    var docRef = db.collection("medicos").doc(this.user.id);
    docRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          this.$router.push("/");
        } else {
          console.log("Registrate por favor");
        }
      })
      .catch((error) => {
        console.log("Error al tratar de obtener el documento", error);
      });
  },
};
</script>
<style scoped>
.left {
  display: inline-block;
  padding: 0;
  margin: 0%;
  width: 30%;
  height: 100%;
  min-height: 100vh;
  background-color: #3c75ad;
  background-image: radial-gradient(#ffffff 0.5px, transparent 2px);
  background-size: 20px 20px;
}
.rigth {
  display: inline-block;
  padding: 0;
  margin: 0%;
  width: 70%;
  height: 100%;
  min-height: 100vh;
}
.main {
  display: flex;
  align-content: center;
}
.logo {
  padding: 2rem;
  padding-bottom: 0;
  display: flex;
  align-items: center;
}
.logo .q-icon {
  color: #3c75ad;
}
.inputs {
  padding: 2rem;
  text-align: center;
}
.not_allowed {
  pointer-events: none;
  cursor: not-allowed;
  opacity: 0.65;
  -webkit-box-shadow: none;
  box-shadow: none;
}
.q-avatar {
  height: 6rem;
  width: 6rem;
  margin-bottom: 0;
}
h2 {
  font-weight: bold;
  margin: 0%;
}
html {
  height: 100%;
}
body {
  min-height: 100vh;
  padding: 0;
}
</style>