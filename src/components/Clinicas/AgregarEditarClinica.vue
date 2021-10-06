<template>
  <div class="row q-pa-lg">
    <div class="col-12 col-md-6 q-px-md">
      <q-form class="q-gutter-sm">
        <q-input filled v-model="nombre" label="Nombre" :rules="rules" />
        <q-input
          filled
          v-model="telefono"
          :rules="rules"
          label="Telefono"
          mask="#### - ####"
          hint="#### - ####"
        />
        <q-input filled v-model="direccion.pais" label="Pais" :rules="rules" />
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
      </q-form>
    </div>
    <div class="col-12 col-md-6">
      <div class="row q-mb-sm items-start">
        <div class="col-10">
          <q-input
            filled
            v-model="buscarDireccion"
            label="Direccion"
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
          />
        </div>
      </div>

      <q-card flat style="flex:1">
        <l-map
          v-if="showMap"
          :zoom="zoom"
          :center="center"
          @click="updateMarker"
          style="z-index: 0; height: 75vh; width: 75vh"
        >
          <l-tile-layer :url="url" :attribution="attribution" />
          <l-marker :lat-lng="marker" :icon="defaultMarkerIcon"></l-marker>
        </l-map>
      </q-card>
    </div>
  </div>
</template>

<script>
import { LMap, LMarker, LTileLayer } from "vue2-leaflet";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import { latLng, Icon } from "leaflet";
import axios from "axios";

export default {
  name: "Agregar_Editar_Clinica",
  components: { LMap, LMarker, LTileLayer },
  data() {
    return {
      zoom: 15,
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
    await this.getCurrentLocation();
  },
  methods: {
    async updateMarker(event) {
      this.direccion.lat = event.latlng.lat;
      this.direccion.lng = event.latlng.lng;
      this.marker = latLng(this.direccion.lat, this.direccion.lng);
      this.center = latLng(this.direccion.lat, this.direccion.lng);
      console.log(this.direccion.lat, this.direccion.lng);
      await this.reverseGeocoding();
    },
    async getCurrentLocation() {
      try {
        var coord = await this.$getLocation({});
        this.marker = latLng(coord.lat, coord.lng);
        this.center = latLng(coord.lat, coord.lng);
        this.direccion.lat = coord.lat;
        this.direccion.lng = coord.lng;
        this.zoom = 15;
        await this.reverseGeocoding();
      } catch (error) {
        console.log(error);
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
      console.log(this.direccionApi);
      this.llenarDireccion();
    },
    async fowardGeocoding() {
      try {
        var res = await axios.get(
          "https://us1.locationiq.com/v1/search.php?key=pk.cb6782b8b417bd7495da5c64a0c8780f&q=" +
            encodeURI(this.buscarDireccion) +
            "&limit=1&format=json"
        );
        this.direccion.lat = res.data[0].lat;
        this.direccion.lng = res.data[0].lon;
        this.marker = latLng(this.direccion.lat, this.direccion.lng);
        this.center = latLng(this.direccion.lat, this.direccion.lng);
        await this.reverseGeocoding();
      } catch (error) {
        console.log(error);
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
    }
  }
};
</script>

<style lang="scss" scoped></style>
