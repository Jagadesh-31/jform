import axios from 'axios';
import { useState, useEffect, useContext } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FiEdit2 } from 'react-icons/fi';
import { MdDeleteOutline } from 'react-icons/md';
import Loader from '../../components/loader.jsx';
import { authContext } from '../../contexts/authContext.jsx';

export function AdminFormInfo() {
  const { user } = useContext(authContext);
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState(null);
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFormAndResponses() {
      try {
        setLoading(true);
        const formRes = await axios.get(`http://localhost:5000/forms/find?formId=${id}`);
        setForm(formRes.data);

        const res = await axios.get(`http://localhost:5000/responses/find?formId=${id}`);
        setResponses(res.data || []); 

        setLoading(false);
      } catch (err) {
        console.error('Error fetching form or responses:', err);
        setLoading(false);
      }
    }

    fetchFormAndResponses();
  }, [id]);

  const handleDelete = async (formId) => {
    if (!window.confirm('Are you sure you want to delete this form?')) return;
    try {
      await axios.delete(`http://localhost:5000/forms/delete/${formId}`);
      alert('Form deleted successfully');
      navigate('/admin/forms');
    } catch (err) {
      console.error('Failed to delete form:', err);
      alert('Error deleting form');
    }
  };

  return (
    <div className="backgroundDiv min-h-screen p-4">
      <div className="container w-[85%] flex flex-col gap-4">
        {loading ? (
          <Loader />
        ) : (
          <div className="formsList flex flex-col gap-6 mt-4 p-2">
            {form && (
              <div className="formCard border-2 border-gray-500 rounded-md p-4 flex flex-col gap-4">
                <div className="head flex justify-between items-center">
                  <p className="text-white text-sm md:text-lg">
                    <strong>Form Id:</strong> {form._id}
                  </p>
                  <div className="options flex gap-3 mt-2 md:mt-0">
                    <FiEdit2
                      className="text-emerald-500 text-2xl cursor-pointer"
                      onClick={() => navigate(`/admin/forms/edit/${form._id}`)}
                    />
                    <MdDeleteOutline
                      className="text-red-600 text-2xl cursor-pointer"
                      onClick={() => handleDelete(form._id)}
                    />
                  </div>
                </div>

                <div className="formInfo flex flex-col md:flex-row justify-between items-start md:items-center text-white gap-2">
                  <div className="flex flex-col md:flex-1 gap-1 list-none">
                    <li><strong>Title:</strong> {form.title}</li>
                    <li><strong>Description:</strong> {form.description || 'No description'}</li>
                    <li><strong>Fields:</strong> {form.fields?.length || 0}</li>
                  </div>
                </div>

                <div className="responsesTable overflow-x-auto mt-3">
                  <h3 className="text-white font-bold mb-2">
                    No of Responses: ({responses?.length || 0})
                  </h3>
                  {responses.length === 0 ? (
                    <p className="text-white">No responses yet.</p>
                  ) : (
                    <table className="min-w-full text-white border border-gray-400">
                      <thead className="bg-gray-700">
                        <tr>
                          <th className="px-3 py-2 border">S.No</th>
                          <th className="px-3 py-2 border">User Email</th>
                          <th className="px-3 py-2 border">Submitted At</th>
                          <th className="px-3 py-2 border">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {responses.map((resp, i) => (
                          <tr key={resp._id} className="text-center border-t border-gray-500">
                            <td className="px-3 py-2">{i + 1}</td>
                            <td className="px-3 py-2">{resp.submittedBy?.email || 'N/A'}</td>
                            <td className="px-3 py-2">{resp.submittedAt?.split('T')[0]}</td>
                            <td className="px-3 py-2">
                              <button
                                className="bg-blue-500 px-3 py-1 rounded hover:bg-blue-600"
                                onClick={() => navigate(`/admin/response/${resp._id}`)}
                              >
                                View
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
