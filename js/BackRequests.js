function findOfficineById(id) {
    var xmlHttp = new XMLHttpRequest();
    let res;
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            res = xmlHttp.response;
    }
    xmlHttp.open("GET", "http://192.168.43.27:8080/officine/" + id + "&null", false); // true for asynchronous 
    xmlHttp.send(null);
    res = JSON.parse(res);
    console.log(res);
    return res;
}

function findOfficinesByCoords(listeCoords) {
    var xhr = new XMLHttpRequest();
    let officines;
    xhr.open("POST", "http://192.168.43.27:8080/officines", false);
    //Send the proper header information along with the request
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = function () { // Call a function when the state changes.
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            officines = xhr.response;
        }
    }
    xhr.send(listeCoords);
    officines = JSON.parse(officines);
    console.log(officines);
    return officines;
}
/* format listeCoords :
{
    {
        lat:<LAT>,
        lon:<LON>
    },
    ...
}
*/