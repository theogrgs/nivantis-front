<template>
  <div v-on:load="w3_open()" class="tabs w3-hide-medium w3-hide-large">
    <div class="w3-bottom w3-bar w3-indigo w3-row">
      <a :id="'navlink'+page.name" class="w3-col w3-center" :style="'width:'+100*(1/pages.length)+'%;'" :key="page.name" v-for="page in pages" v-on:click="goToPage(page.name)">
        <i class="material-icons">{{page.icon}}</i>
        {{page.name.charAt(0).toUpperCase() + page.name.slice(1)}}
      </a>
    </div>
  </div>
</template>

<script>
export default {
  props: ["title", "active", "pages"],
  methods: {
    w3_open: function() {
      document.getElementById("mySidebar").style.display = "block";
      document.getElementById("myOverlay").style.display = "block";
    },
    goToPage: function(pageName) {
      this.w3_close();
      if (!document.getElementById(pageName).classList.contains("w3-show")) {
        for (let i = 0; i < this.pages.length; i++) {
          document.getElementById(this.pages[i].name).classList.remove("w3-show");
          document.getElementById(this.pages[i].name).classList.add("w3-hide");

          document.getElementById("navlink"+this.pages[i].name).classList.remove("active-mobile-navlink");
        }
        this.activePage = pageName;
        document.getElementById(pageName).classList.add("w3-show");
        document.getElementById("navlink"+pageName).classList.add("active-mobile-navlink");
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
@media (max-width: 600px) {
  .tabs {
    display: block;
  }
}
.active-mobile-navlink{
  color:indigo;
  background-color: white;
}
</style>
