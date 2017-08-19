'use strict';
module.exports = function(sequelize, DataTypes) {
  var tweet = sequelize.define('tweet', {
    tweet_text: DataTypes.STRING,
    created: DataTypes.DATEONLY,
    tweet_code: DataTypes.STRING,
    name: DataTypes.STRING,
    username: DataTypes.STRING,
    location: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return tweet;
};