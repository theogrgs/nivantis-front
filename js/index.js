new Vue({ 
    el: '#appBar',
    components : {
        'app-bar' : httpVueLoader('../components/AppBar.vue')
    }
});
new Vue({ 
    el: '#main' ,
    components : {
        'calculatrice' : httpVueLoader('../components/Calculatrice.vue'),
        'pharmacies' : httpVueLoader('../components/Pharmacies.vue')
    }
});
