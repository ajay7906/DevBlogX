const jwt = require('jsonwebtoken')
module.exports = (req, res, next) => {
    try{
        console.log('token', req.headers.authorization);
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        if(decodedToken.role !== 'admin' ){
            throw new Error('Admin access required');
        }
        req.userData = {userId: decodedToken.userId, role: decodedToken.role};

        next();

    }catch(error){
        return res.status(401).json({message: 'Admin authotucation failed'});
    }
}