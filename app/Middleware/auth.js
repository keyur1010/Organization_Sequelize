const sequelize=require('sequelize')
const db=require('../../config/OrganizationDatabase')
const loginC=db.userModel



exports.isLogin=async(req,res,next)=>{
    try {
        const session=req.session.user
        console.log('session-----')
        if(session){
            if(session.role=='Super Admin'){
                console.log('admin dashboard')
                return res.redirect('/dashboard')
                
            }else if(session.role=="candidate"){
                console.log('candidate Dashboard')
                return res.redirect('/dashboard')

            }else if(session.role=='organization'){
                console.log('Organization Dashboard')
                return res.redirect('/dashboard')

            }else{
                console.log('else in req.session.user.isLogin')
                next()
            }
        }else{
            console.log('else isLogin')
            next()
        }
    } catch (error) {
        console.log(error)
        req.flash('error',"Something Went Wrong")
        return res.redirect('/logout')
    }
}


