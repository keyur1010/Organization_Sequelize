const {Sequelize,DataTypes}=require('sequelize')

const bcrypt=require('bcryptjs')

module.exports=(sequelize,DataTypes)=>{
    const userModel=sequelize.define('userModel',{
       name:{
        type:DataTypes.STRING,
        allowNull:false,
       },
       email:{
        type:DataTypes.STRING,
        allowNull:false,

       },
       password:{
        type:DataTypes.STRING,
        allowNull:false
       },
       balance:{
        type:DataTypes.DECIMAL,
       },
       mobile:{
        type:DataTypes.STRING,
       },
       country:{
        type:DataTypes.STRING,
       },
       role:{
        type:Sequelize.ENUM("Super Admin","candidate",'organization'),
        defaultValue:'candidate'
       },
       createdOn:{
        type:DataTypes.DATE,
        defaultValue:DataTypes.NOW,
       },
       updatedOn:{
        type:DataTypes.DATE,
       },
       isDeleted:{
        type:DataTypes.BOOLEAN,
        defaultValue:false,
       },
       random_value:{
        type:DataTypes.STRING,
        // allowNull:false
       },
       isLogin:{
        type:DataTypes.BOOLEAN,
        defaultValue:false
       }
    });
    userModel.beforeCreate(async(user)=>{
        const existingUser = await userModel.findOne({
            where: {
              [Sequelize.Op.or]: [
                { name: user.name },
                { email: user.email }
              ]
            }
          });
          if (existingUser) {
            console.log('This email or username already exists')
          }

          
        if(user.password){
            user.password=await bcrypt.hash(user.password,10)
        }

    });
    return userModel
}