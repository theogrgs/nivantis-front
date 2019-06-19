<template>
  <div>
    <v-toolbar id="navbig" fixed dark class="w3-hide-small w3-indigo">
      <v-toolbar-side-icon @click="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title class="white--text">Nivantis - {{this.activePage}}</v-toolbar-title>
    </v-toolbar>
    <v-navigation-drawer class="w3-hide-small w3-indigo" v-model="drawer" dark absolute temporary>
      <v-list class="pa-1">
        <v-list-tile>
          <v-list-tile-content>Nivantis</v-list-tile-content>
          <v-list-tile-action @click.stop="drawer = !drawer">
            <v-btn flat icon class="w3-indigo">
              <v-icon>close</v-icon>
            </v-btn>
          </v-list-tile-action>
        </v-list-tile>
      </v-list>
      <v-divider></v-divider>
      <v-list class="pt-0">
        <v-list-tile v-for="page in pages" :key="page.name" @click="goToB(page.name)">
          <v-list-tile-action>
            <v-icon>{{page.icon}}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{page.name}}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-bottom-nav
      id="navmobile"
      class="w3-indigo w3-hide-large w3-hide-medium"
      dark
      :value="true"
      fixed
      shift
    >
      <v-btn :key="page.name" v-for="page in pages" v-on:click="goTo(page.name)" dark grow>
        <span>{{page.name}}</span>
        <v-icon>{{page.icon}}</v-icon>
      </v-btn>
    </v-bottom-nav>
  </div>
</template>

<script>
export default {
  props: ["title", "active", "pages"],
  data: function() {
    return {
      activePage: this.active,
      drawer: null
    };
  },
  mounted: function() {
    document.getElementById(
      "main"
    ).style.marginBottom = document.getElementById("navmobile").style.height;
    document.getElementById("main").style.marginTop = document.getElementById(
      "navbig"
    ).style.height;
  },
  methods: {
    goTo: function(pageName) {
      if (!document.getElementById(pageName).classList.contains("w3-show")) {
        for (let i = 0; i < this.pages.length; i++) {
          document
            .getElementById(this.pages[i].name)
            .classList.remove("w3-show");
          document.getElementById(this.pages[i].name).classList.add("w3-hide");
        }
        this.activePage = pageName;
        document.getElementById(pageName).classList.add("w3-show");
        document.getElementById(pageName).classList.remove("w3-hide");
      }      
    },
    goToB: function(pageName){
      this.goTo(pageName);
      this.drawer = !this.drawer;
    }
  }
};
</script>

<style scoped>
* {
  text-transform: none !important;
}
</style>
