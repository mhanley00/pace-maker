//$(document).ready(function() {
//    console.log(req.session.passport.user)
//  $.get("/api/user_data").then(function(data) {
//    $(".member-name").text(data.email);
//  });
//});

    //_________________________________________________________________
    //LOAD RIEGEL + DARK SKY
    //---------———————————————————————————————————————————–––––––––––––  
    $(document).ready(function() {
        getLocation();
        velocityRiegel(13.1, 7200, 3.1);
        velocityRiegel(13.1, 7200, 6.2);
        velocityRiegel(13.1, 7200, 13.1);
    });


    //_________________________________________________________________
    //DARK SKY API W/ BROWSER GEOLOCATION
    //---------———————————————————————————————————————————–––––––––––––  

    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
        } else {
            $("#curr-location").append("<div>Geolocation is not supported by this browser.<div>");
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

    function tempInput(lat, long) {

        console.log("long: " + long);
        console.log("lat: " + lat);
        // var long= lngLatArray[1];
        // var lat= lngLatArray[0];
        console.log("long/lattitude:")
        // console.log(lngLatArray);
        // var long= lngResult;
        // var lat= latResult;
        var queryURL = "https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/" + darkskyG + "/" + lat + "," + long;

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
            console.log("TEMP NOW: " + currentTemp);

            $("#today-dew").html("<div>" + currentDew + "</div>");
            console.log("DEW NOW: " + currentDew);

            $("#today-ws").html("<div>" + currentWs + "</div>");
            console.log("WIND NOW: " + currentWs);
        });
    };
    //_________________________________________________________________
    //RIEGEL FORMULA - predicting today's 5k/10k/HMP
    //---------———————————————————————————————————————————–––––––––––––   
    function velocityRiegel(D1, T1, D2) {
        // using Riegel prediction formula t2 = t1 × (d2 / d1)1.06:
        if (D2 === 3.1) {
            tempo = `5k`;
            type = `Speed Work`;
        } else if (D2 === 6.2) {
            tempo = `10k`;
            type = `Short Tempo`;
        } else if (D2 === 13.1) {
            tempo = `HMP`;
            type = `Long Tempo`;
        } else {
            tempo = D2;
            type = "";
        }
        var distances = D2 / D1;
        var distPow = Math.pow(distances, 1.07);
        //1.07 is standard for non-pro runners in Riegel formula
        var T2secs = T1 * distPow; //this is now the new predicted time in seconds
        var T2pace = Math.floor(T2secs / D2);

        console.log("tempo: " + tempo);
        console.log("moment says: " + moment().startOf('day').seconds(T2secs).format('H:mm:ss'));
        $(`#riegel-predicted-time`).append(`<div><b>${tempo}</b>: ${moment().startOf('day').seconds(T2secs).format('H:mm:ss')} </div>`);
        $(`#riegel-predicted-pace`).append(`<div><b>${tempo}</b> ${type}: ${moment().startOf('day').seconds(T2pace).format('mm:ss')} </div>`);
    }

    //end of RIEGEL FORMULA