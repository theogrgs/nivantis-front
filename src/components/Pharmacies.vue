<template>
  <div>
    <div id="map" class="hidden-xs-and-up"></div>
    <v-container>
      <v-layout column>
        <v-expansion-panel popout expand>
          <v-expansion-panel-content
            v-for="pharma in pharmas"
            :key="pharma.name"
            expand-icon="local_pharmacy"
          >
            <template v-slot:header>
              <div>{{pharma.name}}</div>
            </template>
            <pharma-infos
              :devlat="lat"
              :devlon="lon"
              :pharmaid="'pharma'+pharmas.indexOf(pharma)"
              :nom="pharma.name"
              gerant="Jean de la Molfesse"
              :lat="pharma.geometry.location.lat"
              :lon="pharma.geometry.location.lng"
              :adresse="pharma.vicinity"
            ></pharma-infos>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-layout>
    </v-container>
    <v-btn id="refresh" v-on:click="searchPosition" fab dark color="indigo">
      <v-icon dark>refresh</v-icon>
    </v-btn>
  </div>
</template>

<script>
import PharmaInfos from "./PharmacieInfos";
import PullTo from "vue-pull-to";

export default {
  data: function() {
    return {
      lat: 0,
      lon: 0,
      pharmas: []
    };
  },
  components: {
    PharmaInfos,
    PullTo
  },
  methods: {
    geolocationSuccess: function(position) {
      this.lat = position.coords.latitude;
      this.lon = position.coords.longitude;
      this.pharmas = this.searchPharmas();
    },
    geolocationError: function(error) {
      console.log(error);
      if (error.code == 3) {
        alert(
          "Veuillez activer la géolocalisation géolocalisatrice de la géolocalité svp :)"
        );
      } else {
        alert(`code: ${error.code}\nmessage: ${error.message}\n`);
      }
    },
    searchPosition: function() {
      navigator.geolocation.getCurrentPosition(
        this.geolocationSuccess,
        this.geolocationError,
        { timeout: 5000 }
      );
    },
    searchPharmas: function() {
      const res = [];
      fetch(
        "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" +
          this.lat +
          "," +
          this.lon +
          "&rankby=distance&type=pharmacy&key=AIzaSyDxWZwNUysm95GtigT_oznJgeayse8wq2s"
      )
        .then(function(response) {
          if (response.ok) {
            response.json().then(function(json) {
              for (let i = 0; i < json.results.length; i++) {
                res.push(json.results[i]);
              }
            });
          } else {
            console.log("Mauvaise réponse du réseau");
          }
        })
        .catch(function(error) {
          console.log(error);
          alert(
            "Il y a eu un problème avec l'opération fetch: " + error.message
          );
        });
      return res;
    }
  }
};
</script>

<style>
#refresh {
  position: fixed;
  padding: 10px;
  bottom: 15px;
  right: 15px;
}
@media (max-width: 600px) {
  #refresh {
    position: fixed;
    padding: 10px;
    top: 15px;
    bottom: auto;
    right: 15px;
  }
}
</style>
