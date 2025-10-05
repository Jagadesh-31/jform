
import { Link } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import { authContext } from '../../contexts/authContext.jsx';
import Loader from '../../components/loader.jsx';
import axios from '../api/axios.jsx'

export function MyResponses() {
  const { user } = useContext(authContext);
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    setLoading(true);

    axios
      .get(`/responses/find?userId=${user._id}`)
      .then(res => {
        setResponses(res.data);
        console.log(res.data)
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching responses:', err);
        setLoading(false);
      });
  }, [user]);

  return (
    <div className="backgroundDiv min-h-screen p-4">
      <div className="container mx-auto flex flex-col gap-6 text-white">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">My Responses</h1>
          <Link
            to="/home"
            className="text-[#4242FA] hover:underline text-lg"
          >
            ← Back to Home
          </Link>
        </div>

        {loading ? (
          <Loader />
        ) : responses.length === 0 ? (
          <p className="text-gray-300">You haven't submitted any responses yet.</p>
        ) : (
          <div className="flex flex-col gap-4">
            {responses.map((resp, idx) => (
              <div
                key={resp._id || idx}
                className="bg-[#222] p-4 rounded-lg border border-gray-600 flex flex-col gap-3"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <p><strong>Submitted At:</strong> {resp.submittedAt?.split("T")[0]}</p>
                    <p><strong>FormId :</strong> {resp.formId || 'Untitled Form'}</p>
                  </div>
                  <Link
                    to={`/response/${resp._id}`}
                    className="bg-[#4242FA] hover:bg-blue-700 text-white py-1 px-3 rounded-md font-semibold transition-all"
                  >
                    View
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
