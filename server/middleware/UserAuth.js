const jwt = require("jsonwebtoken");
const UserSecret = "UserSuperSecre12345";

const UserAuthenticateJwt = (req, res, next ) => {
    const authHeader = req.headers.authorization;
    if( authHeader ){
        const token = authHeader.split(" ")[1];
        jwt.verify(token, UserSecret, ( err, user ) => {
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
    UserAuthenticateJwt,
    UserSecret
}