const User = require("../models/userModel");
const bcrypt = require('bcryptjs');
exports.signup = async (req,res,next) =>{
    try{
        const {username,password} = req.body;
        const hashpassword = await bcrypt.hash(password,12)
        console.log("sign up",req.body)
        const user = await User.create({username,password:hashpassword});
        req.session.user = user;
        res.status(201).json({
            status:'success',
            data:{
                user
            }
        })
    }catch(e){
        console.log(e)
        res.status(400).json({
            status:'fail'
        })
    }
}

exports.login = async (req,res,next)=>{
    try{
        const {username,password} = req.body;
       
        const user = await User.findOne({username});
        console.log("login",req.body,user)
        if (!user){
            return res.status(400).json({
                status:'fail',
                message:'user not found'
            })
        }
        const isCorrect = await bcrypt.compare(password,user.password);
        console.log("login,isCorrect",isCorrect,req.session)
        if (isCorrect) {
            // 将用户信息保存到session中，之后会存储到redis
            req.session.user = user;
            res.status(200).json({
                status:'success'
            })
        }else{
            res.status(400).json({
                status:'fail',
                message:'password is not correct'
            })
        }
       
    }catch(e){
        console.log(e)
        res.status(400).json({
            status:'fail',
            message:e
        })
    }
}