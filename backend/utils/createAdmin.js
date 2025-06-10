const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
require('dotenv').config();

// mongodb conncetion strin g

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const adminData = {
    name: 'Ajay Kumar',
    email:'aks969014@gmail.com',
    password:'SecurePassword123',
    role:'admin'

}
const createAdmin = async () => {
    try{
        // check if admin alredy exists
        const existingAdmin = await User.findOne({role: 'admin'});
        if(existingAdmin) {
            console.log('Admin already exists');
            return process.exit();
        }
        // hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(adminData.password, salt);
        // create admin user
        const adminUser = new User({
            ...adminData,
            password: hashedPassword
        });
        await adminUser.save();
        console.log('Admin created successfully');
        process.exit();

    }catch(error){
        console.error('Error creating admin:', error);
        process.exit(1);
    }
}





createAdmin();