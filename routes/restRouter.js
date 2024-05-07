const express=require('express')
const router=express.Router()

const restC=require('../app/Controllers/restController')


//weather api //according to city give us a temparature
router.get('/weather',restC.weather)
router.get('/isOnline',restC.isOnline)
module.exports=router