const jwt = require("jsonwebtoken");


const UserAuthenticateJwt = (req, res, next ) => {
    const authHeader = req.headers.authorization;
    if( authHeader ){
        const token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.UserSecretFind, ( err, user ) => {
            if (err) {
                return res.setstatus(403);
            }
            req.user = user;
            next();
        })
    }
    else{
        res.setstatus(401);
    }
}

module.exports = {
    UserAuthenticateJwt
}