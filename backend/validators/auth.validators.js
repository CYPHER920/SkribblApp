
const zod = require('zod');

const signupSchema = zod.object({
    username: zod.string().min(3, 'Username must be min 3 characters').max(30, 'Username must be max 30 characters').trim(),
    email: zod.string().email().toLowerCase(),
    password: zod.string().min(6, 'Password must be atleat 6 characters')

})

const signinSchema = zod.object({
    email: zod.string().min(3, 'Username must be min 3 characters'),
    password: zod.string().min(6, 'Password must be atleat 6 characters')
})

module.exports = { signinSchema, signupSchema };