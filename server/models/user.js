let mongoose = require('mongoose')

const responseSchema = new mongoose.Schema(
{
  formId: { type: mongoose.Schema.Types.ObjectId, ref: 'Form' },
  data: Object,
  files: [String],  
  submittedAt: Date
},
{ strict: false }
) 

let responseModel = mongoose.model('users', responseSchema)

module.exports = responseModel
