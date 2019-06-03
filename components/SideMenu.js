Vue.component('side-menu', {
    props: ['title', 'active', 'pages'],
    methods: {
        goToPage: function (pageName) {
            document.location.href = pageName + '.html';
        },
        w3_close: function () {
            document.getElementById("main").style.marginLeft = "0";
            document.getElementById("mySidebar").style.display = "none";
            document.getElementById("openNav").style.display = "block";
        }
    },
    template: `
    <div class="w3-sidebar w3-light-grey w3-card-4 w3-animate-left" style="display:none" id="mySidebar">
        <div class="w3-bar w3-dark-grey">
            <span class="w3-bar-item w3-padding-16">{{title}}</span>
            <button v-on:click="w3_close()" class="w3-bar-item w3-button w3-right w3-padding-16" title="close Sidebar">&times;</button>
        </div>
        <div class="w3-bar-block">
            <a class="w3-bar-item w3-button" v-for="page in pages" v-on:click="goToPage(page)">{{page}}</a>
        </div>
    </div>
    `
});