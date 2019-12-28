var express = require('express');
var userRouter = express.Router();
const middleware = require("../middleware/userauth");

var userLog = require('../controller/user/login');
var userSign = require('../controller/user/signup');
var userList = require('../controller/user/listUsers');
userRouter.post('/LogIn', userLog.userLogIn);
userRouter.post('/SignUp', userSign.userSignUp);
userRouter.get('/listall', middleware(), userList.userListAll);

module.exports = userRouter;
