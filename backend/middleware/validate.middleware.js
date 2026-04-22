
const validateUser = (schema) => (req, res, next) => {

    try {
        const result = schema.safeParse(req.body);
        // console.log(req.body.username);
        // console.log(req.body.password);
        // console.log(req.body.email);
        // console.log(result.success);
        if (!result.success) {
            console.log("Zod Error Details:", result.error.format());
            return res.status(400).send({
                msg: "invalid schema input! zod error in validate file"
            })
        }
        req.body = result.data; // putting cleanup data 
        next();
    }
    catch (e) {
        console.log(e);
    }
}

const validateRoom = (schema) => (req, res, next) => {

    try {
        // console.log(req.body);
        const result = schema.safeParse(req.body);
        // console.log(req.body);
        if (!result.success) {
            console.log("Zod Error Details:", result.error.format());
            return res.status(401).json({ msg: "invalid room details" })
        }
        next();
    }
    catch (e) {
        return res.status(401).json({ msg: "error in validate ROom" });
    }

}
module.exports = { validateUser, validateRoom };