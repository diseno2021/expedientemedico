<template>
  <div>
    <q-btn
      v-if="!state"
      round
      class="activate-btn"
      @click="state = true"
      size="xl"
      icon="favorite_border"
    />

    <agregar_paciente
      :id_doctor="id_usuario"
      ref="newPatientForm"
    ></agregar_paciente>

    <q-drawer
      v-model="state"
      @mouseenter="collapsed = false"
      @mouseleave="collapsed = true"
      :mini="collapsed"
      :mini-width="80"
    >
      <template v-slot:mini>
        <div class="drawer container">
          <div class="page-title drawer-section">
            <div class="left-icon">
              <q-icon name="favorite_border" />
            </div>
          </div>

          <div toclass="spacer"></div>

          <div class="page-title drawer-section drawer-option">
            <div class="left-icon">
              <q-icon name="people" />
            </div>
          </div>

          <div class="drawer-section row drawer-option">
            <div class="left-icon">
              <q-icon name="person_add" />
            </div>
          </div>

          <div class="drawer-section row drawer-option">
            <div class="left-icon">
              <q-icon name="local_hospital" />
            </div>
          </div>

          <div class="drawer-section row drawer-option">
            <div class="left-icon">
              <q-icon name="settings" />
            </div>
          </div>

          <div class="fixed-bottom q-mb-xl" v-if="usuario != null">
            <div class="drawer-section row">
              <div class="left-icon">
                <q-icon name="nights_stay" />
              </div>
            </div>

            <div class="drawer-section">
              <q-avatar class="left-icon">
                <img :src="usuario.photoURL" />
              </q-avatar>
            </div>
          </div>
        </div>
      </template>

      <div class="drawer container">
        <div class="page-title drawer-section row">
          <div class="left-icon col-2">
            <q-icon name="favorite_border" />
          </div>
          <div>
            <h2>VIRTUALDOC</h2>
          </div>
        </div>
        <div toclass="spacer"></div>

        <q-item clickable to="/" class="drawer-section row drawer-option">
          <div class="left-icon col-2">
            <q-icon name="people" />
          </div>
          <div class="option-text">Pacientes</div>
          <q-chip
            color="secondary"
            class="people-chip onDrawerCollapsed"
            text-color="white"
          >
            {{ pacientes }}
          </q-chip>
        </q-item>

        <q-item
          clickable
          @click="$refs.newPatientForm.open()"
          class="drawer-section row drawer-option"
        >
          <div class="left-icon col-2">
            <q-icon name="person_add" />
          </div>
          <div class="option-text">Nuevo Paciente</div>
        </q-item>

        <q-item
          clickable
          to="/clinicas"
          class="drawer-section row drawer-option"
        >
          <div class="left-icon col-2">
            <q-icon name="local_hospital" />
          </div>
          <div class="option-text">Clinicas</div>
        </q-item>

        <q-item
          clickable
          to="/template"
          class="drawer-section row drawer-option"
        >
          <div class="left-icon col-2">
            <q-icon name="settings" />
          </div>
          <div class="option-text">Template</div>
        </q-item>

        <div class="fixed-bottom q-mb-xl" v-if="usuario != null">
          <!-- <q-separator /> -->

          <q-item class="drawer-section row">
            <div class="left-icon col-2">
              <q-icon name="nights_stay" />
            </div>
            <div class="option-text">Modo Oscuro</div>
            <q-item-section side>
              <q-toggle color="dark" v-model="dark" @input="cambiarModoDark" />
            </q-item-section>
          </q-item>

          <q-item class="drawer-section row">
            <q-avatar class="left-icon">
              <img :src="usuario.photoURL" />
            </q-avatar>
            <div class="col-8">
              <div class="letraDisplaynamepequenia">
                {{ prefix }} {{ usuario.displayName }}
              </div>
              <div class="row text-caption text-weight-light letraEmail">
                {{ usuario.email }}
              </div>
            </div>
            <q-btn flat round color="white" icon="logout" @click="logout">
              <q-tooltip anchor="center right" self="center left">
                Cerrar Sesion
              </q-tooltip>
            </q-btn>
          </q-item>
        </div>
      </div>
    </q-drawer>
  </div>
</template>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Ropa+Sans&display=swap");

.activate-btn {
  z-index: 100;
  bottom: 30px;
  left: 30px;
  position: fixed;
  top: 100;
  color: white;
  background: radial-gradient(
    50% 50% at 50% 50%,
    #247ca8 0%,
    hsl(200, 75%, 36%) 100%
  );
}

.drawer {
  background: radial-gradient(
    50% 50% at 50% 50%,
    #247ca8 0%,
    hsl(200, 75%, 36%) 100%
  );
  height: 100%;
  width: 100%;
  color: white;
  font-family: "Ropa Sans";
  transition: all 0.5s ease;

  overflow: hidden;

  .spacer {
    height: 40px;
    width: 100%;
  }

  .page-title {
    padding: 20px;
  }

  .drawer-section {
    align-items: center;
    font-size: 25px;
    padding: 0 20px;
    width: 100%;
    height: 60px;
    overflow: hidden;
  }

  .left-icon {
    font-size: 40px;
    margin-right: 10px;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  .drawer-option {
    margin-top: 20px;
    height: 60px;
    background-color: rgba(0, 0, 0, 0.2);
    transition: all;
    transition-duration: 300ms;
  }

  .drawer-option:hover {
    background-color: rgba(0, 0, 0, 0.8);
  }

  .page-title {
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

  .letraDisplaynamepequenia {
    font-size: 15px;
  }

  .letraEmail {
    font-size: 15px;
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
      newPatient: false,
      collapsed: true,
      id_usuario: "",
      usuario: null,
      state: true,
      dark: false,
      pacientes: 0,
      prefix: "",
      link: "",
    };
  },

  methods: {
    mostrarMensaje() {
      //console.log("un mensaje");`
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
    if (window.innerWidth < 1024) {
      this.state = false;
    }

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

