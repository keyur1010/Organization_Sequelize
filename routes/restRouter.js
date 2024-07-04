const express=require('express')
const router=express.Router()

const restC=require('../app/Controllers/restController')


//weather api //according to city give us a temperature
router.get('/weather',restC.weather)










module.exports=router