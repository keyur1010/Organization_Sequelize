const express=require('express')
const router=express.Router()
const organizationC=require('../app/Controllers/organizationController')
const auth=require('../app/Middleware')




module.exports=router