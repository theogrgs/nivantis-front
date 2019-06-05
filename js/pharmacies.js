Vue.use(Vuetify);
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
            alert(this.lat)
        },
        onError: function (error) {
            alert('code: ' + error.code + '\n' + 'message: ' + error.message + '\n');
        },
        searchPosition: function () {
            navigator.geolocation.getCurrentPosition(this.onSuccess, this.onError);
        },
        searchPharmas: function () {
            this.service.nearbySearch(
                { location: this.myPosition, radius: 1500, type: ['pharmacy'] },
                function (results, status) {
                    if (status !== 'OK') return;
                    document.getElementById("pharmacies").innerHTML = "";
                    for (let i = 0; i<results.length; i++){
                        document.getElementById("pharmacies").innerHTML+= '<div class="w3-card">'+results[i].name+'</div>';
                    }
                }
            );
        }
    }
});


