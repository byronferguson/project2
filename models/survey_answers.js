'use strict';
module.exports = (sequelize, DataTypes) => {
    const Survey_Answers = sequelize.define(
        'Survey_Answers',
        {
            // questions_id: DataTypes.INTERGER,
            survey_answers: DataTypes.BOOLEAN
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
