const express=require('express')
const multer=require('multer')
const router=express.Router()
const loginC=require('../app/Controllers/loginController')
const auth=require('../app/Middleware/auth')
const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'./public/uploads');
    },
    filename:(req,file,cb)=>{
        cb(null,Date.now()+'-'+file.originalname)
    }
})
const upload=multer({storage:storage})
//login page route
router.get('/',auth.isLogin,loginC.loginPage)
router.post('/checkLogin',loginC.checkLogin)

//logout route
router.get('/logout',loginC.logout)

//organization sign up
router.get('/organizationForm',auth.organization,loginC.organizationForm)
router.post('/organizationFormData',auth.organization,upload.single('organizationImage'),loginC.organizationFormData)
//sign up page route
router.get('/signup',loginC.signPage)
router.post('/userCreate',loginC.userCreate)

//super admin Routes
router.get('/dashboard',auth.login,loginC.dashboardSuperAdmin)





module.exports=router