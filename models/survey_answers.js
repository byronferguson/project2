'use strict';
module.exports = (sequelize, DataTypes) => {
    const Survey_Answers = sequelize.define(
        'Survey_Answers',
        {
            // The answers for each question
            answer1: DataTypes.BOOLEAN,
            answer2: DataTypes.BOOLEAN,
            answer3: DataTypes.BOOLEAN,
            answer4: DataTypes.BOOLEAN,
            answer5: DataTypes.BOOLEAN
        }
    );
    Survey_Answers.associate = function (models) {
        // associations can be defined here
        Survey_Answers.belongsTo(models.Survey_Questions, {
            foreignKey: {
                allowNull: false
            }
        });
    };
    return Survey_Answers;
};
