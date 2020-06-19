'use strict';
module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define(
        'Users',
        {
            user_name: DataTypes.STRING,
        }
    );
    Users.associate = function (models) {
        // associations can be defined here
        Users.hasMany(models.Surveys, {
            onDelete: "cascade",

        });
    };
    return Users;
};
