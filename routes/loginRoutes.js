const express=require('express')
const router=express.Router()
const loginC=require('../app/Controllers/loginController')
const auth=require('../app/Middleware/auth')


//login page route
router.get('/',auth.isLogin,loginC.loginPage)
router.post('/checkLogin',loginC.checkLogin)

//logout route
router.get('/logout',loginC.logout)

//organization sign up
router.get('/organizationForm',loginC.organizationForm)
router.post('/organizationForm',loginC.organizationFormData)
//sign up page route
router.get('/signup',loginC.signPage)
router.post('/userCreate',loginC.userCreate)

//super admin Routes
router.get('/dashboard',auth.login,loginC.dashboardSuperAdmin)



//just for fun delete all query
router.get('/deleteAll',loginC.deleteAll)
























//weather api //according to city give us a temparature
router.get('/weather',loginC.weather)







module.exports=router