window.onload = getMyLocation;

var ourCoords = {
    latitude: 47.624851 , 
    longitude: -122.52099,
};

function getMyLocation(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(displayLocation , geoErrorHandler , {enableHighAccuracy : true , timeout : 1});
        navigator.geolocation.getCurrentPosition(displayDistance , geoErrorHandler);
        navigator.geolocation.getCurrentPosition(showMap, geoErrorHandler);
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
    div.innerHTML = "Your location :" + lat +"(latitude), " + lon + "(longitude)" +
        " with " + position.coords.accuracy + " meters' accuracy";
}

function geoErrorHandler(err_obj){
    var div = document.getElementById("location");
    div.innerHTML = err_obj.message;
}

//distance related code
function degreesToRadians(degrees) {
    var radians = (degrees * Math.PI)/180;
    return radians;
}

function computeDistance(startCoords, destCoords) {
    var startLatRads = degreesToRadians(startCoords.latitude);
    var startLongRads = degreesToRadians(startCoords.longitude);
    var destLatRads = degreesToRadians(destCoords.latitude);
    var destLongRads = degreesToRadians(destCoords.longitude);
    var Radius = 6371; // radius of the Earth in km
    var distance = Math.acos(Math.sin(startLatRads) * Math.sin(destLatRads) +
            Math.cos(startLatRads) * Math.cos(destLatRads) *
            Math.cos(startLongRads - destLongRads)) * Radius;
    return distance;
}

function displayDistance(position){
    var distance = computeDistance(position.coords , ourCoords );
    var div = document.getElementById("distance");
    div.innerHTML = "Distance to WickedlySmart is " + distance + " km";
}

/////show map part ///
var map;

function showMap(position){
    var loc = new google.maps.LatLng(position.coords.latitude , position.coords.longitude);
    /*console.log(coords.latitude , coords.longitude);*/
    var mapOptions = {
        center:     loc , 
        zoom:       20  ,
        mapTypeId:  google.maps.MapTypeId.ROADMAP,
    }

    var mapDiv = document.getElementById("map");
    map = new google.maps.Map(mapDiv , mapOptions);
    addMarker(map , loc , "My ISP" , "which is not where I live, expectedly!");
}

function addMarker(map , coords , title , content){
    var markerOptions = {
        position:   coords,
        map :       map,
        title:      title ,
        content:    content,
    }
    var marker = new google.maps.Marker(markerOptions);

    var infoWindowOptions = {
        position:    coords ,
        content :   content,
    }
    var infoWindow = new google.maps.InfoWindow(infoWindowOptions );
    google.maps.event.addListener(marker , "click" , function(){
            infoWindow.open(map);
        });
}
