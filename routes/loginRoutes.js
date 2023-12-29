const express=require('express')
const router=express.Router()
const loginC=require('../app/Controllers/loginController')
const auth=require('../app/Middleware/auth')


//login page route
router.get('/',auth.isLogin,loginC.loginPage)
router.post('/checkLogin',loginC.checkLogin)

//logout route
router.get('/logout',loginC.logout)

//sign up page route
router.get('/signup',loginC.signPage)
router.post('/userCreate',loginC.userCreate)

//super admin Routes
router.get('/dashboard',loginC.dashboardSuperAdmin)

























//weather api //according to city give us a temparature
router.get('/weather',loginC.weather)







module.exports=router