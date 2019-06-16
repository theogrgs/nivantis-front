<template>
  <div>
    <div class="w3-bottom w3-bar w3-indigo w3-row">
      <div class="w3-third w3-bar-item w3-button" v-on:click="openPage()"></div>
      <div class="w3-third"></div>
      <div class="w3-third"></div>
    </div>
  </div>
</template>

<script>
module.exports = {
  props: ["title", "active", "pages"],
  methods: {
    w3_open: function() {
      document.getElementById("mySidebar").style.display = "block";
      document.getElementById("myOverlay").style.display = "block";
    },
    goToPage: function(pageName) {
      this.w3_close();
      if (document.getElementById(pageName).style.display !== "block") {
        for (let i = 0; i < this.pages.length; i++) {
          document.getElementById(this.pages[i].name).style.display = "none";
        }
        this.activePage = pageName;
        document.getElementById(pageName).style.display = "block";
      }
    },
    w3_close: function() {
      document.getElementById("myOverlay").style.display = "none";
      document.getElementById("mySidebar").classList.add("animate-right");
      document
        .getElementById("mySidebar")
        .addEventListener("animationend", function() {
          if (this.classList.contains("animate-right")) {
            this.classList.remove("animate-right");
            this.style.display = "none";
          }
        });
    }
  }
};
</script>

<style>
.animate-right {
  animation: menuclose 0.4s;
}
@keyframes menuclose {
  from {
    left: 0;
    opacity: 1;
  }
  to {
    left: -300px;
    opacity: 0;
  }
}
</style>
