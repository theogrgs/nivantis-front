new Vue({ el: '#appBar' });
new Vue({
    el: '#main',
    data: {
        lat: 0,
        lon: 0
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
                    document.getElementById("pharmacies").innerHTML = "";
                    for (let i = 0; i<results.length; i++){
                        document.getElementById("pharmacies").innerHTML+= '<div class="w3-card w3-section w3-round w3-padding w3-center">'+results[i].name+'</div>';
                    }
                }
            );
        }
    }
});


