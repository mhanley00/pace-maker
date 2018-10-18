//var path = require("path");
var passport = require("../config/passport");

var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function (app) {
    
    app.get("/", function (req, res) {
        if (req.user) {
            res.redirect("/members");
        }
        res.render("landing");
    });
    
    app.get("/create", isAuthenticated, function (req, res) {
        
        res.render("signup_runner");
    });
    
    app.get("/all_runs", isAuthenticated, function (req, res) {
        
        res.redirect("/runs");
    });

    app.get("/logout", function (req, res) {
        req.logout();
        res.redirect("/");
    });
};
