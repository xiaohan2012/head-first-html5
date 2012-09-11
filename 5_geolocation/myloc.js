window.onload = getMyLocation;

function getMyLocation(){
    if(navigator.geolocation){
        console.log("here we are");
        navigator.geolocation.getCurrentPosition(displayLocation , geoErrorHandler);
    }
    else{
        console.log("Geo location not support");
    }
}
function displayLocation(position){
    var lat = position.coords.latitude;
    var lon = position.coords.longitude;
    console.log(position);
    var div = document.getElementById("location");
    div.innerHTML = "Your location :" + lat +"(latitude), " + lon + "(longitude)";
}
function geoErrorHandler(err_obj){
    var div = document.getElementById("location");
    div.innerHTML = err_obj.message;
}
