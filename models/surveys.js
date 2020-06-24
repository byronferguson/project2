'use strict';
module.exports = (sequelize, DataTypes) => {
    const Surveys = sequelize.define(
        'Surveys',
        {
            // user_id: DataTypes.INTEGER,
            survey_title: DataTypes.STRING
        }
    );
    Surveys.associate = function (models) {
        // associations can be defined here
        Surveys.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        });
        Surveys.hasOne(models.Survey_Questions, {
            onDelete: "cascade",
            foreignKey: {
                allowNull: false
            }
        });
    };
    return Surveys;
};
