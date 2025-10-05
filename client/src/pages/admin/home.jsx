
import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../App.css';
import axios from '../api/axios.jsx'
import Loader from '../../components/loader.jsx';
import { FormsContainer } from '../../components/formsContainer.jsx';
import { authContext } from '../../contexts/authContext.jsx';

export function AdminHome() {
  const { user } = useContext(authContext);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    axios
      .get('/forms/find')
      .then(res => {
        setData(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <div className='backgroundDiv min-h-screen'>
      <div className='container w-[85%] flex flex-col gap-4'>
        <div className='options flex justify-between items-center bg-[#4242FA] p-3 rounded-2xl text-white'>
          <span className='font-bold text-lg'>
            Total Forms: {data.length}
          </span>
          <button
            className='bg-white text-[#4242FA] font-bold px-4 py-1 rounded-xl hover:bg-gray-200'
            onClick={() => navigate('/admin/create-form')}
          >
            Create Form
          </button>
        </div>

        <div className='main w-full mt-4'>
          {loading ? <Loader /> : (<>
                  {(data && data?.length) ? <FormsContainer data={data}/>:<p className='text-white font-bold text-2xl'>No Forms Found...</p>}
                   </>
              )}
        </div>
      </div>
    </div>
  );
}
