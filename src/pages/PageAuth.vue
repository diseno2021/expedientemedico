<template>
  <div class="q-pa-md">
    <p>LOGIN</p>

    <q-btn color="primary" @click="googleAutenticar">
      Iniciar Sesion con Google
    </q-btn>
       
  </div>
</template>

<script>
import {firebase, auth, db} from "../boot/firebase";

export default {
  name: "PageAuth",
  methods: {
    googleAutenticar(){
      let provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().languageCode = 'es';         

        firebase
                .auth()
                .signInWithPopup(provider)
                .then((result) => {
                  let token = result.credential.accessToken;
                  let user = result.user;
                    //console.log(token) // Token
                    console.log(user) // User that was authenticated
                    //Construir usuario
                    const usuario={
                      uid: user.uid,
                      nombre:user.displayName,
                      correo: user.email,
                      foto: user.photoURL
                    }
                    //guardando en firestone
                    db.collection("usuarios").doc(usuario.uid).set(usuario)
                    .then(() => {
                        console.log("usuario guardado");
                        this.$router.push("/")
                    })
                    .catch((error) => {
                        console.error("Error writing document: ", error);
                    });

                })
                .catch((err) => {
                  console.log(err); // This will give you all the information needed to further debug any errors
                });

    },
    probar:function(){
      console.log(firebase.auth().user.displayName)
    }
  },
};
</script>