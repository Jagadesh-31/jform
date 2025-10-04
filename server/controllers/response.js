const responseModel = require('../models/response.js');
const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');


cloudinary.config({
  cloud_name:'diizmtj04',
  api_key:'439939817641678',
  api_secret:'jQVIQWtKodGl5Q90KUMTQya35Sk'});


const findResponse = async (req, res) => {
  let { responseId, formId,userId} = req.query;


  try {
    let findRes;
    if(formId && userId){

      findRes = await responseModel.find({ formId, submittedBy: userId });

    } else if(userId){
      findRes = await responseModel.find({  submittedBy : userId });
    }else if (responseId) {
      findRes = await responseModel.find({ _id: responseId });
    } else if (formId) {
      findRes = await responseModel.find({ formId });
    } else {
      findRes = await responseModel.find({}).sort({submittedAt:1});
    }

    if (!findRes || findRes.length === 0) {
      return res.status(404).json({ error: 'Responses not found' });
    }

    res.status(200).json(findRes);
  } catch (err) {
    console.error(`Error finding responses: ${err.message}`);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};




cloudinary.config({
  cloud_name: 'diizmtj04',
  api_key: '439939817641678',
  api_secret: 'jQVIQWtKodGl5Q90KUMTQya35Sk',
});

const addResponse = async (req, res) => {
  try {
    const { formId, submittedBy, responses } = req.body;
    const parsedResponses = JSON.parse(responses || '{}');

    const files = req.files || []; 
    const uploadedFiles = [];


    for (const file of files) {
      const result = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: 'form_uploads' },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        streamifier.createReadStream(file.buffer).pipe(stream);
      });

      uploadedFiles.push({ label: file.originalname, url: result.secure_url });
    }

  
    const newResponse = new responseModel({
      formId,
      submittedBy,
      responses: parsedResponses,
      files: uploadedFiles,
    });

    await newResponse.save();

    res.status(201).json({ success: true, response: newResponse });
  } catch (error) {
    console.error('Error creating response:', error);
    res.status(500).json({ error: 'Error creating response' });
  }
};



module.exports = { findResponse, addResponse};
