const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

//register User


// const bcrypt = require('bcrypt');

exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ error: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({ name, email, password: hashedPassword });

        const token = jwt.sign({ id: user._id }, 'ABC123CDZ', {
            expiresIn: "1d",
        });

        res.cookie("token", token, { httpOnly: true }).status(201).json(user);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}




exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(401).json({ success: false, message: 'Email and password are required' });
        }

        const existUser = await User.findOne({ email });
        if (!existUser) {
            return res.status(401).json({ success: false, message: 'Account does not exist, please sign up first' });
        }

        // Check if the account is blocked
        if (existUser?.blockExperies && existUser.blockExperies > new Date()) {
            const remainingTime = Math.ceil((existUser.blockExperies - new Date()) / 60000);
            return res.status(403).json({
                success: false,
                message: `Account Blocked. Try again after ${remainingTime} minutes.`
            });
        }

        // Validate credentials
        const isPasswordMatch = await bcrypt.compare(password, existUser.password);
        if (!isPasswordMatch) {
            const updatedFields = {
                $inc: { loginAttampts: 1 },
            };

            if ((existUser.loginAttampts || 0) + 1 >= 5) {
                updatedFields.blockExperies = new Date(Date.now() + 20 * 60 * 1000); // Block for 20 mins
            }

            await User.updateOne({ email }, updatedFields);
            return res.status(400).json({ success: false, message: 'Invalid credentials' });
        }

        // Reset login attempts
        await User.updateOne({ email }, { loginAttampts: 0, blockExperies: null });

        const token = jwt.sign({ id: existUser._id }, 'ABC123CDZ', {
            expiresIn: "1d"
        });

        res.cookie("token", token, { httpOnly: true, secure: true })
            .json({ success: true, user: existUser });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};







exports.logout = (req, res) => {
    res.clearCookie("token")({message:'Logged out'});

};




// admin login
exports.adminLogin = async (req, res)=> {
    try{
        const {email, password} = req.body;
        if(!email && !password){
            return res.status(401).json({success: false, message: 'email && password is required'});
        }
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
            'ABC123CDZ',
            {expiresIn: '24h'}
        );
        res.status(201).json({token, userId: admin._id, role: admin.role});

    }catch(error){
        res.status(500).json({message: `Somethin went wrong ${error}`})
    }
}