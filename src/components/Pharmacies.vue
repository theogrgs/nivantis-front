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
              :nom="pharma.raison_sociale"
              :gerant="pharma.nom_gerant"
              :lat="pharma.latitude"
              :lon="pharma.longitude"
              :adresse="pharma.adresse"
              :ville="pharma.ville"
              :telephone="pharma.telephone"
              :mail="pharma.mail"
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
                //console.log(json.results[i].geometry.location.lat);
                //console.log(json.results[i].geometry.location.lng);
                //${json.results[i].geometry.location.lat}
                //${json.results[i].geometry.location.lng}
                fetch(`http://192.168.43.27:80/officine?latitude=${json.results[i].geometry.location.lat}&longitude=${json.results[i].geometry.location.lng}`).then(function(resp){
                  console.log(resp);
                  if (resp.ok){
                    resp.json().then(function(js){
                      console.log(js);
                      res.push(js);
                    })
                  } else {
                    let goo = json.results[i];
                    console.log(goo)
                    goo.adresse = goo.vicinity;
                    goo.nom_gerant = "Inconnu";
                    goo.telephone = "Inconnu";
                    goo.ville = "";
                    goo.mail = "Inconnu";
                    goo.raison_sociale = goo.name;
                    goo.latitude = goo.geometry.location.lat;
                    goo.longitude = goo.geometry.location.lng;
                    goo.complement_adresse = "";
                    goo.date_adhesion = "";
                    res.push(goo);
                  }
                })
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
</style>
