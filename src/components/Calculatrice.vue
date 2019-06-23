<template>
  <v-container fluid>
    <v-layout row>
      <v-flex grow pa-1>
        <v-text-field color="indigo" type="number" label="Prix d'achat net" prepend-inner-icon="euro_symbol" v-model="panet"></v-text-field>
      </v-flex>
      <v-flex shrink pa-1>
        <v-btn color="indigo" v-on:click="calcPanet" v-if="!panetIF" fab dark><v-icon>pageview</v-icon></v-btn>
      </v-flex>
    </v-layout>

    <v-layout row>
      <v-flex grow pa-1>
        <v-text-field color="indigo" type="number" label="Prix d'achat brut" prepend-inner-icon="euro_symbol" v-model="pabrut"></v-text-field>
      </v-flex>
    </v-layout>

    <v-layout row>
      <v-flex grow pa-1>
        <v-text-field color="indigo" type="number" label="Prix de vente net" prepend-inner-icon="euro_symbol" v-model="pvnet"></v-text-field>
      </v-flex>
      <v-flex shrink pa-1>
        <v-btn color="indigo" v-on:click="calcPvnet" v-if="!pvnetIF" fab dark><v-icon>pageview</v-icon></v-btn>        
      </v-flex>
    </v-layout>
    
    <v-layout row>
      <v-flex grow pa-1>
        <v-text-field color="indigo" type="number" label="Taux de remise (%)" prepend-inner-icon="loyalty" v-model="tauxremise"></v-text-field>
      </v-flex>
      <v-flex shrink pa-1>
        <v-btn color="indigo" v-on:click="calcTauxremise" v-if="!tauxremiseIF" fab dark><v-icon>pageview</v-icon></v-btn>

      </v-flex>
    </v-layout>
    
    <v-layout row>
      <v-flex grow pa-1>
        <v-text-field color="indigo" type="number" label="Coefficient multiplicateur" prepend-inner-icon="cancel" v-model="coeff"></v-text-field>
      </v-flex>
      <v-flex shrink pa-1>
        <v-btn color="indigo" v-on:click="calcCoeff" v-if="!coeffIF" fab dark><v-icon>pageview</v-icon></v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data: function() {
    return {
      panet: "",
      tauxremise: "",
      pabrut: "",
      pvnet: "",
      coeff: ""
    };
  },
  computed: {
    panetIF: function() {
      return (
        this.pabrut == 0 ||
        this.pabrut == "" ||
        isNaN(this.pabrut) ||
        this.tauxremise == 0 ||
        this.tauxremise == "" ||
        isNaN(this.tauxremise)
      );
    },
    pvnetIF: function() {
      return !(
        this.panet !== 0 &&
        this.panet !== "" &&
        !isNaN(this.panet) &&
        this.coeff !== 0 &&
        this.coeff !== "" &&
        !isNaN(this.coeff)
      );
    },
    tauxremiseIF: function() {
      return !(
        this.panet !== 0 &&
        this.panet !== "" &&
        !isNaN(this.panet) &&
        this.pabrut !== 0 &&
        this.pabrut !== "" &&
        !isNaN(this.pabrut)
      );
    },
    coeffIF: function() {
      return !(
        this.panet !== 0 &&
        this.panet !== "" &&
        !isNaN(this.panet) &&
        this.pvnet !== 0 &&
        this.pvnet !== "" &&
        !isNaN(this.pvnet)
      );
    }
  },
  methods: {
    calcPanet: function() {
      this.panet = (
        parseFloat(this.pabrut) *
        (1 - parseFloat(this.tauxremise) / 100.0)
      ).toFixed(2);
    },
    calcTauxremise: function() {
      this.tauxremise = (
        (1 - parseFloat(this.panet) / parseFloat(this.pabrut)) *
        100.0
      ).toFixed(2);
    },
    calcPvnet: function() {
      this.pvnet = (parseFloat(this.panet) * parseFloat(this.coeff)).toFixed(2);
    },
    calcCoeff: function() {
      this.coeff = (parseFloat(this.pvnet) / parseFloat(this.panet)).toFixed(2);
    }
  }
};
</script>
