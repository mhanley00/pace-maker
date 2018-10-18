var passport = require("../config/passport");
var path = require("path");
var db = require("../models");
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function (app) {
    
    app.post("/api/login",  passport.authenticate("local"), function (req, res) {
        res.json("/members");
    });
    
    app.post("/api/create_runner", passport.authenticate("local"), function (req, res) {
        res.json("/create");
    });
    
    app.post("/api/runner_created", isAuthenticated, function (req, res) {
        res.json("/members");
    });


    app.get("/api/user_data", function (req, res) {
        if (!req.user) {
            res.json({});
        } else {
            res.json({
                email: req.user.email,
                id: req.user.id
            });
        }
    });
    
//    app.get("/api/runner_data", function (req, res) {
//        
//        if (!req.user) {
//            res.json({});
//        } else { 
//            console.log(req.user);
//
//            db.Runner.findAll({
//                where: {
//                    UserId: req.user.id
//                }
//            }).then(function (dbRunnerApi) {
//                
//                console.log("dbRunnerApi");
//                console.log(dbRunnerApi);
//                
//                console.log("dbRunnerApi.dataValues");
//                console.log(dbRunnerApi.dataValues);
//                
//                var dataRunner = {
//                    Runner: dbRunnerApi
//                };
//                    
//                console.log("dataRunner");
//                console.log(dataRunner);
//            
//            res.json({
//                email: req.user.email,
//                id: req.user.id,
//                firstName: dbRunnerApi.firstName,
////                lastName: req.runner.lastName,
////                city: req.runner.city,
////                sex: req.runner.sex,
////                dob: req.runner.dob
//            });
//        });
//        };
//    });
    
//    app.get("/api/all_runs", function (req, res) {
//        if (!req.user) {
//            res.json({});
//        } else { 
//            console.log(req.body);
//            db.Run.findAll({
//            where: {
//                RunnerId: req.user.id
//            }
//        })
//        .then(
//            res.json({
//                distance: req.run.distance,
//                totalTime: req.run.totalTime,
////                averagePace: req.run.averagePace,
////                agPercent: req.run.agPercent,
////                dateTime: req.run.dateTime,
//                location: req.run.location,
//                temperature: req.run.temperature,
////                tempPace: req.run.tempPace,
//                windMPH: req.run.windMPH,
//                dewPoint: req.run.dewPoint
//                
//            })
//                )
//        }
//    });
};

//app.get("/api/runner_data", function (req, res) {
//        if (!req.user) {
//            res.json({});
//        } else { 
//            console.log(req.user);
//            console.log("res");
//            console.log(res);
//            
//            db.Runner.findAll({
//                where: {
//                    UserId: req.user.id
//                }
//            }).then(function (dbRunnerApi) {
//                console.log("dbRunnerApi");
//                console.log(dbRunnerApi);
//                var dataRunner = {
//                    Runner: dbRunnerApi
//                };
//                console.log("dataRunner");
//                console.log(dataRunner);
//            
//            res.json({
//                email: req.user.email,
//                id: req.user.id,
//                firstName: dbRunnerApi.firstName,
////                lastName: req.runner.lastName,
////                city: req.runner.city,
////                sex: req.runner.sex,
////                dob: req.runner.dob
//            });
//        });
//        };
//    });
