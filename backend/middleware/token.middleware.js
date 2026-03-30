
const jwtpassword = process.env.Password
const jwt = require('jsonwebtoken');

async function tokenverify(req, res, next) {

    try {
        const authorization = req.headers.authorization;
        if (!authorization || !authorization.startsWith("Bearer ")) {
            return res.status(401).send({
                msg: "invalid token!"
            })
        }
        const tokenString = authorization.split(" ")[1];
        // console.log(tokenString);
        const decoded = jwt.verify(tokenString, jwtpassword);
        req.userid = decoded.id;
        // console.log(result); {id:'_id',iat:12344}

        next();
    }
    catch (e) {

        // console.log(e + " token related error!")
        return res.status(401).send("token related problem");
    }

}

module.exports = tokenverify;