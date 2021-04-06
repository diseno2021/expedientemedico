import firebase from "firebase/app"
import "firebase/firestore"
import "firebase/auth"

// Agregar configuración firebase:
var firebaseConfig = {
    apiKey: "AIzaSyCPgfJHSrhN-s-lP-uFLUu1oeVmwtUzrzI",
    authDomain: "fpi2020ues.firebaseapp.com",
    databaseURL: "https://fpi2020ues.firebaseio.com",
    projectId: "fpi2020ues",
    storageBucket: "fpi2020ues.appspot.com",
    messagingSenderId: "408122200746",
    appId: "1:408122200746:web:87480d461d32a37755b6d3"
}


let firebaseApp = firebase.initializeApp(firebaseConfig)
let auth = firebase.auth()
let db = firebase.firestore();

export { firebase, auth, db }