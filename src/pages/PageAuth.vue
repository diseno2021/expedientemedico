<template>
  <div class="q-pa-md">
    <div class="leftDiv">
      <p>LOGIN</p>

      <q-btn color="primary" @click="googleAutenticar">
        Iniciar Sesion con Google
      </q-btn>
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
        @mouseleave="autoplay = 3500"
        data-interval="10"
      >
        <q-carousel-slide
          :name="1"
          img-src="https://cdn.quasar.dev/img/mountains.jpg"
        />
        <q-carousel-slide
          :name="2"
          img-src="https://cdn.quasar.dev/img/parallax1.jpg"
        />
        <q-carousel-slide
          :name="3"
          img-src="https://cdn.quasar.dev/img/parallax2.jpg"
        />
        <q-carousel-slide
          :name="4"
          img-src="https://cdn.quasar.dev/img/quasar.jpg"
        />
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
      autoplay: 3500,
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
.rightDiv {
  width: 60%;
  display: inline-block;
}
.leftDiv {
  width: 40%;
  display: inline-block;
}
</style>