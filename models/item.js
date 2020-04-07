module.exports = (sequelize, DataTypes) => {
  const Item = sequelize.define("Item", {
    item_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    cost: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });
  Item.associate = function(models) {
    models.Customer.belongsTo(models.Order);
  };
  return Item;
};
