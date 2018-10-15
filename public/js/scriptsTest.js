var pWindmphG;
var pAvgePaceSecsG;
var pTempG;
var pDewG;
var pAvgePaceSecsG; //pAvgePaceSecsG = cpPace; holds the global var for calculations in seconds
var pWindSecOffsetG;
var pHeatSecOffsetG = [];
var basePaceG; //based on pAvePace but later we subtract wind and heat offsets
var cWindmphG; //FROM API CALL
var cWindSecOffsetG;
var cHeatSecOffsetG = [];

var cTempG; //FROM API CALL
var cDewG; //FROM API CALL

var FinalAdjustedPaceG = []; // final adjusted paces in MM:SS-MM:SS
var FinalAdjustedTimeG;
// var pAGP; // AG% of past race time, calculated/ assinged to function AGCalc
var runnerGenderG;
var runnerAgeG;
// var womens = {
    //     OC:{'5km': [3.1, 886]},
    //     '50': {'5km':[3.1, 0.8937],	
    //     '6km':[6, 0.8914]},
    //     '60': {'5km':[5, 0.77], 
    //     '6km' :[6, .777]}
    //   };

// below for daily pace prediction
var fastestPaceG;
var fastestDistanceG;
var fastestTempG;
var fastestWindMPHG;
var fastestdewPoint;
// object should come back from bd like this:
// leRun = {
//     distance: 3.1,
//     totalTime: 20, //change me to seconds
//     averagePace: 700,
//     temperature: 50,
//     windMPH: 8,
//     dewPoint: 45};

// $(document).ready(function() {
//     ajax.get("/members/runs", {
//         // params: { //don't need these b/c not passing other args
//         //     address: location,
//         //     key: googlemapsG
//         // }
//     })
//     .then(function (response) { //response is what's getting returned in das api call
//         console.log(`fastest pace: ${response}`);
//         fastestPaceG = response.averagePace;
//         fastestDistanceG = response.distance;
//         fastestTempG = response.temperature;
//         fastestWindMPHG = response.windMPH;
//         fastestdewPoint = response.dewPoint;
//         // $("#fast-pace").html("<div>" + fastestPaceG + "</div>");
//     });});

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

$(document).ready(function() {
    getLocation();
    setTimeout(function () {
            console.log('time out');
            runCalculations(); // call function here
        }, 4000); //WILL NEED TIMEOUT HERE
});


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
        
        //Appending weather info onto DOM
        $("#today-temp").html("<div>" + currentTemp + "</div>");

        $("#today-dew").html("<div>" + currentDew + "</div>");

        $("#today-ws").html("<div>" + currentWs + "</div>");
        cWindmphG = currentWs; // see cWindOffset(windMPH2, pPace2)
        cTempG = currentTemp;
        cDewG = currentDew;
    });
};

      





