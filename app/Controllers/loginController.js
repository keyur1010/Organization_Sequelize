const {  Sequelize, DataTypes,Op } = require('sequelize');


const db=require('../../config/OrganizationDatabase')
const helper=require('../../helper/helping')
const userModel=db.userModel
exports.signPage=async(req,res)=>{
    const t=await db.sequelize.transaction()
    try {
        const createDate=Date.now()
        
        const adminAlready=await userModel.findOne({where:{role:'admin'}},{transaction:t})   //this query just for now in this if there is multiple admin then change 
        if(adminAlready){
            console.log('Admin Already Exist')
        }else{
            const random_value=helper.generateRandomString()
            const superAdminCreate=await userModel.create({name:"admin",role:"admin",email:'admin@gmail.com',mobile:"9904472504",password:'123456878',country:'IN',balance:'0',random_value:random_value},{transaction:t})
            t.commit()
        }
        return res.render('./common/signUpPage.ejs')
    } catch (error) {
        console.log(error)
        t.rollback()
    }
}

exports.userCreate=async(req,res)=>{
    console.log(req.body);

    const t=await db.sequelize.transaction();
    try {
        console.log('userCreate')
        const body=req.body
        const checkUnique=await userModel.findOne({where:{[Op.or]:[{email:body.email},{name:body.name}]}}) //or operation for check unique email and name
        console.log('checkUnique-------->',checkUnique)
        if(!checkUnique) {
            const loginDataCreate=await userModel.create(body,{transaction:t})
            console.log('loginDataCreate',loginDataCreate)
            await t.commit()
            return res.send(loginDataCreate)    
        }else{
            console.log('This Email or Name Already Exists')
            return res.send('Go To Login Page')
        }
    } catch (error) {
        console.log(error)
        await t.rollback()
        return res.send(error)
    }
}
exports.loginPage=async(req,res)=>{
    try {
        console.log('Login Page')
        req.flash('error', 'This is a success flash message.');
        
        return res.render('./common/login.ejs',{messages:req.flash()})
    } catch (error) {
        console.log(error)
        
    }
}
exports.checkLogin=async(req,res)=>{
    try {
        const loginBody=req.body
        const checkData=await userModel.findOne({where:{[Op.or]:[{email:loginBody.username},{name:loginBody.username}]}})
        console.log("checkData------->",checkData)
        if(checkData){

        }
        req.flash('success', 'This is a success flash message.');
        
        return res.redirect('/')
    } catch (error) {
        console.log(error)
        return res.redirect('/')
    }
}