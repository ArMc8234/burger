module.exports = function(sequelize, DataTypes) {
    var Burgers = sequelize.define("Burgers", {
        //Column to hold burger name input
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1, 100]
            }
        },
        //Column to capture state of the item
        devoured: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        }
    });
    return Burgers;
};