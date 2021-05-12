<template>
  <div class="login">
    <div class="leftDiv">
      <!-- <div class="top_header_left_side">
        <q-icon name="medication" size="1rem" />
        Consultas médicas
      </div> -->

      <div class="header">
        <!--Content before waves-->
        <div class="inner-header flex">
          <q-icon name="medication" size="2rem" />
          <h4 style="margin: 0">Sistema de consultas</h4>
        </div>

        <!--Waves Container-->
        <div>
          <svg
            class="waves"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            viewBox="0 24 150 28"
            preserveAspectRatio="none"
            shape-rendering="auto"
          >
            <defs>
              <path
                id="gentle-wave"
                d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
              />
            </defs>
            <g class="parallax">
              <use
                xlink:href="#gentle-wave"
                x="48"
                y="0"
                fill="rgba(255,255,255,0.7"
              />
              <use
                xlink:href="#gentle-wave"
                x="48"
                y="3"
                fill="rgba(255,255,255,0.5)"
              />
              <use
                xlink:href="#gentle-wave"
                x="48"
                y="5"
                fill="rgba(255,255,255,0.3)"
              />
              <use xlink:href="#gentle-wave" x="48" y="7" fill="#fff" />
            </g>
          </svg>
        </div>
        <!--Waves end-->
      </div>
      <!--Header ends-->

      <div class="horizontalCenter">
        <h1 style="color: primary" class="mediaQuery970">VirtualDoc</h1>
        <q-avatar>
          <img src="/login/logo.jpg" class="logo" />
        </q-avatar>
        <br />
        <q-btn
          unelevated
          rounded
          color="primary"
          label="Iniciar Sesion con Google"
          icon="img:/login/google.png"
          @click="googleAutenticar"
        />
        <br />
        <br />
        <q-checkbox v-model="valCheckbox" />
        <a
          href="#"
          v-on:click.prevent="persistent = true"
          style="display: inline"
          >Aceptar términos y condiciones</a
        >

        <br />
        <label>
          ¿Todavía no tienes una cuenta?
          <a href="" style="display: inline">Registrate</a>
        </label>
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
              documentación asociados (el "Software"), para tratar en el
              Software sin restricciones, incluidos, entre otros, los derechos
              para usar, copiar, modificar, fusionar, publicar, distribuir,
              sublicenciar y / o vender copias del Software, y para permitir a
              las personas a las que el Software es amueblado para ello, sujeto
              a las siguientes condiciones:
              <br /><br />
              El aviso de copyright anterior y este aviso de permiso se
              incluirán en todos copias o partes sustanciales del Software.
              <br /><br />
              EL SOFTWARE SE PROPORCIONA "TAL CUAL", SIN GARANTÍA DE NINGÚN
              TIPO, EXPRESA O IMPLÍCITAS, INCLUIDAS PERO NO LIMITADAS A LAS
              GARANTÍAS DE COMERCIABILIDAD, APTITUD PARA UN PROPÓSITO PARTICULAR
              Y NO INFRACCIÓN. EN NINGÚN CASO LOS AUTORES O TITULARES DE LOS
              DERECHOS DE AUTOR SERÁN RESPONSABLES DE CUALQUIER RECLAMO, DAÑOS U
              OTROS RESPONSABILIDAD, YA SEA EN UNA ACCIÓN DE CONTRATO, AGRAVIO O
              DE OTRO MODO, QUE SURJA DE, FUERA O EN RELACIÓN CON EL SOFTWARE O
              EL USO U OTROS NEGOCIOS EN EL SOFTWARE.
            </p>
          </q-card-section>

          <q-card-actions align="right" class="bg-white text-primary">
            <q-btn flat label="OK" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>
    <div class="rightDiv">
      <q-carousel
        animated
        v-model="slide"
        navigation
        infinite
        :autoplay="autoplay"
        arrows
        transition-prev="slide-right"
        transition-next="slide-left"
        @mouseenter="autoplay = false"
        @mouseleave="autoplay = 5000"
        data-interval="10"
        height="100vh"
      >
        <template v-slot:navigation-icon="{ active, onClick }">
          <q-btn
            v-if="active"
            size="xl"
            style="padding: 0; margin: 0"
            icon="remove"
            color="white"
            flat
            round
            dense
            @click="onClick"
          />
          <q-btn
            v-else
            size="xs"
            icon="fiber_manual_record"
            color="white"
            flat
            round
            dense
            @click="onClick"
          />
        </template>
        <q-carousel-slide :name="1" img-src="/login/lady-in-white.png" />
        <q-carousel-slide :name="2" img-src="/login/doc.jpg" />
        <q-carousel-slide :name="3" img-src="/login/nayib-amor.jpg" />
        <q-carousel-slide :name="4" img-src="/login/consulta.jpg" />
      </q-carousel>
    </div>
  </div>
