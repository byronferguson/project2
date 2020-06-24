'use strict';
module.exports = (sequelize, DataTypes) => {
  const Survey_Questions = sequelize.define(
    'Survey_Questions',
    {
      // survey_id: DataTypes.INTERGER,
      survey_questions: DataTypes.TEXT
    }
  );
  Survey_Questions.associate = function (models) {
    // associations can be defined here
    Survey_Questions.belongsTo(models.Surveys, {
      foreignKey: {
        allowNull: false
      }
    });
    Survey_Questions.hasMany(models.Survey_Answers, {
      onDelete: "cascade",
      foreignKey: {
        allowNull: false
      }
    });
  };
  return Survey_Questions;
};
