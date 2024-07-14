const express=require('express')
const router=express.Router()
const adminC=require('../app/Controllers/adminController')
const auth=require('../app/Middleware/auth')

router.get('/organization',auth.login,adminC.organization)


module.exports=router