const mongoose = require('mongoose');

const responseSchema = new mongoose.Schema(
  {
    formId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'forms',
      required: true,
    },
    submittedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
    responses: {
      type: Object,
      required: true,
    },
    files: [
      {
        label: String,
        url: String,
      },
    ],
    submittedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { strict: false }
);

let responseModel = mongoose.model('responses', responseSchema);
 module.exports = responseModel;