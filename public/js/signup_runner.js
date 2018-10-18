$(document).ready(function() {
  var createForm = $("form.signup_runner");
  var firstNameInput = $("input#fname-input");
  var lastNameInput = $("input#lname-input");
  var cityInput = $("input#city-input");
  var sexInput = $("select#sex");
  var dobInput = $("input#dob");
    
    console.log("load signup_runner")

  createForm.on("submit", function(event) {
      console.log("signup_runner submit")
    event.preventDefault();
    var runnerData = {
      firstName: firstNameInput.val().trim(),
      lastName: lastNameInput.val().trim(),
      city: cityInput.val().trim(),
      sex: sexInput.val().trim(),
      dob: dobInput.val().trim()
    };

    if (!runnerData.firstName || !runnerData.lastName || !runnerData.city || !runnerData.sex || !runnerData.dob) {
      return;
    }
    createRunner(runnerData.firstName, runnerData.lastName, runnerData.city, runnerData.sex, runnerData.dob);
      console.log("after function");
    firstNameInput.val("");
    lastNameInput.val("");
    cityInput.val("");
    sexInput.val("");
    dobInput.val("");
  });

  function createRunner(firstName, lastName, city, sex, dob) {
    $.post("/api/create", {
      firstName: firstName,
      lastName: lastName,
      city: city,
      sex: sex,
      dob: dob
    }).then(function(data) {
      window.location.replace(data);
    }).catch(handleLoginErr);
      console.log("inside function");
  }

  function handleLoginErr(err) {
      console.log("signup_runner ERROR");
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
  }
});
