<template>
  <div>
    <q-drawer v-model="state" show-if-above>
      <div class="drawer container">
        <div class="page-title drawer-section row">
          <div class="left-icon title-icon col-2">
            <q-icon name="favorite_border" />
          </div>
          <div>
            <h2>VIRTUALDOC</h2>
          </div>
        </div>
        <div toclass="spacer"></div>

        <q-item clickable to="/" class="drawer-section row drawer-option">
          <div class="left-icon title-icon col-2">
            <q-icon name="people" />
          </div>
          <div class="option-text">Pacientes</div>
          <q-chip color="secondary" class="people-chip" text-color="white">
            {{ pacientes }}
          </q-chip>
        </q-item>

        <agregar_paciente
          :id_doctor="id_usuario"
          class="drawer-section"
        ></agregar_paciente>

        <q-item
          clickable
          to="/clinicas"
          class="drawer-section row drawer-option"
        >
          <div class="left-icon title-icon col-2">
            <q-icon name="local_hospital" />
          </div>
          <div class="option-text">Clinicas</div>
        </q-item>

        <q-item
          clickable
          to="/template"
          class="drawer-section row drawer-option"
        >
          <div class="left-icon title-icon col-2">
            <q-icon name="settings" />
          </div>
          <div class="option-text">Template</div>
        </q-item>
      </div>
    </q-drawer>
  </div>
</template>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Ropa+Sans&display=swap");

.drawer {
  background: radial-gradient(
    50% 50% at 50% 50%,
    #247ca8 0%,
    hsl(200, 75%, 36%) 100%
  );
  color: white;
  font-family: "Ropa Sans";
  height: 100%;
  width: 100%;

  .drawer-section {
    align-items: center;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  .left-icon {
    font-size: 40px;
    margin-right: 10px;
  }
  .spacer {
    height: 40px;
    width: 100%;
  }

  .page-title {
    padding: 20px;

    h2 {
      margin: 0;
      font-size: 40px;
    }
  }

  .people-chip {
    border-radius: 30px;
    margin-left: 10px;
    font-size: 20px;
    font-style: italic;
  }

  .drawer-option {
    margin-top: 20px;
    height: 60px;
    padding: 0 20px;
    background-color: rgba(0, 0, 0, 0.2);
    font-size: 25px;
    transition: all;
    transition-duration: 300ms;
  }

  .drawer-option:hover {
    background-color: rgba(0, 0, 0, 0.8);
  }
}
</style>


<script>
import Agregar_paciente from "../components/Agregar_paciente.vue";
import { auth, db } from "../boot/firebase";
export default {
  components: { Agregar_paciente },
  props: {
    leftDrawerOpen: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      id_usuario: "",
      usuario: null,
      state: this.leftDrawerOpen,
      dark: false,
      pacientes: 0,
      prefix: "",
      link: "",
    };
  },
  methods: {
    mostrarMensaje() {
      //console.log("un mensaje");
      //this.$q.notify(this.user.displayName)
    },
    cambiarRuta() {
      this.link = this.$route.name;
    },
    logout() {
      localStorage.removeItem("prefijo");
      localStorage.removeItem("id_doctor");
      auth
        .signOut()
        .then(() => {
          // Sign-out successful.
          this.$q.notify("Se ha cerrado la sesión");
        })
        .catch((error) => {
          // An error happened.
          this.$q.notify(error);
        });
    },
    cambiarModoDark() {
      this.$q.dark.set(!this.$q.dark.isActive);
    },
    openCloseDrawer() {
      this.state = !this.state;
    },
    async obtenerCantidadDePaciente() {
      try {
        const snapshot = await db
          .collection("pacientes")
          .where("idMedico", "==", auth.currentUser.uid)
          .get();
        this.pacientes = snapshot.size;
      } catch (e) {
        console.error(e);
      }
    },
    prefijo() {
      try {
        db.collection("medicos")
          .doc(this.usuario.uid)
          .get()
          .then((doc) => {
            if (doc.exists) {
              let pref = doc.data().prefijo;
              localStorage.setItem("prefijo", pref);
              this.prefix = pref;
            } else {
              //console.log("No existe Doc");
            }
          })
          .catch((error) => {
            console.error("Error al tratar de obtener el documento", error);
          });
      } catch (error) {}
    },
  },
  async created() {
    this.link = this.$route.path;
    var user = auth.currentUser;
    this.id_usuario = user.uid;

    localStorage.setItem("id_doctor", user.uid);
    if (user) {
      await this.obtenerCantidadDePaciente();
      // User is signed in.
      this.usuario = user;
      var prefijo = localStorage.getItem("prefijo");
      if (prefijo != null) {
        this.prefix = prefijo;
      } else {
        this.prefijo();
      }
    }
  },
};
</script>

