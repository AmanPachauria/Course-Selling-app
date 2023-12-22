const jwt = require("jsonwebtoken");

const adminAuthenticateJwt = (req, res, next ) => {
    const authHeader = req.headers.authorization;

    if( authHeader ){
        const token = authHeader.split(' ')[1];
        jwt.verify(token, process.env.AdminSecretFind, (err, user) => {
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
    adminAuthenticateJwt
}