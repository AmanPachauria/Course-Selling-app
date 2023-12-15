const jwt = require("jsonwebtoken");

const AdminSecret = "SECRETADMIN12345";

const adminAuthenticateJwt = (req, res, next ) => {
    const authHeader = req.headers.authorization;

    if( authHeader ){
        const token = authHeader.split(' ')[1];
        jwt.verify(token, AdminSecret, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }
            else{
                req.user = user;
                next();
            }
        })
    }
    else{
        return res.sendStatus(401);
    }
};

module.exports = {
    adminAuthenticateJwt,
    AdminSecret
}