<template>
  <div id="app">
    <div id="appBar">
      <app-bar class="w3-hide-small" title="Nivantis" :pages="[{name:'pharmacies',icon:'local_pharmacy'},{name:'calculatrice',icon:'dialpad'}]" active="calculatrice"></app-bar>
      <mobile-tabs title="Nivantis" :pages="[{name:'pharmacies',icon:'local_pharmacy'},{name:'calculatrice',icon:'dialpad'}]" active="calculatrice"></mobile-tabs>
    </div>

    <div id="main">
      <div id="calculatrice" class="w3-animate-opacity w3-show">
        <calculatrice></calculatrice>
      </div>
      <div id="pharmacies" class="w3-animate-opacity w3-hide">
        <pharmacies></pharmacies>
      </div>
    </div>
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld";
import AppBar from './components/AppBar';
import MobileTabs from "./components/MobileTabs";
import Calculatrice from "./components/Calculatrice";
import Pharmacies from "./components/Pharmacies";


export default {
  name: "App",
  components: {
    AppBar,
    MobileTabs,
    'calculatrice' : Calculatrice,
    'pharmacies' : Pharmacies
  }
};
</script>

<style></style>

