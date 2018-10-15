//_________________________________________________________________
//GLOBAL VARS
//---------———————————————————————————————————————————–––––––––––––  
// var userLatG; //keeping these just in case we need them...
// var userLonG;

//_________________________________________________________________
//DARK SKY API W/ BROWSER GEOLOCATION
//---------———————————————————————————————————————————–––––––––––––  

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else { 
        $("#curr-location").html("<div>Geolocation is not supported by this browser.<div>");
    }
}

function showPosition(position) {
    // alert("this is location" + position.coords.latitude+position.coords.longitude) ;
    $("#latitude").html("<div>" + position.coords.latitude + "</div>"); 
    $("#longitude").html("<div>" + position.coords.longitude + "</div>"); 
    // userLatG = position.coords.latitude;
    // userLonG = position.coords.longitude;
    tempInput(position.coords.latitude, position.coords.longitude);
}


//_________________________________________________________________
//DARK SKY API CALL
//---------———————————————————————————————————————————–––––––––––––  
function tempInput(lat, long) {

    console.log("long: " + long);
    console.log("lat: " + lat);
    // var long= lngLatArray[1];
    // var lat= lngLatArray[0];
    console.log("long/lattitude:")
    // console.log(lngLatArray);
    // var long= lngResult;
    // var lat= latResult;
    var queryURL = "https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/"+ darkskyG + "/" + lat + "," + long;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response1) {
        console.log("darkskyAPI:")
        console.log(response1);
        var currentTemp = response1.currently.temperature;
        var currentDew = response1.currently.dewPoint;
        var currentWs = response1.currently.windSpeed;
        
        // Appending weather info onto DOM
        $("#today-temp").html("<div>" + currentTemp + "</div>");

        $("#today-dew").html("<div>" + currentDew + "</div>");

        $("#today-ws").html("<div>" + currentWs + "</div>");
    });
};

$(document).ready(function() {
    getLocation();
});

//_________________________________________________________________
//ADD RUN MODAL
//---------———————————————————————————————————————————–––––––––––––  

$(document).ready(function(){
    $('.modal').modal();
  });


          