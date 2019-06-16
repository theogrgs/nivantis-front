<template>
  <div>
    <div id="map"></div>
    <div id="pharmaciesList" class="w3-container w3-section">
        <pharma-infos v-for="pharma in pharmas" :key="pharma.name" :pharmaid="'pharma'+pharmas.indexOf(pharma)" :nom="pharma.name"></pharma-infos>
    </div>
    <i id="refresh" class="material-icons w3-button w3-card w3-circle w3-indigo w3-xlarge" v-on:click="searchPosition()">refresh</i>
  </div>
</template>

<script>
module.exports = {
  data: function(){
    return {
      lat: 0,
      lon: 0,
      pharmas : []
    }        
  },
  components : {
    'pharma-infos' : httpVueLoader('./PharmacieInfos.vue')
  },
  computed: {
    myPosition: function () {
      return new google.maps.LatLng(this.lat, this.lon);
    },
    map: function () {
      return new google.maps.Map(document.getElementById('map'), {
        center: this.myPosition,
        zoom: 15
      });
    },
    service: function () {
      return new google.maps.places.PlacesService(this.map);
    }
  },
  methods: {
    onSuccess: function (position) {
      this.lat = position.coords.latitude;
      this.lon = position.coords.longitude;
      this.pharmas = this.searchPharmas();
    },
    onError: function (error) {
      alert('code: ' + error.code + '\n' + 'message: ' + error.message + '\n');
    },
    searchPosition: function () {
      navigator.geolocation.getCurrentPosition(this.onSuccess, this.onError);
    },
    searchPharmas: function () {
      const res = [];
      this.service.nearbySearch(
        { location: this.myPosition, type: ['pharmacy'], rankBy: google.maps.places.RankBy.DISTANCE },
        function (results, status) {
          if (status !== 'OK') return;
          for (let i = 0; i<results.length; i++){
            res.push(results[i]);
          }
        }
      );
      return res;
    }
  }
}
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
</style>
