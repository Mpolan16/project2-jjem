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

    Calendar.associate = function (models) {
      Calendar.belongsTo(models.Students, {
        foreignKey: {
          allowNull: false
        },
        onDelete: "cascade",
        hooks: true
      });
    };
    return Calendar;
  };