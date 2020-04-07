module.exports = function(sequelize, DataTypes) {
  var Manager = sequelize.define("Manager", {
    first_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  Manager.associate = function(models) {
    models.Manager.hasMany(models.Customer);
  };
  return Manager;
};
