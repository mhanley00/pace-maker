var passport = require("../config/passport");
var path = require("path");
var db = require("../models");
var isAuthenticated = require("../config/middleware/isAuthenticated");


module.exports = function (app) {

    app.post("/api/signup", function (req, res) {
        console.log("signupapi")
        console.log(req.body);
        db.User.create({
            email: req.body.email,
            password: req.body.password
        }).then(function () {
            res.redirect(307, "/api/create_runner");
        }).catch(function (dupl) {
            if (dupl.parent.errno == 1062) {
                console.log("This email has already been registered")
                res.redirect(dupl);
            }
        }).catch(function (err) {
            console.log("signup api error");
            console.log(err);
//          res.json(err);
            res.redirect(err);
            return;
        });
    });
    
    app.post("/api/create", function (req, res) {
        console.log("createapi")
        console.log(req.body);
        db.Runner.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            city: req.body.city,
            sex: req.body.sex,
            dob: req.body.dob,
            UserId: req.user.id
        }).then(function () {
            res.redirect(307, "/api/runner_created");
        }).catch(function (err) {
            console.log("create runner api error");
            console.log(err);
            res.json(err);
        });
    });
    
    app.post("/api/create_run", function (req, res) {
        console.log("runapi")
        console.log(req.body);
        db.Run.create({
            distance: req.body.distance,
            dewPoint: req.body.dewPoint,
            temperature: req.body.temperature,
            windMPH: req.body.windMPH,
            location: req.body.location,
            totalTime: req.body.totalTime,
            RunnerId: req.user.id
        })
//            .then(function () {
//            res.redirect(307, "/");
//        })
            .catch(function (err) {
            console.log(err);
            res.json(err);
        });
    });    


    app.get("/members", isAuthenticated, function (req, res) {
        db.User.findAll({
                where: {
                    id: req.user.id
                }
            })
            .then(function (dbUser) {
                console.log("dbUser");
                console.log(dbUser);
                var data = {
                    User: dbUser,
//                    Runner: dbrunners,
                    //            runs: dbruns
                };
                console.log(req.user)
                console.log(data)
                return res.render("members", data);

                // INCLUDE ERROR HANDLING: IF NO DATA, REDIRECT TO LOGIN

            });
    });


   app.get("/members", isAuthenticated, function (req, res) {
    db.User.findAll({
            where: {
                id: req.user.id
            }
        })
        .then(function (dbUser) {
            console.log("dbUser");
            console.log(dbUser);

            db.Runner.findAll({
                    where: {
                        UserId: req.user.id
                    }
                })
                .then(function (dbRunner) {
                    console.log("dbRunner");
                    console.log(dbRunner);
                    var data = {
                        User: dbUser,
                        Runner: dbRunner,
                        //            runs: dbruns
                    };
                    console.log(req.user)
                    console.log(data)
                    return res.render("members", data);
                });

//        });


    // INCLUDE ERROR HANDLING: IF NO DATA, REDIRECT TO LOGIN

});

//        db.Runner.findAll({
//                where: {
//                    UserId: req.user.id
//                }
//            })
//            .then(function (dbRunner) {
//                console.log("dbRunner");
//                console.log(dbRunner);
//                var data = {
////                    User: dbUser,
//                    Runner: dbRunner,
//                    //            runs: dbruns
//                };
//                console.log(req.runner)
//                return res.render("members", data);
//
//                // INCLUDE ERROR HANDLING: IF NO DATA, REDIRECT TO LOGIN
//
//            });

});


//WORKING ROUTE from runController.js in old project files
//    app.get("/runner", function(res,req) {
//        db.Run.findAll({
//            include: [db.Runner],
//            order: [
//                ["dateTime", "ASC"]
//            ]
//        }).then(function(dbRuns) {
//            
//            var data = {
//                runs: dbRuns
//            };
//            return res.render("dashboard", data);
//        });
//    
//});

};