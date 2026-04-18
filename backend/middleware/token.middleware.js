
const jwtpassword = process.env.Password
const jwt = require('jsonwebtoken');

async function tokenverify(req, res, next) {

    try {
        const token = req.cookies.token; // accessing token from cookie

        // const authHeader = req.headers.authorization;  logic if using authorization from reqheader
        // const authorization = decodeURIComponent(authHeader); // making the token URL-Decoded-> Bearer%20 remove the unwant to make Bearer
        console.token;
        if (!token || !token.startsWith("Bearer ")) {
            return res.status(401).send({
                msg: "invalid token!"
            })
        }
        const tokenString = token.split(" ")[1];
        // console.log(tokenString);
        const decoded = jwt.verify(tokenString, jwtpassword);
        // console.log(decoded);
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