var bcrypt = require("bcrypt-nodejs");

'use strict';
module.exports = function (sequelize, DataTypes) {
    var Runner = sequelize.define('Runner', {
        
        firstName: {
            type: DataTypes.STRING,
//            allowNull: false,
            validate: {
//                isAlpha: true,
                len: [1, 60]
            }
        },
        lastName: {
            type: DataTypes.STRING,
//            allowNull: true,
            validate: {
//                isAlpha: true,
                len: [1, 60]
            }
        },
        city: {
            type: DataTypes.STRING,
//            allowNull: false,
            validate: {
                len: [1, 100]
            }
        },
        sex: {
            type: DataTypes.STRING,
//            allowNull: false
        },
        dob: {
            type: DataTypes.DATEONLY,
//            allowNull: false,
            validate: {
                isDate: true,
                isAfter: "1900-12-31",
                isBefore: "2050-12-31"
            }
        }
    });

    Runner.associate = function(models) {
        Runner.belongsTo(models.User, {
            foreignKey: {
//                allowNull: false
            }
        });
    };


    return Runner;
};
