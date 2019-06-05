Vue.component('app-bar', {
  props: ['title', 'active'],
  methods: {
    goToPage: function (pageName) {
      document.location.href = pageName + '.html';
    },
    w3_open: function () {
      document.getElementById("main").style.marginLeft = "180px";
      document.getElementById("mySidebar").style.width = "180px";
      document.getElementById("mySidebar").style.display = "block";
      document.getElementById("openNav").style.display = 'none';
    }
  },
  template: `
  <div class="w3-container w3-indigo w3-cell-row w3-card">
    <button id="openNav" class="w3-button w3-xlarge w3-cell" v-on:click="w3_open()">&#9776;</button>
    <h3 class="h3 w3-cell" style="padding:8px;">{{title}} - {{active.charAt(0).toUpperCase() + active.slice(1)}}</h3>
  </div>
  `
});