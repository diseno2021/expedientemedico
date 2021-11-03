<template>
  <div class="relative-position" :style="visible ? 'height: 92Vh' : ''">
    <div class="row q-pa-lg">
      <div
        class="col-12 col-md-6 q-px-md"
        :style="$q.screen.lt.md ? 'order:2' : ''"
      >
        <q-form class="q-gutter-sm" @submit="botonGuardarEditar">
          <q-input
            filled
            v-model="nombre"
            label="Nombre de la Clinica"
            :rules="rules"
          />
          <q-input
            filled
            v-model="telefono"
            :rules="rules"
            label="Telefono"
            mask="#### - ####"
            hint="#### - ####"
          />
          <q-input
            filled
            v-model="direccion.pais"
            label="Pais"
            :rules="rules"
          />
          <q-input
            filled
            v-model="direccion.departamento"
            label="Departamento"
            :rules="rules"
          />
          <div class="row">
            <div class="col q-pr-sm">
              <q-input
                filled
                v-model="direccion.municipio"
                label="Municipio"
                :rules="rules"
              />
            </div>
            <div class="col q-pl-sm">
              <q-input
                filled
                v-model="direccion.codigoPostal"
                label="Departamento"
                :rules="rules"
              />
            </div>
          </div>
          <q-input
            filled
            v-model="direccion.colonia"
            label="Colonia"
            :rules="rules"
          />
          <q-input
            filled
            v-model="direccion.calle"
            label="Calle"
            :rules="rules"
          />
          <q-input
            filled
            v-model="direccion.referencia"
            label="Punto de referencia"
            hint="Campo Opcional"
          />
          <div class="q-mt-md">
            <q-btn label="Guardar" type="submit" color="primary" />
            <q-btn
              label="Cancelar"
              to="/clinicas"
              color="red"
              flat
              class="q-ml-sm"
            />
          </div>
        </q-form>
      </div>
      <div
        class="col-12 col-md-6 q-px-md"
        :class="$q.screen.lt.md ? 'q-mb-md' : ''"
        :style="$q.screen.lt.md ? 'order:1' : ''"
      >
        <div class="row q-mb-sm items-start">
          <div class="col-10">
            <q-input
              filled
              v-model="buscarDireccion"
              label="Buscar Direccion"
              @keydown.enter="fowardGeocoding"
              hint="Presione la tecla Enter para buscar"
            />
          </div>
          <div class="col-2 text-center">
            <q-btn
              size="lg"
              icon="my_location"
              round
              color="blue-10"
              @click="getCurrentLocation"
            >
              <q-tooltip>Ver Ubicacion Actual</q-tooltip>
            </q-btn>
          </div>
        </div>

        <q-card class="full-width" flat style="flex:1; width:100em">
          <l-map
            ref="map"
            v-if="showMap"
            :zoom="zoom"
            :center="center"
            @click="updateMarker"
            style="z-index: 0; height: 70vh; width: 100%"
          >
            <l-tile-layer :url="url" :attribution="attribution" />
            <l-marker :lat-lng="marker" :icon="defaultMarkerIcon"></l-marker>
          </l-map>
        </q-card>
        <q-banner
          class="bg-positive text-white q-mt-md q-mb-sm"
          dense
          rounded
          style="border-left: 5px solid #0d9403;"
        >
          <template v-slot:avatar>
            <q-icon name="priority_high" color="white" />
          </template>
          <span class="text-weight-bold">
            La busqueda solo cubre el territorio de El Salvador
          </span>
        </q-banner>
        <q-banner
          class="bg-warning text-white"
          dense
          rounded
          style="border-left: 5px solid #fca103;"
        >
          <template v-slot:avatar>
            <q-icon name="warning" color="white" />
          </template>
          <span class="text-weight-bold">
            Por favor coloque el marcador en la ubicacion deseada
          </span>
        </q-banner>
      </div>
    </div>
    <!--loading-->
    <q-inner-loading :showing="visible">
      <q-spinner-cube size="3rem" color="primary" />
      <span
        class=" text-primary
        text-uppercase
        text-overline
        text-weight-bold"
        >Cargando Clinica</span
      >
    </q-inner-loading>
  </div>
</template>

<script>
import { auth, db } from "../../boot/firebase";
import { LMap, LMarker, LTileLayer } from "vue2-leaflet";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import { latLng, Icon } from "leaflet";
import axios from "axios";

