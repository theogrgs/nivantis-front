Vue.use(Vuetify);
new Vue({el:"#appBar"});
new Vue({el:"#main",
    data: {
        panet : 0,
        tauxremise : 0,
        pabrut : 0,
        pvnet : 0,
        coeff : 0
    },
    methods : {
        calcPanet : function(){
            this.panet = (parseFloat(this.pabrut) * (1 - parseFloat(this.tauxremise)));
        },
        calcTauxremise : function(){
            this.tauxremise = ((1 - (parseFloat(this.panet)/parseFloat(this.pabrut))) * 100.0);
        },
        calcPvnet : function(){
            this.pvnet =  (parseFloat(this.panet) * parseFloat(this.coeff));
        },
        calcCoeff : function(){
            this.coeff =  (parseFloat(this.pvnet) / parseFloat(this.panet));
        }
    }
});