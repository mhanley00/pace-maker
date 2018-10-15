var db = require("../models");
var bcrypt = require("bcrypt-nodejs");

'use strict';
module.exports = function (sequelize, DataTypes) {
    var User = sequelize.define("User", {
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
                len: [1, 100]
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1, 100]
            }
        }

    });
    User.prototype.validPassword = function (password) {
        return bcrypt.compareSync(password, this.password);
    };
    User.hook("beforeCreate", function (user) {
        user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
    });

    User.associate = function (models) {
        User.hasOne(models.Runner, {

        });
    };

    return User;
};
