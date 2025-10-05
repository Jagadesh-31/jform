import { useState } from 'react';
import axios from 'axios';
import '../../App.css';
import axios from '../api/axios.jsx'

export function CreateForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [lastDate, setLastDate] = useState('');
  const [fields, setFields] = useState([]);
  const [loading, setLoading] = useState(false);

  const addField = () => {
    setFields([...fields, { label: '', type: 'text', required: false, options: [] }]);
  };

  const removeField = (index) => {
    setFields(fields.filter((_, i) => i !== index));
  };

  const updateField = (index, key, value) => {
    const updated = [...fields];
    updated[index][key] = value;
    setFields(updated);
  };

  const addOption = (index) => {
    const updated = [...fields];
    if (!updated[index].options) updated[index].options = [];
    updated[index].options.push('');
    setFields(updated);
  };

  const updateOption = (fieldIndex, optionIndex, value) => {
    const updated = [...fields];
    updated[fieldIndex].options[optionIndex] = value;
    setFields(updated);
  };

  const removeOption = (fieldIndex, optionIndex) => {
    const updated = [...fields];
    updated[fieldIndex].options.splice(optionIndex, 1);
    setFields(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title) return alert('Title is required');
    if (fields.length === 0) return alert('At least one field is required');
    setLoading(true);
    try {
      await axios.post('/forms/create', {
        title,
        description,
        lastDate,
        fields
      });
      alert('Form created successfully!');
      setTitle('');
      setDescription('');
      setFields([]);
      setLastDate('');
    } catch (err) {
      console.error('Error creating form:', err);
      alert('Failed to create form');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='backgroundDiv min-h-screen flex justify-center items-start pt-10'>
      <div className='container w-[85%] flex flex-col gap-4 bg-black/10 py-3 px-6 rounded-xl text-white'>
        <h2 className='text-white text-2xl font-bold'>Create New Form</h2>
        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
          <div>
            <label className='font-bold text-white'>Form Title:</label>
            <input
              type='text'
              value={title}
              onChange={e => setTitle(e.target.value)}
              className='w-full p-2 rounded-md text-white bg-black border border-white'
              required
            />
          </div>

          <div>
            <label className='font-bold text-white'>Description:</label>
            <textarea
              value={description}
              onChange={e => setDescription(e.target.value)}
              className='w-full p-2 rounded-md text-white bg-black border border-white'
            />
          </div>

          <label className='font-bold text-white'>Last Date to Fill:</label>
          <input
            type='date'
            value={lastDate}
            onChange={e => setLastDate(e.target.value)}
            className='w-full p-2 rounded-md text-white bg-black border border-white'
            required
          />

          <div className='fieldsContainer flex flex-col gap-3'>
            <h3 className='font-bold text-lg text-white'>Fields:</h3>
            {fields.map((field, idx) => (
              <div key={idx} className='flex flex-col md:flex-row gap-2 md:items-center border border-white p-2 rounded-md'>
                <input
                  type='text'
                  placeholder='Field Label'
                  value={field.label}
                  onChange={e => updateField(idx, 'label', e.target.value)}
                  className='p-1 rounded-md text-white bg-black md:flex-1 border border-white'
                  required
                />

                <select
                  value={field.type}
                  onChange={e => updateField(idx, 'type', e.target.value)}
                  className='p-1 rounded-md text-white bg-black border border-white'
                >
                  <option value='text'>Text</option>
                  <option value='number'>Number</option>
                  <option value='file'>File</option>

                </select>

                <label className='flex items-center gap-1 text-white'>
                  Required:
                  <input
                    type='checkbox'
                    checked={field.required}
                    onChange={e => updateField(idx, 'required', e.target.checked)}
                  />
                </label>

                <button type='button' onClick={() => removeField(idx)} className='bg-[#4242FA] px-2 rounded-md mt-1 md:mt-0'>Remove Field</button>
              </div>
            ))}
          </div>

          <div className='flex gap-2'>
            <button type='button' onClick={addField} className='border-white text-[#4242FA] border-2 px-4 py-2 rounded-xl hover:bg-[#4242FA] hover:text-white transition'>Add Field</button>
            <button type='submit' disabled={loading} className='border-white text-[#4242FA] border-2 px-4 py-2 rounded-xl hover:bg-[#4242FA] hover:text-white transition'>
              {loading ? 'Creating...' : 'Create Form'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
