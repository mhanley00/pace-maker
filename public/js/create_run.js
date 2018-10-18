$(document).ready(function() {
//        $('.modal').modal();

  var createRunForm = $("form.create_run");
  var distanceInput = $("input#p-run-dist");
  var dewPointInput = $("input#p-dew");
  var temperatureInput = $("input#p-temp");
  var windMPHInput = $("input#p-wind-mph");
  var locationInput = $("input#run-location");
  var hourTimeInput = $("input#p-run-hours");
  var minuteTimeInput = $("input#p-run-mins");
  var secondTimeInput = $("input#p-run-secs");
    
    console.log("create_run.js loaded");
    console.log(hourTimeInput);
    console.log(minuteTimeInput);
    console.log(secondTimeInput);

createRunForm.on("submit", function(event) {
//      debugger;
      console.log("run submit clicked");
    event.preventDefault();
      
//    console.log(hourTimeInput.val());
//    console.log(minuteTimeInput);
//    console.log(secondTimeInput);
      
var hourTimeInputINT = parseInt(hourTimeInput.val());
var minuteTimeInputINT = parseInt(minuteTimeInput.val());
var secondTimeInputINT = parseInt(secondTimeInput.val());      
var totalTimeInput = ((hourTimeInputINT * 60 * 60) + (minuteTimeInputINT * 60) + (secondTimeInputINT)); 

console.log("total time input: " + totalTimeInput);
      
    var runData = {
      distance: distanceInput.val(),
      dewPoint: dewPointInput.val(),
      temperature: temperatureInput.val(),
      windMPH: windMPHInput.val(),
      location: locationInput.val().trim(),
      totalTime: totalTimeInput
    };

    if (!runData.distance || !runData.dewPoint || !runData.temperature || !runData.windMPH || !runData.location || !runData.totalTime) {
      return;
    }
    createRun(runData.distance, runData.dewPoint, runData.temperature, runData.windMPH, runData.location, runData.totalTime);

    distanceInput.val("");
    dewPointInput.val("");
    temperatureInput.val("");
    windMPHInput.val("");
    locationInput.val("");
    hourTimeInput.val("");
    minuteTimeInput.val("");
    secondTimeInput.val("");
  });

  function createRun(distance, dewPoint, temperature, windMPH, location, totalTime) {
    $.post("/api/create_run", {
      distance: distance,
      dewPoint: dewPoint,
      temperature: temperature,
      windMPH: windMPH,
      location: location,
      totalTime: totalTime
    }).then(function(data) {
      window.location.replace(data);
        console.log("createRun final function");
    });
  }

  function handleLoginErr(err) {
      console.log("create_run ERROR");
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
  }
});
