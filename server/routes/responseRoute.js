let express = require('express');
let {findResponse,addResponse} = require('../controllers/Response.js');

let responseRoutes = express.Router();
const multer = require('multer');

const storage = multer.memoryStorage(); 
const upload = multer({ storage });


responseRoutes.get('/find',findResponse);
responseRoutes.post('/add',upload.array('files'),addResponse);



module.exports=responseRoutes;