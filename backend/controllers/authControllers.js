const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

//register User
exports.register = async (req, res) => {
    try{
        const {name, email, password} = req.body;
        const userExists = User.findOne({email});
        if(userExists){
            return res.status(400).json({error:"User is already exist"});
        };
        const user = await User.create({name, email, password});
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {
            expiresIn: "1d",
        });
        res.cookie("token", token, {httpOnly: true}).status(201).json(user);

    }catch(error){
        res.status(500).json({error: error.message});


    }

}
exports.login =  async (req, res) => {
    const failedAttempts = {};
   try {
    const ip = req.ip;
    if(failedAttempts[ip] >= 5){
        return res.status(429).json({success: false, message: 'You have send too many req'})
    }
     const {email, password} =  req.body;
    if(!email && !password){
        return res.status(401).json({success: false, message:'email and password not found'});

    };
    //check the user exist or not
    const existUser = await User.findOne({email});
    if(!existUser){
        return res.status(401).json({success: false, message: 'account does not exist so please sign up first'});

    }
    //check user is block or nor 
    if(existUser?.blockExperies && existUser.blockExperies > new Date()){
        const remainingTime = Math.ceil(existUser.blockExperies - new Date()/ 60000);
        return res.status(403).json({
            success: false, message:`Account Blocked. Try  again after ${remainingTime} minutes.`
        });
    };
    //validate credentials
    if(!existUser || !(await bcrypt.compare(password, existUser.password))){
        await User.updateOne(
            {email},{
                $inc: {loginAttampts: 1},
                ...(existUser?.loginAttampts + 1 >= 5 ? {blockExperies: new Date(Date.now() + 20*60*1000)}: {}),
            }
        );
        return res.status(400).json({success: false, message: 'Invalid credentials'});
    };
    await User.updateOne({email}, {loginAttampts: 0,  blockExperies: null});

    //gnerate JWT token
    const token = jwt.sign({id: user._id}, process.jwt.JWT_SECRET, {
        expiresIn:"id"
    });
    res.cookie("token", token, {httpOnly: true, secure: true}).json({existUser});
    
   } catch (error) {
    res.status(500).json({success: false, message: error.message});
    
   }


}


exports.logout = (req, res) => {
    res.clearCookie("token")({message:'Logged out'});

};




// admin login
exports.adminLogin = async (req, res)=> {
    try{
        const {email, password} = req.body;
        const admin = await User.findOne({email, role:'admin'});
        if(!admin){
            return res.status(401).json({message: 'Invalid creadentials or not an admin'});


        }
        // verify password (using bcrypt or similer)
        const isMatch = await bcrypt.compare(password, admin.password);
        if(!isMatch){
            return res.status(401).json({message: 'Invalid creadintals'})
        }
        // create the jwt
        const token = jwt.sign(
            {userId: admin._id, role: admin.role},
            process.env.JWT_SECRET,
            {expiresIn: '1h'}
        );
        res.status(201).json({token, userId: admin_id, role: admin.role});

    }catch(error){
        res.status(500).json({message: `Somethin went wrong ${error}`})
    }
}