</template>

<script>
import { firebase, auth, db } from "../boot/firebase";

export default {
  name: "PageAuth",
  data() {
    return {
      slide: 1,
      autoplay: 5000,
      valCheckbox: false,
      persistent: false,
    };
  },
  methods: {
    googleAutenticar() {
      let provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().languageCode = "es";

      firebase
        .auth()
        .signInWithPopup(provider)
        .then((result) => {
          let token = result.credential.accessToken;
          let user = result.user;
          //console.log(token) // Token
          console.log(user); // User that was authenticated
          //Construir usuario
          const usuario = {
            uid: user.uid,
            nombre: user.displayName,
            correo: user.email,
            foto: user.photoURL,
          };
          //guardando en firestone
          db.collection("usuarios")
            .doc(usuario.uid)
            .set(usuario)
            .then(() => {
              console.log("usuario guardado");
              this.$router.push("/");
            })
            .catch((error) => {
              console.error("Error writing document: ", error);
            });
          this.$router.push("/");
        })
        .catch((err) => {
          console.log(err); // This will give you all the information needed to further debug any errors
        });
    },
    probar: function () {
      console.log(firebase.auth().user.displayName);
    },
  },
};
</script>
<style scoped>
body {
  background-color: #f8f9fb;
}
.rightDiv {
  width: 50%;
  display: inline-block;
  height: 100vh;
}
.leftDiv {
  width: 50%;
  height: 100vh;
  display: inline-block;
  vertical-align: top;
  text-align: center;
}
.login {
  width: 100%;
  height: 100vh;
}
.tabpanel div {
  width: 100%;
  height: 100vh;
  object-fit: cover;
}
h1 {
  font-weight: bold;
  margin: 0%;
  margin-bottom: 2rem;
  text-shadow: 0 0 80px rgb(0 0 0 / 23%);
  color: #3c75ad;
}
.q-avatar {
  height: 10rem;
  width: 10rem;
  margin-bottom: 4rem;
}
.horizontalCenter {
  padding: 2rem;
  position: relative;
  top: 50%;
  transform: translateY(-70%);
}
.q-btn {
  margin: 1rem;
}
.top_header_left_side {
  padding: 0rem;
  padding-left: 1rem;
  box-shadow: 0px -3px 20px 0px #1976d26e;
}

/* para hacer el wave header */
.header {
  position: relative;
  text-align: center;
  background: linear-gradient(to right, #1976d2a1, #c7ceff26);
  color: white;
}
.inner-header {
  height: 5vh;
  width: 100%;
  margin: 0;
  padding: 0;
}

.flex {
  /*Flexbox for containers*/
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.waves {
  position: relative;
  width: 100%;
  height: 5vh;
  margin-bottom: -7px; /*Fix for safari gap*/
  /* min-height: 100px;
  max-height: 150px; */
  /* transform: scale(0.5);
  width: 100rem;
  transform-origin: left; */
}

/* Animation  (waves)*/

.parallax > use {
  animation: move-forever 25s cubic-bezier(0.55, 0.5, 0.45, 0.5) infinite;
}
.parallax > use:nth-child(1) {
  animation-delay: -2s;
  animation-duration: 7s;
}
.parallax > use:nth-child(2) {
  animation-delay: -3s;
  animation-duration: 10s;
}
.parallax > use:nth-child(3) {
  animation-delay: -4s;
  animation-duration: 13s;
}
.parallax > use:nth-child(4) {
  animation-delay: -5s;
  animation-duration: 20s;
}
@keyframes move-forever {
  0% {
    transform: translate3d(-90px, 0, 0);
  }
  100% {
    transform: translate3d(85px, 0, 0);
  }
}
/* fin del wave header */
/*Shrinking for mobile*/
@media (max-width: 974px) and (min-width: 751px) {
  .waves {
    height: 40px;
    min-height: 40px;
  }
  .content {
    height: 30vh;
  }
  .mediaQuery970 {
    margin-bottom: 1rem;
    font-size: 4rem;
  }
}
@media (max-width: 750px) {
  .rightDiv {
    display: none;
    visibility: hidden;
  }
  .leftDiv {
    width: 100vw;
  }
  .mediaQuery970 {
    margin-bottom: 1rem;
    font-size: 4rem;
  }
}
</style>