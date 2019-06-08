<template>
  <div>
    <div class="w3-top w3-container w3-indigo w3-cell-row w3-card" id="topbar">
      <button id="openNav" class="w3-button w3-xlarge w3-cell" v-on:click="w3_open()">&#9776;</button>
      <h4 class="w3-cell" style="padding:8px;">{{title}} - {{activePage.charAt(0).toUpperCase()+activePage.slice(1)}}</h4>
    </div>
    <br><br>
    <div class="w3-top w3-sidebar w3-indigo w3-card-4 w3-animate-left" style="display:none;z-index:4;width:auto" id="mySidebar">
      <div class="w3-bar w3-indigo">
        <button v-on:click="w3_close()" class="w3-bar-item w3-button w3-right w3-padding-8" title="close Sidebar">&times;</button>
      </div>
      <div class="w3-bar-block">
        <a class="w3-bar-item w3-button" :key="page.name" v-for="page in pages" v-on:click="goToPage(page.name)">
          <i class="material-icons">{{page.icon}}</i>
          {{page.name.charAt(0).toUpperCase() + page.name.slice(1)}}
        </a>
      </div>        
    </div>
    <div class="w3-overlay w3-animate-opacity" v-on:click="w3_close()" style="cursor:pointer" id="myOverlay"></div>
  </div>
</template>

<script>
  module.exports = {
    props: ['title', 'active', 'pages'],
    data: function(){
      return{
        activePage : this.active
      }
    },
    methods: {
      w3_open: function () {
        document.getElementById("mySidebar").style.display = "block";
        document.getElementById("myOverlay").style.display = "block";
      },
      goToPage: function (pageName) {
        this.w3_close();
        if (document.getElementById(pageName).style.display !== 'block') {
          for(let i=0; i<this.pages.length; i++){
            document.getElementById(this.pages[i].name).style.display = 'none';
          }
          this.activePage = pageName;
          document.getElementById(pageName).style.display = 'block';
        }
      },
      w3_close: function () {
        document.getElementById("myOverlay").style.display = "none";
        document.getElementById("mySidebar").classList.add('animate-right');
        document.getElementById("mySidebar").addEventListener('animationend',function(){
          if(this.classList.contains('animate-right')){
            this.classList.remove('animate-right');
            this.style.display = "none";
          }
        });
        
      }
    }
  }
</script>

<style>
.animate-right{
  animation: menuclose 0.4s;
}
@keyframes menuclose {
  from{
    left:0;
    opacity:1
  } 
  to{
    left:-300px;
    opacity:0
    }
}
</style>
