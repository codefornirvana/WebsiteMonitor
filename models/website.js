'use strict';
module.exports = (sequelize, DataTypes) => {
  const Website = sequelize.define('Website', {
    url: DataTypes.STRING,
    method: DataTypes.STRING,
    data: DataTypes.STRING,
    headers: DataTypes.STRING
  }, {});
  Website.associate = function(models) {
    Website.hasMany(models.Duration, {foreignKey: "WebsiteId", sourceKey: "id"});
  };
  return Website;
};