<template>
  <div id="app">
    <div id="appBar">
      <app-bar title="Nivantis" :pages="[{name:'Pharmacies',icon:'local_pharmacy'},{name:'Calculatrice',icon:'dialpad'}]" active="Calculatrice"></app-bar> 
    </div>

    <div id="main">
      <div id="Calculatrice" class="w3-animate-opacity w3-show">
        <calculatrice></calculatrice>
      </div>
      <div id="Pharmacies" class="w3-animate-opacity w3-hide">
        <pharmacies></pharmacies>
      </div>
    </div>
  </div>
</template>

<script>
import AppBar from './components/AppBar';
import Calculatrice from "./components/Calculatrice";
import Pharmacies from "./components/Pharmacies";


export default {
  name: "App",
  components: {
    AppBar,
    'calculatrice' : Calculatrice,
    'pharmacies' : Pharmacies
  }
};
</script>

<style></style>

