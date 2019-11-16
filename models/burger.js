module.exports = function(sequelize, DataTypes) {
    var Burger = sequelize.define("Burger",  {
        //Column to hold burger name input
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        //Column to capture state of the item
        devoured: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
              
    });
        return Burger;
};
 
