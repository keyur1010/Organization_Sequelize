const {Sequelize,DataTypes}=require('sequelize')

module.exports=(sequelize,DataTypes)=>{
    const organizationModel=sequelize.define('organizationModel',{
            orStart:{
                type:DataTypes.DATE,
                defaultValue:new Date(Date.now())
            },
            orEnd:{
                type:DataTypes.DATE,
            },
            organizationDonation:{
                type:DataTypes.DECIMAL,
                defaultValue:0
            },
            organizationDonationGet:{
                type:DataTypes.DECIMAL,
                defaultValue:0
            },
            organizationDonationRemain:{
                type:DataTypes.DECIMAL,
                defaultValue:0
            },
            organizationType:{
                type:Sequelize.ENUM("Medical","Study","Charity"),
            },
            organizationAddress:{
                type:DataTypes.STRING,
            },
            whySelect:{
                type:DataTypes.TEXT
            },
            governmentCertified:{
                type:DataTypes.BOOLEAN,
                defaultValue:false
            },
            organizationImage:{
                type:DataTypes.STRING,
            },
            updatedBy:{
                type:DataTypes.STRING
            }, 
            updatedOn:{
                type:DataTypes.DATE
            },
            acceptBy:{
                type:DataTypes.STRING
            },
            acceptOn:{
                type:DataTypes.DATE
            },
            status:{
                type:Sequelize.ENUM("Pending","Approved","Rejected"),
                allowNull:false
            },
            random_value:{
                type:DataTypes.STRING
            }
    }); 
    return organizationModel
}