
const { Sequelize , DataTypes} = require('sequelize');


const sequelize = new Sequelize('Organization_Project', 'root', '', {
  host: 'localhost', 
  dialect: 'mysql',
  logging:false,
  pool:{
    max:500000,
    min:0,
    acquire:300000,
    idle:100000,
    evict:10000
  }
});



sequelize.authenticate()
  .then(() => {
    console.log('Database connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

const db={}
db.Sequelize=Sequelize
db.sequelize=sequelize

db.userModel=require('../app/Models/userModel')(sequelize,DataTypes)
db.organizationModel=require("../app/Models/organizationModel")(sequelize,DataTypes)


// db.userModel.hasOne(db.organizationModel,{foreignKey:"use_id",as:"keur"})
db.organizationModel.belongsTo(db.userModel,{foreignKey:"user_id" ,as:"keyur"})




db.sequelize.sync({force:false,alter:true}).then(()=>{
  console.log('DATABASE IS DROPPED AND SYNC AGAIN')
})
module.exports=db