Vue.component('app-bar', {
  props: ['title', 'active', 'pages'],
  methods: {
    goToPage: function (pageName) {
      document.location.href = pageName + '.html';
    },
    w3_open: function () {
      document.getElementById("main").style.marginLeft = "180px";
      document.getElementById("mySidebar").style.width = "180px";
      document.getElementById("mySidebar").style.display = "block";
      document.getElementById("openNav").style.display = 'hidden';
    }
  },
  template: `
  <div class="w3-container w3-indigo w3-cell-row">
    <button id="openNav" class="w3-button w3-xlarge w3-cell" v-on:click="w3_open()">&#9776;</button>
    <h3 class="h3 w3-cell">{{title}}</h3>
  </div>
  `
});