module.exports = function(sequelize, DataTypes) {
  var Students = sequelize.define("Students", {
    // The email cannot be null, and must be a proper email before creation
    first_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    freezeTableName: true
  }
  );
  return Students;
};

