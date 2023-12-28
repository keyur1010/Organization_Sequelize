require('dotenv').config()
const express=require('express')
const app=express()
const bodyParser = require('body-parser')
const path=require('path')
const bcrypt=require('bcryptjs')
const session=require('express-session') 
const flash=require('connect-flash')





app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.set('view engine','ejs')
app.set('views','./app/views')


app.use(express.json())
app.use(express.static(path.join(__dirname,'public')))

//This is Session
app.use(session({
    secret:'Secret_KEY',
    resave:true,
    saveUninitialized:false,
    cookie:{maxAge:24*60*60*1000}
}))
app.use(flash())

const PORT=process.env.PORT||3707


const db =require('./config/OrganizationDatabase')

const loginRoute=require('./routes/loginRoutes')
app.use('/',loginRoute)


app.listen(PORT,()=>{
    console.log(`http://localhost:${PORT}`)
})