<template>
  <div class="tabs w3-hide-medium w3-hide-large">
    <div class="w3-bottom w3-bar w3-indigo w3-row w3-padding-small">
      <div class="w3-col w3-center" :id="'navlink'+page.name" :style="'width:'+100*(1/pages.length)+'%;'" :key="page.name" v-for="page in pages" v-on:click="goToPage(page.name)">
        <i v-if="page.name == active" class="material-icons w3-row w3-large">{{page.icon}}</i>
        <i v-else class="material-icons w3-text-black w3-row w3-medium">{{page.icon}}</i>
        <div v-if="page.name == active" class="w3-row w3-small">{{page.name.charAt(0).toUpperCase() + page.name.slice(1)}}</div>
        <div v-else class="w3-row w3-text-black w3-tiny">{{page.name.charAt(0).toUpperCase() + page.name.slice(1)}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["title", "active", "pages"],
  data: function() {
    return {
      activePage: this.active
    };
  },
  afterMount() {
    this.createClasses(this.active);
  },
  methods: {
    goToPage: function(pageName) {
      if (!document.getElementById(pageName).classList.contains("w3-show")) {
        for (let i = 0; i < this.pages.length; i++) {
          document.getElementById(this.pages[i].name).classList.remove("w3-show");
          document.getElementById(this.pages[i].name).classList.add("w3-hide");
          this.activePage = pageName;
          document.getElementById("navlink" + this.pages[i].name).lastElementChild.className = "w3-text-black w3-tiny";
          document.getElementById("navlink" + this.pages[i].name).firstElementChild.className = "material-icons w3-text-black w3-row w3-medium";
        }
        document.getElementById(pageName).classList.add("w3-show");
        document.getElementById("navlink" + pageName).lastElementChild.className = "w3-text-white w3-small";
        document.getElementById("navlink" + pageName).firstElementChild.className = "material-icons w3-row w3-large";
      }
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
</style>
