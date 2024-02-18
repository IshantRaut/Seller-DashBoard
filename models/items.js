const Sequelize=require('sequelize');
const sequelize=require("../util/database");

const Items = sequelize.define ('items',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    name: Sequelize.STRING,
    desc: Sequelize.STRING,
    price: {
        type:Sequelize.DOUBLE,
        allowNull:false
    },
    quantity:{
        type:Sequelize.DOUBLE,
        allowNull:false
    }

})
module.exports = Items;