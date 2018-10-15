var express = require("express");
var exphbs = require("express-handlebars");
var serveStatic = require("serve-static")
var bodyParser = require("body-parser");
var session = require("express-session");
var passport = require("./config/passport");
var db = require("./models");
// var requirejs = require('requirejs');

var PORT = process.env.PORT || 8080;

//require("dotenv").config();


var app = express();
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(express.static("public"));
app.use(session({
    secret: "keyboard cat",
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(express.urlencoded({
    extended: true
}));
app.use(express.json()); //use anytime you're using req.body

app.engine("handlebars", exphbs({
    defaultLayout: "main"
}));
app.set("view engine", "handlebars");

require("./routes/html-routes.js")(app);
require("./routes/api-routes.js")(app);

require("./controllers/runner_controller")(app);

db.sequelize.sync().then(function () {
    app.listen(PORT, function () {
        console.log("==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.", PORT, PORT);
    });
});
