let express = require('express');
const multer = require('multer');

let {registerUser,loginUser,autoLoginUser,findUser} = require('../controllers/auth.js');

let dbRoutes = express.Router();



dbRoutes.post('/register',registerUser);
dbRoutes.post('/login',loginUser);
dbRoutes.get('/verify',autoLoginUser);
dbRoutes.get('/find',findUser);


module.exports=dbRoutes;