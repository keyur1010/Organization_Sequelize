const {Sequelize,Op}=require('sequelize')

const db=require('../../config/OrganizationDatabase')
const helper=require('../../helper/helping')
const userModel=db.userModel
const organizationModel=db.organizationModel

exports.organization=async(req,res)=>{
    try {
        // const userData=await userModel.findAll({where:{isDeleted:0,role:'organization'}})
        const orData=await organizationModel.findAll({include:"user"})
        console.log("orData--->",orData[0])
        return res.render('./organization/organizationPage.ejs',{messages:req.flash(),orData:orData})
    } catch (error) {
        console.log(error)
        req.flash('error','Something Went Wrong')
        return res.redirect('/logout')
    }
}