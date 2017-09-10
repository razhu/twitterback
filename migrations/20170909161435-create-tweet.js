'use strict';
module.exports = {
  up: function(queryInterface, DataTypes) {
    return queryInterface.createTable('tweet',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        code: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        text: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        username: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        name: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        date: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        hour: {
            type: DataTypes.TIME,
            allowNull: false
        },
        likes: {
            type: DataTypes.INTEGER,
            allowNull: false,
            default: 0
        },
        rts: {
            type: DataTypes.INTEGER,
            allowNull: false,
            default: 0
        },
        hashtags: {
            type: DataTypes.JSON,
            allowNull: true
        },
        geotags: {
            type: DataTypes.TEXT,
            allowNull: true
        },  
        createdAt: {
            type: DataTypes.DATE
        },
          updatedAt: {
            type: DataTypes.DATE
        }
    });
  },
  down: function(queryInterface, DataTypes) {
    return queryInterface.dropTable('tweet');
  }
};