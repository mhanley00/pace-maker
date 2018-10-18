$(document).ready(function () {
    ajax.get("/members/runs", {
            // params: { //don't need these b/c not passing other args
            //     address: location,
            //     key: googlemapsG
            // }
        })
        .then(function (response) { //response is what's getting returned in das api call
            console.log(`fastest pace: ${response}`);
            fastestPaceG = response.averagePace;
            fastestDistanceG = response.distance;
            fastestTempG = response.temperature;
            fastestWindMPHG = response.windMPH;
            fastestdewPoint = response.dewPoint;
            // $("#fast-pace").html("<div>" + fastestPaceG + "</div>");
        });
});