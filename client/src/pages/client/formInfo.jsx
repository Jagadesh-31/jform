import axios from 'axios';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import { authContext } from '../../contexts/authContext.jsx';
import Loader from '../../components/loader.jsx';

export function FormInfo() {
  const { user } = useContext(authContext);
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [alreadyFilled, setAlreadyFilled] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFormAndCheckResponse = async () => {
      try {
        setLoading(true);

      
        const formRes = await axios.get(`http://localhost:5000/forms/find?formId=${id}`);
        setForm(formRes.data);

  
        const respRes = await axios.get(`http://localhost:5000/responses/find?formId=${id}&userId=${user._id}`);
        if (respRes.data && respRes.data.length > 0) {
          setAlreadyFilled(true);
        }

      } catch (err) {
        console.error(err);
        setError('Failed to load form.');
      } finally {
        setLoading(false);
      }
    };

    fetchFormAndCheckResponse();
  }, [id, user._id]);

  if (loading) return <Loader />;
  if (error) return <div className="text-white p-4">{error}</div>;

  return (
    <div className="backgroundDiv min-h-screen p-4">
      {form && (
        <div className="container mx-auto flex flex-col gap-6">

          <div className="flex justify-between items-center">
            <div className="text-white">
              <h1 className="text-3xl font-extrabold">{form.title}</h1>
              <p className="text-gray-300 text-sm">
                Created on: {form.createdAt.split('T')[0]}
              </p>
            </div>
            <Link to="/home" className="text-white text-xl font-bold">❌</Link>
          </div>

          <div className="flex flex-col md:flex-row gap-6 bg-gray-800 p-4 rounded-md">
            <div className="flex-shrink-0">
              <img
                src={form.image}
                alt={form.title}
                className="rounded-md object-cover h-[250px] w-[175px]"
              />
            </div>
            <div className="flex flex-col text-white gap-2">
              <p><strong className='text-md font-bold'>Description :</strong> {form.description}</p>
              <p><strong className='text-md font-bold'>Last date to fill :</strong> {form.lastDate.split('T')[0]}</p>
            </div>
          </div>

          <div className="flex gap-4 justify-center mt-4">
            {alreadyFilled ? (
              <button
                onClick={() => navigate(`/response/${id}`)}
                className="border-white text-[#4242FA] border-2 px-4 py-2 rounded-xl hover:bg-[#4242FA] hover:text-white transition"
              >
                My Responses
              </button>
            ) : (
              <Link to={`/form/${id}/fill`}>
                <button className="border-white text-[#4242FA] border-2 px-4 py-2 rounded-xl hover:bg-[#4242FA] hover:text-white transition">
                  Fill the Form
                </button>
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
