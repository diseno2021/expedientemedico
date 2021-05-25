import firebase from "firebase/app"
import "firebase/storage";
import "firebase/firestore"
import "firebase/auth"

// Agregar configuración firebase:
var firebaseConfig = {
    apiKey: "AIzaSyD-S8huH8K6xbbNiMYFruzeUfu6KLPeKLY",
    authDomain: "sistemamedico-b3d66.firebaseapp.com",
    databaseURL: "https://fpi2020ues.firebaseio.com",
    projectId: "sistemamedico-b3d66",
    storageBucket: "sistemamedico-b3d66.appspot.com",
    messagingSenderId: "187184703055",
    appId: "1:187184703055:web:56a0a19a52bd0e875e2c3a"
}


let firebaseApp = firebase.initializeApp(firebaseConfig)
let auth = firebase.auth()
let db = firebase.firestore();
let st = firebase.storage();

export { firebase, auth, db, st }
