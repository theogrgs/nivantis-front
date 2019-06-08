new Vue({ el: "#appBar" });
new Vue({
    el: "#main",
    data: {
        panet: 0,
        tauxremise: 0,
        pabrut: 0,
        pvnet: 0,
        coeff: 0
    },
    computed: {
        panetIF: function () {
            return !(this.pabrut !== 0 && this.pabrut !== '' && !isNaN(this.pabrut) && this.tauxremise !== 0 && this.tauxremise !== '' && !isNaN(this.tauxremise))
        },
        pvnetIF: function () {
            return !(this.panet !== 0 && this.panet !== '' && !isNaN(this.panet) && this.coeff !== 0 && this.coeff !== '' && !isNaN(this.coeff));
        },
        tauxremiseIF: function () {
            return !(this.panet !== 0 && this.panet !== '' && !isNaN(this.panet) && this.pabrut !== 0 && this.pabrut !== '' && !isNaN(this.pabrut));
        },
        coeffIF: function () {
            return !(this.panet !== 0 && this.panet !== '' && !isNaN(this.panet) && this.pvnet !== 0 && this.pvnet !== '' && !isNaN(this.pvnet));
        }
    },
    methods: {
        calcPanet: function () {
            this.panet = (parseFloat(this.pabrut) * ((1 - parseFloat(this.tauxremise) / 100.0)));
        },
        calcTauxremise: function () {
            this.tauxremise = ((1 - (parseFloat(this.panet) / parseFloat(this.pabrut))) * 100.0);
        },
        calcPvnet: function () {
            this.pvnet = (parseFloat(this.panet) * parseFloat(this.coeff));
        },
        calcCoeff: function () {
            this.coeff = (parseFloat(this.pvnet) / parseFloat(this.panet));
        }
    }
});