const sequelize=require('sequelize')
const db=require('../../config/OrganizationDatabase')
const loginC=db.userModel



exports.isLogin=async(req,res,next)=>{
    try {
        const session=req.session.user
        console.log('session----->',session)
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


exports.login=async(req,res,next)=>{
    try {
        if(req.session.user){
            if(req.session.user.role=="Super Admin"){
                next()
                console.log('This is Super Admin')
            }else{
                console.log("You Are At Wrong Route")
                return res.redirect('/logout')
            }
        }else{
            console.log("Session Not Found")
            return res.redirect('/logout')
        }
    } catch (error) {
        console.log(error)
        return res.redirect('/logout')
    }
}
exports.organization=async(req,res,next)=>{
    try {
        if(req.session.user){
            if(req.session.user.role=="organization"){
                console.log("This is Organization")
                next()
            }else{
                console.log("You Are At Wrong")
                return res.redirect('/logout')
            }
        }else{
            console.log("Session Not Found")
            return res.redirect('/logout')
        }
    } catch (error) {
        console.log(error)
        return res.redirect('/logout')
    }
}
exports.CandidateLogin=async(req,res,next)=>{
    try {
        if(req.session.user){
            if(req.session.user.role=="candidate"){
                console.log("This is Candidate")
                next()
            }else{
                console.log("You Are Wrong Route")
                return res.redirect('/logout')
            }
        }else{
            console.log("Session Not Found")
            return res.redirect('/logout')
        }
    } catch (error) {
        console.log(error)
        return res.redirect('/logout')
    }
}