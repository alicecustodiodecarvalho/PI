const jwt = require('jsonwebtoken')

function generateAccessToken(data, options={expiresIn: '999999999999s'}){
    return jwt.sign(data, process.env.SECRET_KEY, options);
}

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.SECRET_KEY, (err, data)=>{
        console.log(err);

        if (err) return res.sendStatus(403)

        req.acessToken = data;

        console.log(data, "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")

        next()
    })
}

module.exports = {generateAccessToken, authenticateToken}