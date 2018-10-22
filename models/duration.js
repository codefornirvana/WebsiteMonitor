'use strict';
module.exports = (sequelize, DataTypes) => {
  const Duration = sequelize.define('Duration', {
    WebsiteId: DataTypes.INTEGER,
    duration: DataTypes.INTEGER,
    message: DataTypes.STRING
  }, {});
  Duration.associate = function(models) {
    // associations can be defined here
    Duration.belongsTo(models.Website, {
      foreignKey: "WebsiteId",
      sourceKey:  "id",
      foreignKeyConstraint: true,
      onDelete: 'cascade'
    });
  };
  return Duration;
};