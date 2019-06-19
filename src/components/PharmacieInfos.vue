<template>
  <div class="w3-card w3-section w3-round w3-padding">
    <button class="w3-button w3-block w3-light-grey" v-on:click="toggle(pharmaid)">{{nom}}</button>
    <div :id="pharmaid" class="w3-hide w3-center w3-animate-opacity">
      <header class="w3-container">
        <h5 class="w3-left">{{nom}}</h5>
      </header>
      <div class="w3-container">
        Gérant : {{gerant}}
      </div>
      <footer class="w3-container">
        <p class="w3-left"><i class="material-icons w3-cell-bottom">place</i>{{adresse}}</p>
        <p class="w3-right">{{distance_display}}</p>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  props: ["pharmaid", "nom","lat","lon","gerant","adresse"],
  computed: {
    distance_display : function(){
      const distance = this.distance(this.lat,this.lon,this.$parent.lat,this.$parent.lon,'K');
      var display = "";
      if (distance<1.00){
        display=`${Math.round(distance*1000)}m`;
      } else {
        display=`${distance}km`;
      }
      return display;
    }
  },
  methods: {
    toggle(id) {
      console.log(this.$parent.lat);
      console.log(this.$parent.lon);
      console.log(this.lat);
      console.log(this.lon);
      const x = document.getElementById(id);
      if (x.className.indexOf("w3-show") == -1) {
        x.className += " w3-show";
      } else {
        x.className = x.className.replace(" w3-show", "");
      }
    },
    distance: function(lat1, lon1, lat2, lon2, unit) {
      if (lat1 == lat2 && lon1 == lon2) {
        return 0;
      } else {
        var radlat1 = (Math.PI * lat1) / 180;
        var radlat2 = (Math.PI * lat2) / 180;
        var theta = lon1 - lon2;
        var radtheta = (Math.PI * theta) / 180;
        var dist =
          Math.sin(radlat1) * Math.sin(radlat2) +
          Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        if (dist > 1) {
          dist = 1;
        }
        dist = Math.acos(dist);
        dist = (dist * 180) / Math.PI;
        dist = dist * 60 * 1.1515;
        if (unit == "K") {
          dist = dist * 1.609344;
        }
        if (unit == "N") {
          dist = dist * 0.8684;
        }
        dist = dist.toFixed(2);
        return dist;
      }
    }
  }
};
</script>

<style>
</style>
