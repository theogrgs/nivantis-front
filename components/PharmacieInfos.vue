<template>
  <div class="w3-card w3-section w3-round w3-padding">
    <button class="w3-button w3-block w3-light-grey" v-on:click="toggle(pharmaid)">{{nom}}</button>
    <div :id="pharmaid" class="w3-hide">
      {{nom}} Bite bite
    </div>
  </div>
</template>

<script>
module.exports = {
  props:['pharmaid','nom'],
  methods: {
    toggle(id) {
      const x = document.getElementById(id);
      if (x.className.indexOf("w3-show") == -1) {
        x.className += " w3-show";
      } else {
        x.className = x.className.replace(" w3-show", "");
      }
    }
  }
};
</script>

<style>

</style>
