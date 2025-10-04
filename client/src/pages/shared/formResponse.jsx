import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Loader from '../../components/loader.jsx';
import { FaDownload, FaTimes } from 'react-icons/fa';

export function FormResponse() {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [response, setResponse] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchResponseAndUser() {
      try {
        setLoading(true);
        setError('');

        const res = await axios.get(`http://localhost:5000/responses/find?responseId=${id}`);
        const data = res.data?.[0] || res.data;
        console.log(res.data)
        setResponse(data);

        if (data?.submittedBy) {
          const userRes = await axios.get(`http://localhost:5000/auth/find?id=${data.submittedBy}`);
          setUser(userRes.data.user || userRes.data);
        }

        setLoading(false);
      } catch (err) {
        console.error('Error fetching response:', err);
        setError('Error fetching response details.');
        setLoading(false);
      }
    }

    fetchResponseAndUser();
  }, [id]);

  if (loading) return <Loader />;

  if (error || !response) {
    return (
      <div className="backgroundDiv min-h-screen p-6 text-white flex flex-col items-center justify-center">
        <p className="text-red-400 text-lg mb-3">{error || 'Response not found.'}</p>
        <button
          onClick={() => navigate(-1)}
          className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md flex items-center gap-2"
        >
          <FaTimes /> Close
        </button>
      </div>
    );
  }

  return (
    <div className='backgroundDiv min-h-screen'>
      <div className='container w-[85%] flex flex-col gap-4 text-white'>
        <div className='flex justify-between'>
          <h2 className="text-3xl font-bold">Response Details</h2>
          <button
            onClick={() => navigate(-1)}
            className="text-red-500 hover:text-red-700 text-2xl"
            title="Close"
          >
            <FaTimes />
          </button>
        </div>

        <div className="border border-gray-700 rounded-lg p-6 bg-gray-800 flex flex-col gap-4 shadow-lg">
          <ul className="space-y-2">
            <li><strong>User:</strong> {user?.username || 'N/A'}</li>
            <li><strong>Email:</strong> {user?.email || 'N/A'}</li>
            <li><strong>Submitted At:</strong> {response?.submittedAt?.split('T')[0]}</li>
          </ul>

          <hr className="border-gray-600 my-4" />

          <div className="fields flex flex-col gap-5 pt-2">
            
            {Object.entries(response.responses || {}).map(([label, value], idx) => (
              <div key={idx} className="bg-gray-700 p-3 rounded-md">
                <strong className="block text-blue-400 mb-1">{label}:</strong>
                <span className="text-gray-200">{String(value)}</span>
              </div>
            ))}

            
            {response.files?.length > 0 && (
              <div className="bg-gray-700 p-3 rounded-md">
                <strong className="block text-blue-400 mb-2">Uploaded Files:</strong>
                <div className="flex flex-col gap-2">
                  {response.files.map((file, idx) => (
                    <a
                      key={idx}
                      href={file.url}
                      download
                      className="text-blue-400 hover:text-blue-600 flex items-center gap-2"
                    >
                      <FaDownload /> {file.label}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
