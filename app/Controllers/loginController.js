const {  Sequelize, DataTypes,Op } = require('sequelize');
const bcrypt=require('bcryptjs')
const axios=require('axios')

const db=require('../../config/OrganizationDatabase')
const helper=require('../../helper/helping')
const userModel=db.userModel

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




//weathere api
exports.weather=async(req,res)=>{
    const apiKey = '4a691b469d984552bb554543232912';
    try {

        if(req.session.user){
            const location =req.session.user.city;
            console.log(location)
            const apiUrl = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}&aqi=no`;
            const response = await axios.get(apiUrl);
            const weatherData = response.data;
            console.log(weatherData)
            return res.json(weatherData);
        }else{
            // console.log(location)
            const l="india"
            const apiUrl = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${l}&aqi=no`;
            const response = await axios.get(apiUrl);
            const weatherData = response.data;
            // console.log(weatherData);
            return res.json(weatherData);
        }
    } catch (error) {
        console.log(error)
        const l="india"
        const apiUrl = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${l}&aqi=no`;
        const response = await axios.get(apiUrl);
        const weatherData = response.data;
        return res.json(weatherData);
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

            const superAdminCreate=await userModel.create({name:"admin",role:"Super Admin",email:'admin@gmail.com',mobile:"9904472504",password:'123456878',country:'IN',balance:'0',status:'Super',random_value:random_value},{transaction:t})   //admin create
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
            body.random_value=random
            const loginDataCreate=await userModel.create(body,{transaction:t})
            console.log('loginDataCreate',loginDataCreate)
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
exports.OrganizationForm=async(req,res)=>{
    try {
        
        return res.render('./common/organization.ejs',{messages:req.flash()})
    } catch (error) {
        console.log(error)
        return res.redirect('/logout')
    }
}
