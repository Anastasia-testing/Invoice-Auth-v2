module.exports = (sequelize, DataTypes) => {
  const Customer = sequelize.define("Customer", {
    first_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      isEmail: true,
      allowNull: false
    },
    phone_number: {
      type: DataTypes.BIGINT,
      isNumeric: true,
      allowNull: false
    }
  });
  Customer.associate = function(models) {
    models.Customer.belongsTo(models.Manager);
  };
  Customer.associate = function(models) {
    models.Manager.hasMany(models.Order);
  };
  return Customer;
};
