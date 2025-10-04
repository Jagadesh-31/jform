const mongoose = require('mongoose');

const fieldSchema = new mongoose.Schema({
  label: { type: String, required: true },
  type: { 
    type: String, 
    enum: ['text', 'number', 'file', 'dropdown'], 
    required: true 
  },
  required: { type: Boolean, default: false },
  options: { type: [String], default: [] }
}, { _id : false });

const formSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, default: '' },
  fields: [fieldSchema],
  image: { type: String, default: 'https://res.cloudinary.com/diizmtj04/image/upload/v1759580711/search-no-result-concept-illustration-flat-design-eps10-modern-graphic-element-for-landing-page-empty-state-ui-infographic-icon-vector_alsqwa.jpg' },
  createdAt: { type: Date, default: Date.now },
  lastDate : { type: Date, required : true }
}, { strict: false });


module.exports = mongoose.model('forms', formSchema);
