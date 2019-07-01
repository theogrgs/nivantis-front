<template>
  <v-card>
    <v-card-title>
      <h5>Gérant : {{gerant}}</h5>
    </v-card-title>
    <v-card-text>
      <p class="text-xs-center">Tél:{{telephone}}</p>
      <p class="text-xs-center">@:{{mail}}</p>
    </v-card-text>
    <v-container>
      <v-layout row wrap>
        <v-flex grow>
          <v-icon color="red">place</v-icon>
          {{adresse}},{{ville}}
        </v-flex>
        <v-flex shrink>
          <v-icon color="green">directions_walk</v-icon>
          {{distance_display}}
        </v-flex>
      </v-layout>
    </v-container>
  </v-card>
</template>

<script>
export default {
  props: ["pharmaid", "nom", "lat", "lon", "gerant", "adresse","devlat","devlon","telephone","ville","mail"],
  computed: {
    distance_display: function() {
      const distance = this.distance(
        this.lat,
        this.lon,
        this.devlat,
        this.devlon,
        "K"
      );
      var display = "";
      if (distance < 1.0) {
        display = `${Math.round(distance * 1000)}m`;
      } else {
        display = `${distance}km`;
      }
      return display;
    }
  },
  methods: {
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
