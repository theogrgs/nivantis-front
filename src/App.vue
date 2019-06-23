<template>
  <v-app id="app">
    <div id="appBar">
      <app-bar title="Nivantis" :pages="[{name:'Pharmacies',icon:'local_pharmacy'},{name:'Calculatrice',icon:'dialpad'},{name:'Formulaires',icon:'ballot'}]" active="Calculatrice"></app-bar> 
    </div>

    <div id="main">
      <div id="Calculatrice" class="animate-opacity d-block">
        <calculatrice></calculatrice>
      </div>
      <div id="Pharmacies" class="animate-opacity d-none">
        <pharmacies></pharmacies>
      </div>
      <div id="Formulaires" class="animate-opacity d-none">
        <formulaires></formulaires>
      </div>
    </div>
  </v-app>
</template>

<script>
import AppBar from './components/AppBar';
import Calculatrice from "./components/Calculatrice";
import Pharmacies from "./components/Pharmacies";
import Formulaires from './components/Formulaires';


export default {
  name: "App",
  components: {
    AppBar,
    Calculatrice,
    Pharmacies,
    Formulaires
  }
};
</script>

<style>
#main{
  margin-top:64px;
  margin-bottom:2px;
}
@media (max-width: 600px) {
  #main{
    margin-top:2px;
    margin-bottom: 56px;
  }
}
.animate-opacity{
  animation:opac 0.8s
}
@keyframes opac{
  from{opacity:0}
  to{opacity:1}
}
</style>

