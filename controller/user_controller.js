const { userInfo } = require('os');
const UserService = require('../services/user_services');
const bcrypt = require('bcrypt');
const { use } = require('../routers/user_router');


exports.register = async(req,res,next)=>{

    try {
        
        const userData = req.body;
        const hashedPassword = await bcrypt.hash(userData.password, 10);
        const succesRes = await UserService.registerUser({...userData, password: hashedPassword });

        res.json({status:true,succes:"User Registered Successfully"});

    } catch (err) {
        
        throw err
        
    }

}

exports.getUsers = async (req,res,next)=>{

    try {
           const allUsers = await UserService.getUsers();
           res.json({status:true,succes:"User Registered Successfully",body:allUsers});
        
    } catch (error) {
        throw err;
    }

}


exports.login= async(req,res,next)=>{

    try {
        
        const {email , password}= req.body;
        
        const user = await UserService.checkuser(email);
        
        if (!user) {
            return res.status(404).json({ status: false, error: {message:"User not found" }});
          }
         
        const passwordMatch = await bcrypt.compare(password, user.password);
        
        if (!passwordMatch) {
            return res.status(401).json({ status: false, error: {message:"Incorrect password"} });
          }

        let tokenData = {_id:user.id,email:user.email};
        const token = UserService.generateToken(tokenData);
        
        
        res.status(200).json({ status: true, success: "Login successful" ,token:token});  
    } catch (err) {
        
        console.error(err);
        res.status(500).json({ status: false, error: "Internal Server Error", });
        
    }

}