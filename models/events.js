module.exports = function(sequelize, DataTypes) {
    var Events = sequelize.define("Events", {
      title: DataTypes.STRING,
      description: DataTypes.TEXT,
      start: DataTypes.DATE,
      end: DataTypes.DATE
    //   start: {
    //     type: DataTypes.DATE//,
    //     // get() {
    //     //     // return this.getDataValue('start').format('YYYY-MM-DDTHH:mm:ss')            
    //     //     //const rawValue = this.getDataValue('start');
    //     //     //console.log(rawValue.toISOString().slice(0,-5));
    //     //     return this.getDataValue('start').toISOString();//.slice(0,-5);
    //     // }
    //   },
    //   end: {
    //     type: DataTypes.DATE//,
    //     // get() {
    //     //     return this.getDataValue('end').toISOString();//.slice(0,-5);
    //     // }
    //   }
    }, 

    {
        freezeTableName: true
    });
    return Events;
  };