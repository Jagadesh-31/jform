const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dbRoutes = require('./routes/userdb.js')
const responseRoutes = require('./routes/responseRoute.js')
const formRoutes = require('./routes/formRoute.js')

require('dotenv').config();

let app = express();

app.use(cors());
app.use(express.json());


app.use('/auth',dbRoutes);
app.use('/forms',formRoutes);
app.use('/responses',responseRoutes);

app.get('/',(req,res)=>{
res.send('hello everyone')
})

const PORT = process.env.PORT || 5000;


mongoose.connect(process.env.MONGODB_URL).then(() => {
  console.log("connected to mongodb");
app.listen(PORT, () => {
  console.log(`✅ Server is listening to http://localhost:${PORT}`);
});
}).catch((err) => {
  console.log('error connecting to mongodb:' + err);
});