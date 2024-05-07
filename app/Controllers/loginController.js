const {  Sequelize, DataTypes,Op } = require('sequelize');
const bcrypt=require('bcryptjs')
const axios=require('axios')

const db=require('../../config/OrganizationDatabase')
const helper=require('../../helper/helping')
const userModel=db.userModel
const organizationModel=db.organizationModel
//logout logic
exports.logout=async(req,res)=>{
    try {
        req.session.destroy((err)=>{
            if(err){
                console.log(err)
                return res.redirect('/')
            }else{
                console.log('session destroy')
                return res.redirect('/')
            }
        })
    } catch (error) {
        console.log(error)
        return res.redirect('/logout')
    }
}


//Sign Up page logic

//sign up page

exports.signPage=async(req,res)=>{
    const t=await db.sequelize.transaction()
    try {
        const createDate=Date.now()
        
        const adminAlready=await userModel.findOne({where:{role:'Super Admin'}},{transaction:t})   //this query just for now in this if there is multiple admin then change 
        if(adminAlready){                                                                                   //here a condition that there is only one time admin create auto matically
            console.log('Admin Already Exist')
        }else{
            const random_value=helper.generateRandomString()                                     //random Value generate

            const superAdminCreate=await userModel.create({name:"admin",role:"Super Admin",email:'admin@gmail.com',mobile:"9904472504",password:'12345678',country:'IN',balance:'0',status:'Super',city:"Vadodara",random_value:random_value},{transaction:t})   //admin create
            t.commit()
        }
        
        return res.render('./common/signUpPage.ejs',{messages:req.flash()})
    } catch (error) {
        console.log(error)
        t.rollback()
        return res.redirect('/logout')
    }
}


//signup Post request
exports.userCreate=async(req,res)=>{
    console.log(req.body);

    const t=await db.sequelize.transaction();
    try {
        console.log('userCreate')
        const body=req.body
        const checkUnique=await userModel.findOne({where:{[Op.or]:[{email:body.email},{name:body.name}]}}) //or operation for check unique email and name
        console.log('checkUnique-------->',checkUnique)
        if(!checkUnique) {
            const random=helper.generateRandomString()
            body.random_value=random;
            body.balance=0
            if(body.role==="candidate"){
                console.log("this is candidate if in userCreate")
                body.status="Candidate"
                const loginDataCreate=await userModel.create(body,{transaction:t})
            }else{
                body.status="Remaining";
                const loginDataCreate=await userModel.create(body,{transaction:t})
                if(body.role==="organization"){
                    const user_id=loginDataCreate.id
                    body.user_id=user_id;
                    const dataCreate=await organizationModel.create(body,{transaction:t})
                    console.log('dataCreate==>',dataCreate)
                    req.session.user=dataCreate
                    console.log('this is session inside of sign up --->',req.session.user)
                    await t.commit()
                    req.flash('success','Your Account Created Successfully')
                    return res.redirect('/organizationForm')
                }else{
                    t.rollback();
                    req.flash('error',"Error While Create a Organization")
                    return res.redirect('/logout')
                }
            }
            await t.commit()
            req.flash('success','Your Account Created Successfully')
            return res.redirect('/')    
        }else{
            console.log('This Email or Name Already Exists')
            req.flash('info','Login Here')
            return res.redirect('/signup')
        }
    } catch (error) {
        console.log(error)
        await t.rollback()
        req.flash('error','Something Went Wrong')
        return res.redirect('/logout')
    }
}


//login Page Logic

//login page get request

exports.loginPage=async(req,res)=>{
    try {
        console.log('Login Page')
        return res.render('./common/login.ejs',{messages:req.flash()})
    } catch (error) {
        console.log(error)
        return res.redirect('/logout')
    }
}

//login page post request


exports.checkLogin=async(req,res)=>{
    try {
        const loginBody=req.body
        const checkData=await userModel.findOne({where:{[Op.or]:[{email:loginBody.username},{name:loginBody.username}]}})     //check or condition where there is you are login with username and email both
        console.log("checkData------->",checkData)
        if(checkData){
            const passwordCompare=await bcrypt.compare(loginBody.password,checkData.password)                                       //check password by compare  in the comapre first you need to give what is coming after 
            console.log(passwordCompare)                                                                                                           //that you declare what is coming from database
            if(passwordCompare){
                console.log('password Matched') 
                req.session.user=checkData
                req.flash('success','Welcome To Dashboard')
                return res.redirect('/dashboard')
            }else{
                console.log('password not Matched')
                req.flash("error",'Password Not Matched')
                return res.redirect('/')
            }
        }else{
            req.flash('info','Go to Sign Up Page If You Are Not Register Yet')
            return res.redirect('/')
        }
    } catch (error) {
        console.log(error)
        req.flash('error','Something Wrong With Login')
        return res.redirect('/logout')
    }
}






//Super Admin Dashboard

exports.dashboardSuperAdmin=async(req,res)=>{
    try {
        const userData=await userModel.findOne({where:{id:req.session.user.id}})
        return res.render('./Super_Admin/adminDashboard.ejs',{messages:req.flash(),userData:userData})
    } catch (error) {
        console.log(error)
        req.flash('Something Went Wrong')
        return res.redirect('/logout')
    }
}









//organization Form
//get
exports.organizationForm=async(req,res)=>{
    try {
        const orData=await organizationModel.findAll()
        console.log('orData--->',orData)
        console.log('this is session inside of organization Form --->',req.session.user)

        return res.render('./common/organization.ejs',{messages:req.flash()})
    } catch (error) {
        console.log(error)
        return res.redirect('/logout')
    }
}

//post 
exports.organizationFormData=async(req,res)=>{
    const t=await db.sequelize.transaction()
    try {
        console.log("req.body-->",req.body)
        const organizationData=req.body;
        if(organizationData.governmentCertified==="Yes"){
            organizationData.governmentCertified=1
        }else{
            organizationData.governmentCertified=0
        }
        organizationData.status="Pending";
        const organizationDataCreate=await organizationModel.create(organizationData,{transaction:t});
        console.log(organizationDataCreate)
        await t.commit()
        return res.redirect("/organizationForm")

    } catch (error) {
        console.log(error)
        t.rollback();
        req.flash('error',"Something Went Wrong")
        return res.redirect('/logout')
    }
}
















