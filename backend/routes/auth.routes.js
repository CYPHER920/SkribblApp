const express = require('express');
const router = express.Router();
const { signup, signin, logout, UserInfo } = require('../controllers/auth.controller') // user routes 
const { validateUser, validateRoom } = require('../middleware/validate.middleware'); // schema validating functions
const { signinSchema, signupSchema } = require('../validators/auth.validators') // schema User
const tokenverify = require('../middleware/token.middleware') // for verifying token
//--------------------------------------ROOM------------------------------------//
const { createroom, getRooms, getRoom, joinroom } = require('../controllers/room.controller'); //  room routes
const roomCreateSchema = require('../validators/room.validators') // room zod schema

///////////////////-----------------------Routes------------------////////////////////

router.post('/signup', validateUser(signupSchema), signup);
router.post('/signin', validateUser(signinSchema), signin);
router.post('/logout', logout);
router.get('/userinfo', tokenverify, UserInfo);
router.post('/createroom', tokenverify, validateRoom(roomCreateSchema), createroom);
router.get('/getrooms', tokenverify, getRooms);
router.get('/getroom', tokenverify, getRoom);
router.post('/joinroom', tokenverify, joinroom);
module.exports = router;