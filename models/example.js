"use strict";
module.exports = (sequelize, DataTypes) => {
  const Example = sequelize.define(
    "Example",
    {
      text: DataTypes.STRING,
      description: DataTypes.TEXT
    },
    {}
  );
  Example.associate = function(_models) {
    // associations can be defined here
  };
  return Example;
};
