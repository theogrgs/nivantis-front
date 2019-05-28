/*
** Fonction de chargement d'un nouveau composant
*/
//(on conserve au cas ou il y est un bug)
/*function loadComponent(componentName){
    //On crée le script
    console.log(componentName);
    var scriptElement = document.createElement('script');                       
    scriptElement.src = componentUrl+componentName+'/'+componentName+'.js';
    document.body.appendChild(scriptElement);

    //On recharge le script 
    var src = componentUrl+componentName+'/'+componentName+'.js';
    src = $('script[src$="' + src + '"]').attr("src");
    $('script[src$="' + src + '"]').remove();
    $('<script/>').attr('src', src).appendTo('head');
}*/

function navigationController(pageName){
    //Fait une requête pour savoir si elle existe ou pas
    var xhr = new XMLHttpRequest();
    var url = pageUrl+pageName+'/'+pageName+'.html';    
    
    xhr.open('HEAD', url);
    xhr.onreadystatechange = function() {        
        if (xhr.readyState == 4) {                               
            switch(xhr.status) {
                case 200 :
                    document.location.href=url;
                    break;
                default :
                    document.location.href=pageUrl+"notFound/notFound.html";
                    break;
            }
        }
    };
    xhr.send(null);
}