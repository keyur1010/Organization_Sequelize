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
exports.editOrganizationGet=async(req,res)=>{
    try {
        const value=req.params.random_value
        const orData=await organizationModel.findOne({where:{random_value:value}})
        const userData=await organizationModel.findOne({where:{random_value:value}})
        // console.log("orData------>",orData)
        // console.log("userData------>",userData)
        return res.render("./organization/EditOrganization.ejs",{messages:req.flash(),orData,userData})
    } catch (error) {
        console.log(error)
        req.flash('error','Something Went Wrong')
        return res.redirect('/logout')
    }
}


exports.viewOrganization=async(req,res)=>{
    try {
        const value=req.params.random_value
        const orData=await organizationModel.findOne({where:{random_value:value}})
        const userData=await userModel.findOne({where:{random_value:value}})
        console.log("orData--------------->",orData)
        console.log("userData--------------->",userData)
        return res.render('./organization/viewOrganization.ejs',{messages:req.flash(),orData,userData})
    } catch (error) {
        console.log(error)
        req.flash('error','Something Went Wrong')
        return res.redirect('/logout')
    }
}