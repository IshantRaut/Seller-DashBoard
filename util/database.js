const Sequelize=require("sequelize");
const sequelize = new Sequelize('general-store','root','17Jan@2000',
{
    dialect : 'mysql',
    host : 'localhost'
});

module.exports=sequelize;