'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Team extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Team.belongsTo(models.User)
    }
  };
  Team.init({
    name: DataTypes.TEXT,
    league: DataTypes.TEXT,
    sport: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Team',
  });
  return Team;
};