export default {
  name: "Agregar_Editar_Clinica",
  components: { LMap, LMarker, LTileLayer },
  data() {
    return {
      visible: true,
      zoom: 17,
      center: latLng(0, 0),
      url: "http://{s}.tile.osm.org/{z}/{x}/{y}.png",
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors: Geolocation by  <a href="https://locationiq.com/attribution">LocationIQ</a> ',
      marker: latLng(0, 0),
      defaultMarkerIcon: new Icon({
        iconUrl: markerIconPng,
        iconSize: [25, 41],
        iconAnchor: [12, 41]
      }),
      showMap: true,
      rules: [
        v => !!v || "Se requiere llenar el campo",
        v =>
          !/(^\s+)|(\s+$)/.test(v) ||
          "No se permiten espacion en blanco al principio y final"
      ],
      nombre: "",
      telefono: "",
      direccion: {
        pais: "",
        departamento: "",
        municipio: "",
        codigoPostal: "",
        colonia: "",
        calle: "",
        referencia: "",
        lat: "",
        lng: ""
      },
      direccionApi: {},
      buscarDireccion: ""
    };
  },
  async created() {
    if (this.$route.params.id != null) {
      await this.obtenerClinica();
    } else {
      await this.getCurrentLocation();
    }
    this.visible = false;
  },
  methods: {
    async updateMarker(event) {
      this.direccion.lat = event.latlng.lat;
      this.direccion.lng = event.latlng.lng;
      this.marker = latLng(this.direccion.lat, this.direccion.lng);
      this.center = latLng(this.direccion.lat, this.direccion.lng);
      await this.reverseGeocoding();
    },
    async getCurrentLocation() {
      try {
        var coord = await this.$getLocation({});
        this.marker = latLng(coord.lat, coord.lng);
        this.center = latLng(coord.lat, coord.lng);
        this.direccion.lat = coord.lat;
        this.direccion.lng = coord.lng;
        this.zoom = 17;
        this.$refs.map.mapObject.setView(this.center, this.zoom);
        await this.reverseGeocoding();
      } catch (error) {
        console.error(error);
        alert(error);
      }
    },
    async reverseGeocoding() {
      var res = await axios.get(
        "https://us1.locationiq.com/v1/reverse.php?key=pk.cb6782b8b417bd7495da5c64a0c8780f&lat=" +
          this.direccion.lat +
          "&lon=" +
          this.direccion.lng +
          "&format=json"
      );
      this.direccionApi = res.data.address;
      this.llenarDireccion();
    },
    async fowardGeocoding() {
      try {
        var res = await axios.get(
          "https://us1.locationiq.com/v1/search.php?key=pk.cb6782b8b417bd7495da5c64a0c8780f&q=" +
            encodeURI(this.buscarDireccion) +
            "&limit=1&countrycodes=sv&format=json"
        );
        this.direccion.lat = res.data[0].lat;
        this.direccion.lng = res.data[0].lon;
        this.marker = latLng(this.direccion.lat, this.direccion.lng);
        this.center = latLng(this.direccion.lat, this.direccion.lng);
        await this.reverseGeocoding();
      } catch (error) {
        console.error(error);
      }
    },
    llenarDireccion() {
      this.direccion.pais = this.direccionApi.country;
      this.direccion.departamento = this.direccionApi.state;
      this.direccion.municipio = this.direccionApi.county;
      this.direccion.calle = this.direccionApi.road;
      this.direccion.codigoPostal = this.direccionApi.postcode;
      if (this.direccionApi.neighbourhood == null) {
        this.direccion.colonia = this.direccionApi.suburb;
      } else if (this.direccionApi.suburb == null) {
        this.direccion.colonia = this.direccionApi.neighbourhood;
      } else {
        this.direccion.colonia =
          this.direccionApi.neighbourhood + ", " + this.direccionApi.suburb;
      }
    },
    async guardarClinica() {
      try {
        const ref = await db.collection("clinicas").add({
          idMedico: auth.currentUser.uid,
          nombre: this.nombre,
          telefono: this.telefono,
          direccion: this.direccion
        });
        this.$q.notify({
          message: "Se creo la clinica satisfactoriamente",
          color: "green",
          icon: "check_circle"
        });
        this.$router.push("/clinicas");
        //console.log(ref.id);
      } catch (error) {
        console.error(error);
        this.$q.notify({
          message: "Se produjo un error al crear la clinica",
          color: "red",
          icon: "error"
        });
      }
    },
    async obtenerClinica() {
      try {
        const snapClinica = await db
          .collection("clinicas")
          .doc(this.$route.params.id)
          .get();
        this.nombre = snapClinica.data().nombre;
        this.telefono = snapClinica.data().telefono;
        this.direccion = snapClinica.data().direccion;
        this.marker = latLng(this.direccion.lat, this.direccion.lng);
        this.center = latLng(this.direccion.lat, this.direccion.lng);
        this.$refs.map.mapObject.setView(this.center, 17);
      } catch (error) {
        console.error(error);
      }
    },
    async editarClinica() {
      try {
        const ref = await db
          .collection("clinicas")
          .doc(this.$route.params.id)
          .update({
            nombre: this.nombre,
            telefono: this.telefono,
            direccion: this.direccion
          });
        this.$q.notify({
          message: "Se edito la clinica satisfactoriamente",
          color: "green",
          icon: "check_circle"
        });
        this.$router.push("/clinicas");
      } catch (error) {
        console.error(error);
        this.$q.notify({
          message: "Se produjo un error al editar la clinica",
          color: "red",
          icon: "error"
        });
      }
    },
    async botonGuardarEditar() {
      if (this.$route.params.id != null) {
        await this.editarClinica();
      } else {
        await this.guardarClinica();
      }
    }
  }
};
</script>

<style lang="scss" scoped></style>
