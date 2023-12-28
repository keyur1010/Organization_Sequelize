const express=require('express')
const router=express.Router()
const loginC=require('../app/Controllers/loginController')



//login page route
router.get('/',loginC.loginPage)
router.post('/checkLogin',loginC.checkLogin)


//sign up page route
router.get('/signup',loginC.signPage)
router.post('/userCreate',loginC.userCreate)










module.exports=router