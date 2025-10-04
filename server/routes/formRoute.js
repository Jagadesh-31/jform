let express = require('express');
let {findForm,createForm} = require('../controllers/form.js');

let formRoutes = express.Router();

formRoutes.get('/find',findForm);
formRoutes.post('/create',createForm);


module.exports=formRoutes;