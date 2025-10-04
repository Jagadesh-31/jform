let express = require('express');
const multer = require('multer');

let {registerUser,loginUser,autoLoginUser,findUser,uploadImage} = require('../controllers/auth.js');

let dbRoutes = express.Router();


const upload = multer({dest: "uploads/"})


dbRoutes.post('/register',registerUser);
dbRoutes.post('/login',loginUser);
dbRoutes.get('/verify',autoLoginUser);
dbRoutes.get('/find',findUser);

dbRoutes.post('/uploadImage', upload.single('image'),uploadImage)

module.exports=dbRoutes;