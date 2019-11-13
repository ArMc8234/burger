module.exports = function(sequelize, DataTypes) {
    var Burgers = sequelize.define("Burgers", {
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
            defaultValue: false,
        }
          //Column to capture entry timestamp
        // createdAt: {
        //     type: DataTypes.DATE,
        //     defaultValue: Date.now()
        // }
    });
    return Burgers;

 
};
 
