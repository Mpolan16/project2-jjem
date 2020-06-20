module.exports = function(sequelize, DataTypes) {
    var Calendar = sequelize.define("Calendar", {
      title: DataTypes.STRING,
      description: DataTypes.TEXT,
      start: DataTypes.DATE,
      end: DataTypes.DATE
    }, 

    {
        freezeTableName: true
    });
    return Calendar;
  };