module.exports = function (sequelize, DataTypes) {
  return sequelize.define('tweet', {
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
        allowNull: false
    },
    rts: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    favourites: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    hashtags: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    geotags: {
        type: DataTypes.TEXT,
        allowNull: false
    }
  },
      {
          classMethods: {
          }
      });
};
