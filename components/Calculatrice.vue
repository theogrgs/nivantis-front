<template>
<div>
    <div class="w3-row w3-section w3-container">
      <div class="w3-cell" style="width:100%">
        <div class="w3-row w3-section">
          <div class="w3-col" style="width:auto; position:sticky; top:100%"><i class="material-icons">euro_symbol</i>
          </div>
          <div class="w3-rest">
            <label>Prix d'achat net</label>
            <input v-model="panet" class="w3-input" type="number">
          </div>
        </div>
      </div>
      <div class="w3-cell w3-cell-middle w3-container">
        <button :disabled="panetIF" class="w3-button w3-round w3-indigo" v-on:click="calcPanet" style="padding: 6px 8px;">Calculer</button>
      </div>
    </div>
    <div class="w3-row w3-section w3-container">
      <div class="w3-cell" style="width:100%">
        <div class="w3-row w3-section">
          <div class="w3-col" style="width:auto; position:sticky; top:100%"><i class="material-icons">euro_symbol</i>
          </div>
          <div class="w3-rest">
            <label>Prix d'achat brut</label>
            <input v-model="pabrut" class="w3-input" type="number">
          </div>
        </div>
      </div>
      <div class="w3-cell w3-cell-middle w3-container">
        <div style="visibility: hidden; padding:6px 8px;" class="w3-button w3-round w3-indigo">Calculer</div>
      </div>
    </div>
    <div class="w3-row w3-section w3-container">
      <div class="w3-cell" style="width:100%">
        <div class="w3-row w3-section">
          <div class="w3-col" style="width:auto; position:sticky; top:100%"><i class="material-icons">euro_symbol</i>
          </div>
          <div class="w3-rest">
            <label>Prix de vente net</label>
            <input v-model="pvnet" class="w3-input" type="number">
          </div>
        </div>
      </div>
      <div class="w3-cell w3-cell-middle w3-container">
        <button :disabled="pvnetIF" class="w3-button w3-round w3-indigo" v-on:click="calcPvnet" style="padding: 6px 8px;">Calculer</button>
      </div>
    </div>
    <div class="w3-row w3-section w3-container">
      <div class="w3-cell" style="width: 100%">
        <div class="w3-row w3-section">
          <div class="w3-col" style="width:auto; position:sticky; top:100%"><i class="material-icons">loyalty</i>
          </div>
          <div class="w3-rest">
            <label>Taux de remise (%)</label>
            <input v-model="tauxremise" class="w3-input" type="number">
          </div>
        </div>
      </div>
      <div class="w3-cell w3-cell-middle w3-container">
        <button :disabled="tauxremiseIF" class="w3-button w3-round w3-indigo"
          v-on:click="calcTauxremise" style="padding: 8px 8px;">Calculer</button>
      </div>
    </div>
    <div class="w3-row w3-section w3-container">
      <div class="w3-cell" style="width: 100%">
        <div class="w3-row w3-section">
          <div class="w3-col" style="width:auto; position:sticky; top:100%"><i class="material-icons">cancel</i>
          </div>
          <div class="w3-rest">
            <label>Coefficient multiplicateur</label>
            <input v-model="coeff" class="w3-input" type="number">
          </div>
        </div>
      </div>
      <div class="w3-cell w3-cell-middle w3-container">
        <button :disabled="coeffIF" class="w3-button w3-round w3-indigo" v-on:click="calcCoeff" style="padding: 6px 8px;">Calculer</button>
      </div>
    </div>
</div>
</template>

<script>
module.exports = {
    data: function(){
        return {
            panet: 0,
            tauxremise: 0,
            pabrut: 0,
            pvnet: 0,
            coeff: 0
        }
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
}
</script>
