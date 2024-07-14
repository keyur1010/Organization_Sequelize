const {  Sequelize, DataTypes,Op } = require('sequelize');

const db=require('../../config/OrganizationDatabase')
const helper=require('../../helper/helping')
const userModel=db.userModel
const organizationModel=db.organizationModel



exports.organization=async(req,res)=>{
    try {


        return res.render('./organization/organizationPage.ejs',{})
        
    } catch (error) {
        console.log(error)
        req.flash('error',"Something Went Wrong")
        return res.redirect('/logout')
    }
}





