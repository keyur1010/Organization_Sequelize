const express=require('express')
const router=express.Router()
const adminC=require('../app/Controllers/adminController')
const auth=require('../app/Middleware/auth')

router.get('/organization',auth.login,adminC.organization)
router.get('/editOrganizationGet/:random_value',auth.login,adminC.editOrganizationGet)

router.get('/viewOrganization/:random_value',auth.login,adminC.viewOrganization)







module.exports=router