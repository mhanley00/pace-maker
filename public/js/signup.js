$(document).ready(function() {
  var signUpForm = $("form.signup");
  var emailInput = $("input#email-su-input");
  var passwordInput = $("input#password-su-input");
  var confirmPasswordInput = $("input#confirm-password-su-input");

  signUpForm.on("submit", function(event) {
    event.preventDefault();
    var userData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim(),
      confirmPassword: confirmPasswordInput.val().trim()
    };

    if (!userData.email || !userData.password || !userData.confirmPassword) {
      return;
    }
    else if (userData.password != userData.confirmPassword) {
        alert("Passwords don't match")
        return;
    }
    signUpUser(userData.email, userData.password, userData.confirmPassword);
    emailInput.val("");
    passwordInput.val("");
    confirmPasswordInput.val("");
  });

  function signUpUser(email, password) {
      console.log("suu function")
    $.post("/api/signup", {
      email: email,
      password: password
    }).then(function(data) {
        console.log("windowrep")
      window.location.replace(data);
    }).catch(function(dupl) {
        alert("This email has already been registered")
        console.log(dupl);
    }).catch(function(err) {
        alert("Sign up error")
        console.log(err);
    });
  }

//  function handleLoginErr(err) {
//    $("#alert .msg").text(err.responseJSON);
//    $("#alert").fadeIn(500);
//  }
});
