module.exports = function(sequelize, DataTypes) {
  var Students = sequelize.define("Students", {
    
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

