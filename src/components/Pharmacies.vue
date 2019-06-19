<template>
  <div>
    <div id="map"></div>
    <div id="pharmaciesList" class="w3-container w3-section">
      <pharma-infos
        v-for="pharma in pharmas"
        :key="pharma.name"
        :pharmaid="'pharma'+pharmas.indexOf(pharma)"
        :nom="pharma.name"
        gerant="Jean de la Molfesse"
        :lat="pharma.geometry.location.lat()"
        :lon="pharma.geometry.location.lng()"
        :adresse="pharma.vicinity"
      ></pharma-infos>
    </div>
    <v-btn id="refresh" v-on:click="searchPosition()" fab dark class="w3-indigo">
      <v-icon dark>refresh</v-icon>
    </v-btn>
    <!--<i
      id="refresh"
      class="material-icons w3-button w3-card w3-circle w3-indigo w3-xlarge"
      v-on:click="searchPosition()"
    >refresh</i>-->
  </div>
</template>

<script>
import PharmaInfos from "./PharmacieInfos";

export default {
  data: function() {
    return {
      lat: 0,
      lon: 0,
      pharmas: []
    };
  },
  components: {
    "pharma-infos": PharmaInfos
  },
  computed: {
    myPosition: function() {
      return new google.maps.LatLng(this.lat, this.lon);
    },
    map: function() {
      return new google.maps.Map(document.getElementById("map"), {
        center: this.myPosition,
        zoom: 15
      });
    },
    service: function() {
      return new google.maps.places.PlacesService(this.map);
    }
  },
  methods: {
    onSuccess: function(position) {
      console.log("Getting current position - Success : \n" + position);
      this.lat = position.coords.latitude;
      this.lon = position.coords.longitude;
      this.pharmas = this.searchPharmas();
    },
    onError: function(error) {
      console.log("Getting current position - Error : \n" + error);
      if (error.code == 3) {
        alert(
          "Veuillez activer la géolocalisation géolocalisatrice de la géolocalité svp :)"
        );
      } else {
        alert(
          `code: ${error.code}\nmessage: ${error.message}\n`
        );
      }
    },
    searchPosition: function() {
      console.log("Getting device position...\n");
      navigator.geolocation.getCurrentPosition(this.onSuccess, this.onError, {
        timeout: 2500
      });
    },
    searchPharmas: function() {
      const res = [];
      this.service.nearbySearch({
          location: this.myPosition,
          type: ["pharmacy"],
          rankBy: google.maps.places.RankBy.DISTANCE
        },
        function(results, status) {
          console.log(results);
          if (status !== "OK") {
            alert(status);
          }
          for (let i = 0; i < results.length; i++) {
            res.push(results[i]);
          }
        }
      );
      return res;
    }
  }
};
</script>

<style>
#map {
  display: none;
}
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
  #pharmaciesList {
    margin-bottom: 200px !important;
  }
}
</style>
