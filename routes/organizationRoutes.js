const express=require('express')
const router=express.Router()
const organizationC=require('../app/Controllers/organizationController')
const auth=require('../app/Middleware')

// router.get('/organization',auth.org)


module.exports=router