<template>
    <div>
        <div id="map"></div>
        <div id="pharmaciesList" class="w3-container w3-section">Appuyez sur le bouton en bas à droite pour cherher les officines proches...</div>
        <i id="refresh" class="material-icons w3-button w3-card w3-circle w3-indigo w3-xlarge" v-on:click="searchPosition();searchPharmas();">refresh</i>
    </div>
</template>

<script>
module.exports = {
    data: function(){
        return {
            lat: 0,
            lon: 0
        }        
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
        },
        onError: function (error) {
            alert('code: ' + error.code + '\n' + 'message: ' + error.message + '\n');
        },
        searchPosition: function () {
            navigator.geolocation.getCurrentPosition(this.onSuccess, this.onError);
        },
        searchPharmas: function () {
            this.service.nearbySearch(
                { location: this.myPosition, type: ['pharmacy'], rankBy: google.maps.places.RankBy.DISTANCE },
                function (results, status) {
                    if (status !== 'OK') return;
                    console.log(results);
                    document.getElementById("pharmaciesList").innerHTML = "";
                    for (let i = 0; i<results.length; i++){
                        document.getElementById("pharmaciesList").innerHTML+= '<div class="w3-card w3-section w3-round w3-padding w3-center">'+results[i].name+'</div>';
                    }
                }
            );
        }
    }
}
</script>

<style>
#map{
    display: none;
}

#refresh{
    position: fixed;
    padding: 10px;
    bottom: 15px;
    right: 15px;
}
</style>
