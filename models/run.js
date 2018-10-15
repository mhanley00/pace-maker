var bcrypt = require("bcrypt-nodejs");

'use strict';
module.exports = function (sequelize, DataTypes) {
    var Run = sequelize.define('Run', {

            distance: {
                type: DataTypes.DECIMAL,
                allowNull: false,
                validate: {}
            },
            totalTime: {
                type: DataTypes.TIME,
                allowNull: false,
                validate: {}
            },
            averagePace: {
                type: DataTypes.DECIMAL(5,2),
                allowNull: false,
                validate: {}
            },
            agPercent: {
                type: DataTypes.DECIMAL,
                allowNull: false,
                validate: {
                    isDecimal: true,
                }
            },
            dateTime: {
                type: DataTypes.DATE,
                allowNull: false,
                validate: {}
            },
            location: {
                type: DataTypes.STRING,
                allowNull: true,
                validate: {
                    len: [1, 100]
                }
            },
            temperature: {
                type: DataTypes.DECIMAL,
                allowNull: true,
                validate: {}
            },
            tempPace: {
                type: DataTypes.DECIMAL,
                allowNull: true,
                validate: {}
            },
            windMPH: {
                type: DataTypes.DECIMAL,
                allowNull: true
            },
            dewPoint: {
                type: DataTypes.DECIMAL,
                allowNull: true,
                validate: {}
            }

        });
        
    Run.associate = function(models) {
        Run.belongsTo(models.Runner, {
            foreignKey: {
                allowNull: false
            }
        });
    };
    
    
    return Run;
};
