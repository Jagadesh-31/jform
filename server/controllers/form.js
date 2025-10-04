const FormModel = require("../models/form.js");


const findForm = async (req, res) => {
  const { formId } = req.query;


  try {
    let findRes;
    if (formId) {
      findRes = await FormModel.findById(formId);
    } else {
      findRes = await FormModel.find().sort({ createdAt : 1 });
    }
    console.log(findRes);

    if (!findRes || (Array.isArray(findRes) && findRes.length === 0)) {
      return res.status(404).json({ error: "Forms not found" });
    }

    res.status(200).json(findRes);
  } catch (err) {
    console.error(`Error finding Form: ${err.message}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


const createForm = async (req, res) => {
  try {
    const { title, description, fields,lastDate} = req.body;

    const validTypes = ['text', 'number', 'file', 'dropdown'];
    if (!fields.every(f => validTypes.includes(f.type))) {
      return res.status(400).json({ error: "Invalid field type" });
    }

    const newForm = new FormModel({ title, description, fields, lastDate});
    const savedForm = await newForm.save();
    res.status(201).json({ message: "Form successfully created", form: savedForm });
  } catch (err) {
    console.error("Error adding Form:", err);
    res.status(500).json({ error: "Failed to create form" });
  }
};


module.exports = { findForm, createForm};
