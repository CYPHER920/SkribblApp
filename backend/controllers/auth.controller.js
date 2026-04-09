
const bcrypt = require('bcrypt');
const User = require('../models/User')
const jwt = require('jsonwebtoken');
const jwtpassword = process.env.password
async function signup(req, res) {

    const { username, password, email } = req.body;
    console.log(username);
    const userExist = await User.findOne({
        $or: [
            { email: email },
            { username: username }
        ]
    });
    if (userExist) {
        return res.status(400).send({
            msg: "user with email or username already exists!"
        })
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = await User.create({ username, password: hashedPassword, email });

    const token = "Bearer " + jwt.sign({ id: newUser._id }, jwtpassword);
    res.cookie('token', token, {
        httpOnly: true,
        secure: false,
        sameSite: 'lax'
    })

    return res.status(200).send({
        msg: "user saved successfully",
        user: {
            id: newUser._id,
            username: newUser.username,
            email: newUser.email,
        }
    });


}


async function signin(req, res) {
    const { email, password } = req.body;

    const existuser = await User.findOne({ email });

    if (!existuser) {
        return res.status(404).send({
            msg: "user not found!"
        })
    }
    const compare = await bcrypt.compare(password, existuser.password);
    if (!compare) {
        return res.status(401).send({ msg: "Wrong password" });
    }
    const token = "Bearer " + jwt.sign({ id: existuser._id }, jwtpassword);
    // console.log(token);
    res.cookie('token', token, {
        httpOnly: true,
        secure: false,
        sameSite: 'lax'
    })
    return res.status(200).send({ msg: "Successfully login" })
}
module.exports = { signup, signin };