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


    app.get('/members', isAuthenticated, function (req, res) {

        var memberId = req.user.id;

        db.User.findOne({
            where: {
                id: memberId
            },
            attributes: ['id', 'email', 'createdAt']
        }).then(function (dbUser) {
            db.Runner.findOne({
                where: {
                    UserId: memberId
                }
            }).then(function (dbRunner) {
                db.Run.findAll({
                    where: {
                        RunnerId: memberId
                    }
                }).then(function (dbRun) {
                    var data = {
                        User: dbUser.dataValues,
                        Runner: dbRunner.dataValues,
                        Run: []
                    }
                    
                    for (var i = 0; i < dbRun.length; i++) {
                        data.Run.push(dbRun[i].dataValues);
                    }
//                    console.log("datadatadata");
//                    console.log(data);
                    res.render("members", data);

                })

            })
        })
    });
    
    app.get('/runs', isAuthenticated, function (req, res) {

        var memberId = req.user.id;

        db.User.findOne({
            where: {
                id: memberId
            },
            attributes: ['id', 'email', 'createdAt']
        }).then(function (dbUser) {
            db.Runner.findOne({
                where: {
                    UserId: memberId
                }
            }).then(function (dbRunner) {
                db.Run.findAll({
                    where: {
                        RunnerId: memberId
                    }
    //            order: [
    //                ["dateTime", "ASC"]
    //            ]
                }).then(function (dbRun) {
                    var data = {
                        User: dbUser.dataValues,
                        Runner: dbRunner.dataValues,
                        Run: []
                    }
                    
                    for (var i = 0; i < dbRun.length; i++) {
                        data.Run.push(dbRun[i].dataValues);
                    }
                    console.log("datadatadata");
                    console.log(data);
                    res.render("all_runs", data)

                })

            })
        })
    });

};