function runCalculations() { //start of massive call. Have snacks on hand.
    //_________________________________________________________________
    //GLOBAL VARIABLES - EXPLANATION BELOW or RIGHT of VAR DECLARATION
    //---------———————————————————————————————————————————–––––––––––––
    // PREVIOUS RUN TIME, DISTANCE, WEATHER // TESTING FOR DB
    var pHoursG = 0; //past run hours from user input
    var pMinutesG = 53; //past run minutes from user input
    var pSecondsG = 53; //past run secons from user input
    // var pRunTimeG = (pHoursG * 60 * 60) + (pMinutesG * 60) + (pSecondsG); // past run time from user input
    var pRunDistG = 6.1; // previous/past run distance from user input
    var pAvgPaceG; //pAvgPaceG is initally in seconds, then renders to MM:SS
    //pAvgePaceSecsG; //pAvgePaceSecsG = cpPace; holds the global var for calculations in seconds
    // var pHoursG = $("#p-run-hours").val(); //past run hours from user input
    // var pMinutesG = $("#p-run-mins").val(); //past run minutes from user input
    // var pSecondsG = $("#p-run-secs").val(); //past run secons from user input
    // // var pRunTimeG = (pHoursG * 60 * 60) + (pMinutesG * 60) + (pSecondsG); // past run time from user input
    // var pRunDistG = $("#p-run-dist").val(); // previous/past run distance from user input
    // var pAvgPaceG; //pAvgPaceG is initally in seconds, then renders to MM:SS
    // //pAvgePaceSecsG; //pAvgePaceSecsG = cpPace; holds the global var for calculations in seconds

    pWindmphG = 8; 
    //these will be the values from the form input
    // pWindmphG = $("#p-wind-mph").val(); //these will be the values from the form input

    pTempG = 63; //HARD CODING FOR TESTING
    pDewG = 54;
    // pTempG = $("#p-temp").val();
    // pDewG = $("#p-dew").val();
    // runnerGenderG = "$("#select-gender").val()";
    // console.log("gender: " + gender);
    // runnerAgeG = $("#age").val();
    // console.log("runnerAgeG: " + runnerAgeG);


    //_________________________________________________________________
    //BASIC PACE CALCULATOR
    //---------———————————————————————————————————————————–––––––––––––

    function paceCalc(distance, hours, minutes, seconds) {
        var distance = parseFloat(distance); //this will come from global variable from form, not (distance)
        var hours = parseFloat(hours); //this will come from global variable from form, not (distance)
        var minutes = parseFloat(minutes); //this will come from global variable from form, not (distance)
        var seconds = parseFloat(seconds); //this will come from global variable from form, not (distance)
        var totalTime = 0;
        totalTime += hours * 3600;
        totalTime += minutes * 60;
        totalTime += seconds;
        var cpPace = Math.floor(totalTime / distance);
        pAvgePaceSecsG = cpPace; //this is updating the global var for calculations in seconds
        var paceMins = Math.floor(cpPace / 60);
        var paceSecs = cpPace - (paceMins * 60);
        if (paceSecs < 10) {
            paceSecs = '0' + paceSecs;
        }
        pAvgPaceG = paceMins + ":" + paceSecs;
        $("#race-pace").html(pAvgPaceG);
        // return pAvgPaceG in seconds don't need to return, this adjusts the global varaible average pace
    }

    //_________________________________________________________________
    //WIND MPH TIME OFFSET - IN SECONDS PER MILE - PAST
    //---------———————————————————————————————————————————–––––––––––––
    function pWindOffset(windMPH, pPace) { //renamed from calculator.js "windOffset()"
        //winOffset will return the wind's impact on runner's time seconds per mile.
        //This does not get written to the DOM. Next we'll add this to the heat/temp offset.
        //45 / 3,600 = 0.0125 hours.
        // var paceMPH = 1 / (pPace / 3600); //dividing seconds per mile by 1 hour (3600")
        paceMins = pPace/60
        var paceMPH = 60/paceMins;
        console.log("paceMPH: ME " + paceMPH);
        var windDivPace = windMPH;
        windDivPace / paceMPH; //step-by-step so Math.pow doesn't freak out
        pWindSecOffsetG = ((12 * (Math.pow(windDivPace, 2)))/60);

        // pWindSecOffsetG/60;
        console.log("pWindSecOffsetG: AFTER DIV " + pWindSecOffsetG);
    }
    //_________________________________________________________________
    //HEAT TIME OFFSET - IN SECONDS PER MILE - PAST
    //---------———————————————————————————————————————————–––––––––––––
    // 100 or less:   no pace adjustment
    // 101 to 110:   0% to 0.5% pace adjustment
    // 111 to 120:   0.5% to 1.0% pace adjustment
    // 121 to 130:   1.0% to 2.0% pace adjustment
    // 131 to 140:   2.0% to 3.0% pace adjustment
    // 141 to 150:   3.0% to 4.5% pace adjustment
    // 151 to 160:   4.5% to 6.0% pace adjustment
    // 161 to 170:   6.0% to 8.0% pace adjustment
    // 171 to 180:   8.0% to 10.0% pace adjustment
    // Above 180:   hard running not recommended
    //This works in repl but not in here: https://repl.it/@mhanley00/Heat-Offset-Sec-Per-Mile
    function pHeatEffect(temperature, dewPoint, basePace) {
        // var temperature;
        // var dewPoint;
        // var basePace;
        var lowHeatEst;
        var highHeatEst;
        var heatScore = parseFloat(temperature) + parseFloat(dewPoint);
        console.log("heatScore: " + heatScore);
        console.log("temperature: " + temperature);
        console.log("dewPoint: " + dewPoint);
        if (heatScore <= 100) {
            lowHeatEst = 0;
            highHeatEst = 0;
            console.log("lowHeatEst: " + lowHeatEst);
        } else if (heatScore >= 101 && heatScore <= 110) {
            lowHeatEst = 0;
            highHeatEst = basePace * .005;
            console.log("lowHeatEst: " + lowHeatEst);
        } else if (heatScore >= 111 && heatScore <= 120) {
            lowHeatEst = basePace * .005;
            highHeatEst = basePace * .01;
            console.log("lowHeatEst: " + lowHeatEst);
        } else if (heatScore >= 121 && heatScore <= 130) {
            lowHeatEst = basePace * .01;
            highHeatEst = basePace * .02;
            console.log("lowHeatEst: " + lowHeatEst);
        } else if (heatScore >= 131 && heatScore <= 140) {
            lowHeatEst = basePace * .02;
            highHeatEst = basePace * .03;
            console.log("lowHeatEst: " + lowHeatEst);
        } else if (heatScore >= 141 && heatScore <= 150) {
            lowHeatEst = basePace * .03;
            highHeatEst = basePace * .045;
            console.log("lowHeatEst: " + lowHeatEst);
        } else if (heatScore >= 151 && heatScore <= 160) {
            lowHeatEst = basePace * .045;
            highHeatEst = basePace * .06;
            console.log("lowHeatEst: " + lowHeatEst);
        } else if (heatScore >= 161 && heatScore <= 170) {
            lowHeatEst = basePace * .06;
            highHeatEst = basePace * .08;
            console.log("lowHeatEst: " + lowHeatEst);
        } else if (heatScore >= 171 && heatScore <= 180) {
            lowHeatEst = basePace * .08;
            highHeatEst = basePace * .1;
            console.log("lowHeatEst: " + lowHeatEst);
        } else {
            return "Head to the pool!"; //write to DOM
        }
        console.log("lowHeatEst: " + lowHeatEst);
        console.log("highHeatEst: " + highHeatEst);
        pHeatSecOffsetG.push(lowHeatEst, highHeatEst);
        console.log('pHeatSecOffsetG: ' + pHeatSecOffsetG);

    }
    //_________________________________________________________________
    //GET BASE PACE
    //---------———————————————————————————————————————————–––––––––––––
    function getBasePace(pace, windOffset, heatOffset) {
        var totalOffset = parseFloat(windOffset) + parseFloat(heatOffset);
        console.log("totalOffset: "+ totalOffset);
        basePaceG = parseFloat(pace) - parseFloat(totalOffset);

    }
//_________________________________________________________________
    //WIND MPH TIME OFFSET - IN SECONDS PER MILE - CURRENT
    //---------———————————————————————————————————————————–––––––––––––
    function cWindOffset(windMPH2, pPace2) {
        //cWindmphG = currentWs; // see Dark Sky API call
        // cTempG = currentTemp;
        // cDewG = currentDew;
        //winOffset will return the wind's impact on runner's time seconds per mile.
        //This does not get written to the DOM. Next we'll add this to the heat/temp offset.
        //45 / 3,600 = 0.0125 hours.
        paceMins = pPace2/60
        var paceMPH = 60/paceMins;
        var windDivPace = windMPH2;
        windDivPace / paceMPH; //step-by-step so Math.pow doesn't freak out
        cWindSecOffsetG = ((12 * (Math.pow(windDivPace, 2)))/60);
        console.log("cWindSecOffsetG: "+ cWindSecOffsetG);

    }
    //_________________________________________________________________
    //HEAT TIME OFFSET - IN SECONDS PER MILE - CURRENT
    //---------———————————————————————————————————————————–––––––––––––
    // 100 or less:   no pace adjustment
    // 101 to 110:   0% to 0.5% pace adjustment
    // 111 to 120:   0.5% to 1.0% pace adjustment
    // 121 to 130:   1.0% to 2.0% pace adjustment
    // 131 to 140:   2.0% to 3.0% pace adjustment
    // 141 to 150:   3.0% to 4.5% pace adjustment
    // 151 to 160:   4.5% to 6.0% pace adjustment
    // 161 to 170:   6.0% to 8.0% pace adjustment
    // 171 to 180:   8.0% to 10.0% pace adjustment
    // Above 180:   hard running not recommended
    //This works in repl but not in here: https://repl.it/@mhanley00/Heat-Offset-Sec-Per-Mile
    function cHeatEffect(temperature, dewPoint, basePace) {
        // var temperature;
        // var dewPoint;
        // var basePace;
        var lowHeatEst;
        var highHeatEst;
        var heatScore = parseFloat(temperature) + parseFloat(dewPoint);
        console.log("NEW heatScore: " + heatScore);
        console.log("NEW temperature: " + temperature);
        console.log("NEW dewPoint: " + dewPoint);
        if (heatScore <= 100) {
            lowHeatEst = 0;
            highHeatEst = 0;
            console.log("lowHeatEst: " + lowHeatEst);
        } else if (heatScore >= 101 && heatScore <= 110) {
            lowHeatEst = 0;
            highHeatEst = basePace * .005;
            console.log("lowHeatEst: " + lowHeatEst);
        } else if (heatScore >= 111 && heatScore <= 120) {
            lowHeatEst = basePace * .005;
            highHeatEst = basePace * .01;
            console.log("lowHeatEst: " + lowHeatEst);
        } else if (heatScore >= 121 && heatScore <= 130) {
            lowHeatEst = basePace * .01;
            highHeatEst = basePace * .02;
            console.log("lowHeatEst: " + lowHeatEst);
        } else if (heatScore >= 131 && heatScore <= 140) {
            lowHeatEst = basePace * .02;
            highHeatEst = basePace * .03;
            console.log("lowHeatEst: " + lowHeatEst);
        } else if (heatScore >= 141 && heatScore <= 150) {
            lowHeatEst = basePace * .03;
            highHeatEst = basePace * .045;
            console.log("lowHeatEst: " + lowHeatEst);
        } else if (heatScore >= 151 && heatScore <= 160) {
            lowHeatEst = basePace * .045;
            highHeatEst = basePace * .06;
            console.log("lowHeatEst: " + lowHeatEst);
        } else if (heatScore >= 161 && heatScore <= 170) {
            lowHeatEst = basePace * .06;
            highHeatEst = basePace * .08;
            console.log("lowHeatEst: " + lowHeatEst);
        } else if (heatScore >= 171 && heatScore <= 180) {
            lowHeatEst = basePace * .08;
            highHeatEst = basePace * .1;
            console.log("lowHeatEst: " + lowHeatEst);
        } else {
            return "Head to the pool!"; //write to DOM
        }
        console.log("CURRENT lowHeatEst: " + lowHeatEst);
        console.log("CURRENT highHeatEst: " + highHeatEst);
        cHeatSecOffsetG.push(lowHeatEst, highHeatEst);
        console.log('CURRENT pHeatSecOffsetG: ' + pHeatSecOffsetG);

    }

    //_________________________________________________________________
  //ADJUST BASE PACE VIA CURRENT TEMP, WIND
  //---------———————————————————————————————————————————–––––––––––––
  
  function adjustedPace (basePace, windOffsetSeconds, heatOffsetRange) {
    var windAdjustedPace = basePace + windOffsetSeconds;
    var cpPace = Math.floor(windAdjustedPace);
    
    for (var i = 0; i< heatOffsetRange.length; i++) {
        windAndHeat = windAdjustedPace + heatOffsetRange[i]; 
    //   paceMins = Math.floor (cpPace/60);
    //   paceSecs = cpPace - (paceMins*60);
    //   if (paceSecs < 10) {
    //       paceSecs = '0'+ paceSecs;
    //     }
    //   formattedPace = paceMins + ":" + paceSecs;
    FinalAdjustedPaceG.push(windAndHeat);
    console.log("FinalAdjustedPaceG: " + FinalAdjustedPaceG);
    paceMins = Math.floor (FinalAdjustedPaceG[0]/60);
      paceSecs = FinalAdjustedPaceG[0] - (paceMins*60);
      if (paceSecs < 10) {
          paceSecs = '0'+ paceSecs;
        }
      formattedPace = paceMins + ":" + paceSecs;
    }
    $("#predicted-pace").html(formattedPace);
  }
  
  function predictRunTime (pastPace, pastDistace){
    adjustedTime = Math.floor(pastPace*pastDistace);
    var paceMins = Math.floor(adjustedTime/60);
    var paceSecs = adjustedTime - (paceMins * 60);
    Math.round(paceSecs);
    if (paceSecs < 10) {
        paceSecs = '0' + paceSecs;
    }
    FinalAdjustedTimeG = paceMins + ":" + paceSecs;

    $("#predicted-time").html(FinalAdjustedTimeG);
  }

  //_________________________________________________________________
  //AG% CALCULATOR
  //---------———————————————————————————————————————————–––––––––––––

  function AGCalc (gender, age, distance, hours, minutes, seconds) {
    age = parseFloat(age), totalTime = parseFloat((hours*60*60) + (minutes*60)+ seconds);
    if (gender === 'm'){
      var offset = mens[age][distance][1];
      var AGadj = (mens['OC'][distance][1])/offset;
      pAGP = AGadj/totalTime;
    }
    if (gender === 'f'){
      var offset = womens[age][distance][1];
      var AGadj = (womens['OC'][distance][1])/offset;
      pAGP = AGadj/totalTime;
    }
     $("#race-ag").html(pAGP);
     
    }
    console.log("Your AG% is: " +AGCalc('f', 50, '5km', 3000));



    //_________________________________________________________________
    //GRAND FINALE - CALL CALCULATION FUNCTIONS
    //---------———————————————————————————————————————————–––––––––––––
    paceCalc(pRunDistG, pHoursG, pMinutesG, pSecondsG);
    pWindOffset(pWindmphG, pAvgePaceSecsG);
    pHeatEffect(pTempG, pDewG, pAvgePaceSecsG);
    console.log(pWindSecOffsetG);
    console.log(pHeatSecOffsetG);
    getBasePace(pAvgePaceSecsG, pWindSecOffsetG, pHeatSecOffsetG);
    console.log("BASE PACE: " +basePaceG); //note: basePaceG is in seconds for base calculations
    cWindOffset(cWindmphG, basePaceG);
    console.log("cWindSecOffsetG: " + cWindSecOffsetG);
    cHeatEffect(cTempG, cDewG, basePaceG);
    console.log(cHeatSecOffsetG);
    adjustedPace(basePaceG, cWindSecOffsetG, cHeatSecOffsetG);
    console.log("FinalAdjustedPaceG: " + FinalAdjustedPaceG);
    predictRunTime (FinalAdjustedPaceG[0], pRunDistG);
    AGCalc (runnerGenderG, runnerAgeG, pRunDistG, pHoursG, pMinutesG, pSecondsG);



} // end of function runCalculations (